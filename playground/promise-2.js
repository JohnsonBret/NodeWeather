const request = require('request');


const geocodeAddress = (address) =>{

    var encodedAddress = encodeURI(address);

    return new Promise((resolve, reject) =>{
        request({
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=xpWEulU4cMA4WETcC5V3681wz9TNJ96T&location=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
    
        //Debug - See your Mapquest response
        // console.log(JSON.stringify(response, undefined, 2));
    
            if(error){

                reject('Unable to connect to Mapquest Servers', JSON.stringify(error, undefined, 2));
            }
            else if(response.body.info.statuscode == 400)
            {
                reject("Status Code 400 - perhaps your address was invalid.")
            }
            else if(response.statusCode == 200)
            {
                resolve({
                    address: body.results[0].providedLocation.location,
                    latitude: body.results[0].locations[0].latLng.lat,
                    longitude: body.results[0].locations[0].latLng.lng
                });
            }
        });
    });

};

geocodeAddress(90245).then((location)=>{
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) =>{
    console.log(errorMessage);
})