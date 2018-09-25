let myMap;
let canvas;
const mappa = new Mappa('Leaflet');
const options = {
  lat: 40,
  lng: -45,
  zoom: 3.5,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}
var latResults = [40.6501]
var lonResults = [-73.94958]
var asResults = ["Home"]

function setup() {
  canvas = createCanvas(1700, 840);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas)

  $.ajax({
    url: 'http://localhost:8080/showData',
    type: 'GET',
    success: function(res) {
      res.forEach(element => {
        if (element.lat !== undefined) {
          latResults.push(element.lat)
        }
      })
      res.forEach(element => {
        if (element.lon !== undefined) {
          lonResults.push(element.lon)
        }
      })
      res.forEach(element => {
        if (element.as !== undefined) {
          asResults.push(element.as)
        }
      })
    }
  })
  console.log(asResults)
  // console.log(latResults)
  // console.log(lonResults)

  myMap.onChange(drawMeteorites);
}

function draw() {
  if (mouseIsPressed) {
    erase()
  }
}

let forshapesX = []
let forshapesY = []
let drawText = true

function drawMeteorites() {
  // Clear the canvas
  clear();

  for (let i = 0; i < latResults.length; i++) {
    // Get the lat/lng of each meteorite
    const latitude = Number(latResults[i])
    const longitude = Number(lonResults[i])



    // Only draw them if the position is inside the current map bounds. We use a
    // Leaflet method to check if the lat and lng are contain inside the current
    // map. This way we draw just what we are going to see and not everything. See
    // getBounds() in http://leafletjs.com/reference-1.1.0.html
    if (myMap.map.getBounds().contains({
        lat: latitude,
        lng: longitude
      })) {
      // Transform lat/lng to pixel position
      const pos = myMap.latLngToPixel(latitude, longitude);
      // console.log(pos)


      text(asResults[i], pos.x, pos.y - 15 * i)


      ellipse(pos.x, pos.y, 20, 20);

      forshapesX.push(pos.x)
      forshapesY.push(pos.y)




      beginShape(LINES)
      for (let i = 0; i < forshapesX.length; i++) {
        // console.log(forshapesX[0], forshapesY[0])
        vertex(forshapesX[i], forshapesY[i])
        vertex(forshapesX[i + 1], forshapesY[i + 1])
        endShape();
      }
    }
  }
}



function erase() {
  console.log("PRESSED")
  forshapesX = []
  forshapesY = []
}
