let fs = require('fs');
let yargs = require('yargs')
let traceRoute = require('nodejs-traceroute')

const input = yargs.argv._[0]
const tracer = new traceRoute();

tracer
  .on('hop', (hop) => {
    if (hop.ip != "*") {
      fs.appendFile(`/Users/simonjensen/desktop/nodetraceroute/simonroutes.txt`, `${JSON.stringify(hop.ip)}` + '\n', function(err) {
        if (err) {
          console.log(err)
        }
        console.log("success")
        getData()
      });
    }
  })

tracer.trace(input);

let listofip = []

function getData() {
  fs.readFile('simonroutes.txt', "utf8", function(err, data) {
    if (err) throw err;
    let ips = data.split('\n')
    ips.forEach(element => {
      let ip = element.substring(1, element.length - 1)
      listofip.push(ip)
    })

    console.log(listofip)
    // let IPaddress = eraseBefore.substring(1, eraseBefore.length - 1)
  })
}
