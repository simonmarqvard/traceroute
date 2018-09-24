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
  console.log(numbers)
  let Ips = Object.values(numbers)
  let actualNumber = Ips[0]
  getLocation(actualNumber)
})

//Get name and location (lat,lon) for IP
var getLocation = (ip) => {

  let information;

  request({
    url: `http://ip-api.com/json/${ip}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      console.log("unable to connect to ipAPI")
    } else if (response.statusCode === 400) {
      console.log("unable to fetch data from API")
    } else if (response.statusCode === 200) {
      let information = {
        country: body.country,
        city: body.city,
        isp: body.isp,
        as: body.as,
        lat: body.lat,
        lon: body.lon
      }
      console.log(information) //pass information to browser somehow
    }
  })
}



app.get('/', function(req, res) {
  res.send("helloworld")
})
