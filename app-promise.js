// 1bf8fa738db75403660202f851c66313
// https://api.darksky.net/forecast/apikey/lat,long

const express = require('express');
const bodyParser = require('body-parser');
const yargs = require('yargs');
const axios = require('axios');
const app = express();

app.use(bodyParser.urlencoded({ extended: false
}));
app.use(bodyParser.json());

app.listen(8080, ()=>{
  console.log("Server Started on 8080");
})


// const argv =  yargs
// .options({
//     a: {
//         demand: true,
//         alias: 'address',
//         describe: 'Address to fetch weather for',
//         string: true
//     }
// })
// .help()
// .alias('help', 'h')
// .argv;

app.get('/', (req, res) =>{
  res.sendfile('./index.html');
})

app.post('/weather' , (req, res)=>{

  console.log(JSON.stringify(req.body, undefined, 2));


  var encodedAddress = encodeURI(req.body.location);
  var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=xpWEulU4cMA4WETcC5V3681wz9TNJ96T&location=${encodedAddress}`;

  axios.get(geocodeUrl).then((response) => {

      if(response.data.info.statuscode == 400)
      {
          throw new Error('Unable to find that address - Status 400');
      }

      //console.log(JSON.stringify(response.data,undefined, 2));
      var latitude = response.data.results[0].locations[0].latLng.lat;
      var longitude = response.data.results[0].locations[0].latLng.lng;

      var encodedLatitude = encodeURI(latitude);
      var encodedLongitude = encodeURI(longitude);
      var apiKey = "1bf8fa738db75403660202f851c66313";

      weatherUrl = `https://api.darksky.net/forecast/${apiKey}/${encodedLatitude},${encodedLongitude}`;

      var providedLocation = response.data.results[0].providedLocation.location;
      console.log(`For ${providedLocation}`);

      return axios.get(weatherUrl);

  }).then((response) =>{
      var temperature = response.data.currently.temperature;
      var apparentTemp = response.data.currently.apparentTemperature;
      console.log(`It's currently ${temperature} but it feels like ${apparentTemp}`);

  }).catch((e) =>{
      if(e.code === 'ENOTFOUND')
      {
          console.log(e);
      }
      else
      {
          console.log(e.message);
      }
  });


});


//Debug - See what Yargs Encoded
// console.log(`Yargs Address Encoded:  ${JSON.stringify(encodeURI(argv.address))}`);
