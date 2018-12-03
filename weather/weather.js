const request = require('request');

const getWeather = (latitude, longitude, callback) => {

    var encodedLatitude = encodeURI(latitude);
    var encodedLongitude = encodeURI(longitude);

    // console.log(`Latitude: ${latitude} Longitude: ${longitude}`);

    var apiKey = "1bf8fa738db75403660202f851c66313";


    request({
        url: `https://api.darksky.net/forecast/${apiKey}/${encodedLatitude},${encodedLongitude}`,
        json: true
    }, (error, response, body) => {

        // Debug Log the response from Dark Sky
        // console.log(JSON.stringify(response, undefined, 2));
 
        if(error){
            callback('Unable to connect to Dark Sky Api');
            console.log(JSON.stringify(error, undefined, 2));
        }
        else if(response.statusCode == 403)
        {
            callback("Dark Sky Status Code 403 - Api Key is incorrect.");
        }
        else if(response.statusCode == 400)
        {
            callback("Dark Sky Status Code 400 - Invalid Latitude or Longitude.");
        }
        else if(response.statusCode == 200)
        {
            if(!error)
            {
                callback(undefined, {
                    temperature: body.currently.temperature,
                    apparentTemp: body.currently.apparentTemperature
                 });
            }
            else{
                callback("Unable to fetch weather.");
            }
            // console.log(JSON.stringify(response, undefined, 2));
        }
    });
}



module.exports = {
    getWeather
};