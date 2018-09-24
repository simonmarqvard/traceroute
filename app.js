//packages

let fs = require('fs');
let yargs = require('yargs')
let traceRoute = require('nodejs-traceroute')
let request = require('request')

//page
const routes = require('./getRouteIP/routes.js')

//input through yargs
const input = yargs.argv._[0]


let IpsForLocation = new Array;

routes.getTrace(input, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage)
  }
  IpsForLocation.push(results);
  if (IpsForLocation.length > 1) {
    IpsForLocation.shift()
  }
  let numbers = IpsForLocation[0]
  console.log(numbers)
  let Ips = Object.values(numbers)
  let actualNumber = Ips[0]
  getLocation(actualNumber)
})


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
      console.log(body)
    }
  })
}
