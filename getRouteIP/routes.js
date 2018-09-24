//Imported packages
let traceRoute = require('nodejs-traceroute')
let yargs = require('yargs')
let fs = require('fs');
const tracer = new traceRoute();


let getTrace = (inputAddress, callback) => {
  tracer
    .on('hop', (hop) => {
      if (hop.ip != "*") {
        fs.writeFile(`/Users/simonjensen/desktop/nodetraceroute/simonroutes.txt`, `${JSON.stringify(hop.ip)}` + '\n', function(err) {
          if (err) {
            console.log(err)
          }
          console.log("success running traceroute")
          showDataArray()
        });
      }
    })

  tracer.trace(inputAddress);

  let listofip = []

  function showDataArray() {
    fs.readFile('simonroutes.txt', "utf8", function(err, data) {
      if (err) throw err;
      let ips = data.split('\n')
      ips.forEach(element => {
        let ip = element.substring(1, element.length - 1)
        if (ip != '') {
          listofip.push(ip)
          console.log("saved to array")
        }
      })
      let obj = {}
      Object.keys(listofip).forEach((key) => {
        obj = {
          ip: listofip[key]
        }
      })
      callback(undefined, obj)
    })
  }
}

//Export module to app.js
module.exports = {
  getTrace: getTrace
}
