var path = require('path')
const express = require('express')
const fetch = require('node-fetch')
const FormData = require('form-data')
const dotenv = require('dotenv')
dotenv.config()
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const app = express()
const port = 8083

let apidata = {}

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})


// post route for fetching geonames Api
app.post('/geonamesApi', function (request, response) {
    response => response.json()
    const geoUser = process.env.GEO_USER;
    let location = request.body.text;

    const getGeo = fetch(`http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${geoUser}`)
        .then((response) => response.json())
        .then((body) => {
            const apidata = {
                lat: body.geonames[0].lat,
                lng: body.geonames[0].lng,
                name: body.geonames[0].name,
                country: body.geonames[0].countryName,
            }
            return apidata;
        })
        .then(apidata => {
            response.send(apidata)
        })

        .catch(error => console.log('error', error));
});

// post route for fetching weather Api
app.post('/weatherApi', function (request, response) {
    const weatherUser = process.env.WEATHERBIT_KEY;
    let daysOffset = request.body.timeSpanDays;
    let geoLocation = `lat=${request.body.lat}&lon=${request.body.lng}`;

    const getWeather = fetch(`http://api.weatherbit.io/v2.0/forecast/daily?&${geoLocation}&days=${daysOffset}&key=${weatherUser}`)
        .then((response) => response.json())
        .then((body) => {
            const apidata = {
                midTemp: body.data[0].temp,
                sky: body.data[0].weather.description
            }
            return apidata;
        })
        .then(apidata => {
            response.send(apidata)
        })

        .catch(error => console.log('error', error));
});

// post route for fetching picture Api
app.post('/pictureApi', function (request, response) {
    const pixabayUser = process.env.PIXABAY_KEY;
    let random = Math.floor(Math.random() * 21);
    let picLocation = request.body.name;

    const getPicture = fetch(`https://pixabay.com/api/?key=${pixabayUser}&q=${picLocation}&image_type=photo&pretty=true`)
        .then((response) => response.json())
        .then((body) => {
            const apidata = {
                picLink: body.hits[random].webformatURL,
            }
            return apidata;
        })
        .then(apidata => {
            response.send(apidata)
        })

        .catch(error => console.log('error', error));
});

// Testin route
app.get('/test',  function (req, res) {
    res.send({message: 'Success'})
});

module.exports = app