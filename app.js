//imported packages
let fs = require('fs');
let yargs = require('yargs')
let traceRoute = require('nodejs-traceroute')
let request = require('request')
let express = require('express')

//imported pages
const routes = require('./getRouteIP/routes.js')


//create Server
let app = express();
app.use(express.static('public'));
let server = app.listen(8080, () => {
  console.log("running on port 8080")
})

//input through yargs
const input = yargs.argv._[0]



let IpsForLocation = new Array;
//use file-imported function getTrace - returns an object with IP address
routes.getTrace(input, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage)
  }
  IpsForLocation.push(results);
  if (IpsForLocation.length > 1) {
    IpsForLocation.shift()
  }
  //this needs to be better
  let numbers = IpsForLocation[0]
  let Ips = Object.values(numbers)
  let actualNumber = Ips[0]
  getLocation(actualNumber)

})

let information = [];

//Get name and location (lat,lon) for IP
var getLocation = (ip) => {



  request({
    url: `http://ip-api.com/json/${ip}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      console.log("unable to connect to ipAPI")
    } else if (response.statusCode === 400) {
      console.log("unable to fetch data from API")
    } else if (response.statusCode === 200) {
      console.log("IP" + ip)
      let information2 = {
        country: body.country,
        city: body.city,
        isp: body.isp,
        as: body.as,
        lat: body.lat,
        lon: body.lon,
        ip: body.query
      }
      console.log(information2) //pass information to browser somehow
      information.push(information2);
    }
  })
}



// let json = "{var: 'hi'}";

app.get('/showData', function(req, res) {
  // res.send("helloworld")
  res.send(information);
})
