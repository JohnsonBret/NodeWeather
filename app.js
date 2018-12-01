//mapquest 
//https://developer.mapquest.com/user/me/profile
//bjizzle
//kawa1

const request = require('request');

request({
    url: 'http://www.mapquestapi.com/geocoding/v1/address?key=xpWEulU4cMA4WETcC5V3681wz9TNJ96T&location=1301%20lombard%20street%20philadelphia',
    json: true
}, (error, response, body) => {
    //body.results[0].locations[0].latLng.lat
    //body.results[0].locations[0].latLng.lng
    
    console.log(body);
    console.log(body.results[0].locations[0].latLng.lat);
    console.log(body.results[0].locations[0].latLng.lng);
});