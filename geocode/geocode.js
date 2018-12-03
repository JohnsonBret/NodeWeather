const request = require('request');

const geocodeAddress = (address, callback) => {

    var encodedAddress = encodeURI(address);

    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=xpWEulU4cMA4WETcC5V3681wz9TNJ96T&location=${encodedAddress}`,
        // url: `http://www.mapquestapi.com/geocoding/v1/address?key=xpWEulU4cMA4WETcC5V3681wz9TNJ96T&location=**&*((`,
        json: true
    }, (error, response, body) => {

    //Debug - See your Mapquest response
    // console.log(JSON.stringify(response, undefined, 2));

        if(error){
            callback('Unable to connect to Mapquest Servers');
            console.log(JSON.stringify(error, undefined, 2));
        }
        else if(response.body.info.statuscode == 400)
        {
            callback("Status Code 400 - perhaps your address was invalid.")

            // console.log(body);
            // console.log(JSON.stringify(response, undefined, 2));
            // console.log(JSON.stringify(error, undefined, 2));
        }
        else if(response.statusCode == 200)
        {
            callback(undefined, {
                address: body.results[0].providedLocation.location,
                latitude: body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lng
            });
        }
    });
}


module.exports = {
    geocodeAddress
};