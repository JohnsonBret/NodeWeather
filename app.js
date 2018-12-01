//mapquest 
//https://developer.mapquest.com/user/me/profile
//bjizzle
//kawa1

const request = require('request');
const yargs = require('yargs');

const argv =  yargs
.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
})
.help()
.alias('help', 'h')
.argv;

console.log(`Yargs Address Encoded:  ${JSON.stringify(encodeURI(argv.a))}`);
var encodedAddress = encodeURI(argv.a);



request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=xpWEulU4cMA4WETcC5V3681wz9TNJ96T&location=${encodedAddress}`,
    json: true
}, (error, response, body) => {
    //body.results[0].locations[0].latLng.lat
    //body.results[0].locations[0].latLng.lng

    // console.log(body);
    // console.log(JSON.stringify(response, undefined, 2));
    console.log(`Address: ${body.results[0].providedLocation.location}`);
    console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
    console.log(`Longitutde: ${body.results[0].locations[0].latLng.lng}`);
});