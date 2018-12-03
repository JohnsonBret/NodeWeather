// 1bf8fa738db75403660202f851c66313
// https://api.darksky.net/forecast/apikey/lat,long


const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

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

//Debug - See what Yargs Encoded
// console.log(`Yargs Address Encoded:  ${JSON.stringify(encodeURI(argv.address))}`);

geocode.geocodeAddress(argv.address, (errorMessage, results) => {

    if(errorMessage)
    {
        console.log(errorMessage);
    }
    else
    {
        console.log(results.address);
    }

    //Move this
    weather.getWeather(results.latitude, results.longitude, (errorMsg, weatherResults ) => {

        if(errorMsg)
        {
            console.log(errorMsg);
        }
        else
        {
            console.log(`It's currently ${weatherResults.temperature} but it feels like ${weatherResults.apparentTemp}`);
            //console.log(JSON.stringify(weatherResults, undefined, 2));
        }
        
    });

});


