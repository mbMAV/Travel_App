var path = require('path')
const express = require('express')
const fetch = require('node-fetch')
const FormData = require('form-data')
const dotenv = require('dotenv')
dotenv.config()
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const app = express()
const port = 8083

apidata = {}

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

app.post('/geonamesApi', function (request, response) {
    console.log("run geoApi post route");
    response => response.json()
    const geoUser = process.env.GEO_USER;
    let location = request.body.text;
    console.log(location);

    const getGeo = fetch(`http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${geoUser}`)
        .then((response) => response.json())
        .then((body) => {
            console.log("::: Response is here :::");
            console.log(body);
            const apidata = {
                lat: body.geonames[0].lat,
                lng: body.geonames[0].lng,
                name: body.geonames[0].name,
                country: body.geonames[0].countryName,
            }
            return apidata;
        })
        .then(apidata => {
            console.log(apidata);
            response.send(apidata)
        })

        .catch(error => console.log('error', error));
});

app.post('/weatherApi', function (request, response) {
    console.log("run weatherApi post route");
    const weatherUser = process.env.WEATHERBIT_KEY;
    let daysOffset = request.body.Timespan_days;
    let geoLocation = `lat=${request.body.lat}&lon=${request.body.lng}`;
    console.log(geoLocation);
    console.log(daysOffset);


    const getGeo = fetch(`http://api.weatherbit.io/v2.0/forecast/daily?&${geoLocation}&days=${daysOffset}&key=${weatherUser}`)
        .then((response) => response.json())
        .then((body) => {
            console.log("::: Response is here :::");
            console.log(body);
            const apidata = {
                midTemp: body.data[0].temp,
                sky: body.data[0].weather.description
            }
            return apidata;
        })
        .then(apidata => {
            console.log(apidata);
            response.send(apidata)
        })

        .catch(error => console.log('error', error));
});

app.post('/pictureApi', function (request, response) {
    console.log("run pictureApi post route");
    const pixabayUser = process.env.PIXABAY_KEY;
    let random = Math.floor(Math.random() * 21);
    let picLocation = request.body.name;
    console.log(picLocation);


    const getGeo = fetch(`https://pixabay.com/api/?key=${pixabayUser}&q=${picLocation}&image_type=photo&pretty=true`)
        .then((response) => response.json())
        .then((body) => {
            console.log("::: Response is here :::");
            console.log(body);
            const apidata = {
                picLink: body.hits[random].webformatURL,
            }
            return apidata;
        })
        .then(apidata => {
            console.log(apidata);
            response.send(apidata)
        })

        .catch(error => console.log('error', error));
});




// // Setup empty JS object to act as endpoint for all routes
// projectData = {};

// // Require Express to run server and routes
// const express = require('express');

// // Start up an instance of app
// const app = express();

// /* Middleware*/
// //Here we are configuring express to use body-parser as middle-ware.
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // Cors for cross origin allowance
// const cors = require('cors');
// app.use(cors());

// // Initialize the main project folder
// app.use(express.static('dist'));

// const port = 5500;

// // Setup Server
// const server = app.listen(port, listening);

// function listening() {
//     console.log('Server running');
//     console.log(`running at localhost: ${port}`);
// }

// // Add GET route

// app.get('/all', (req,res) => {

//     res.send(projectData);
//     console.log(`GET responded projectData:`,projectData);
// });

// // Add POST route

// app.post('/addEntry', (req,res)=> {

//     newEntry = {
//         temp: req.body.temp,
//         date: req.body.date,
//         user_response: req.body.user_response
//     }

//     projectData = newEntry;
//     console.log(projectData);
//     console.log("the post request is here!");
// });






// /* Global Variables */

// // Personal API Key for OpenWeatherMap API
// const key = ""; // place API key here
// const apiKey = `&appid=${key}&units=imperial`;
// const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// const country_code = ',us';


// // Create a new date instance dynamically with JS
// let d = new Date();
// let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// // Add event listener at the generate button
// document.getElementById('generate').addEventListener('click', performAction);


// function performAction(e){
//     // Get zip code from user input
//     const newZip = document.getElementById('zip').value;
//     // Get feelings from user input
//     const user_input = document.getElementById('feelings').value;
//     getWeather(baseURL,newZip,country_code,apiKey)

//     .then(function(data){
//         const date = {date:newDate};
//         const temp = {temp:data.main.temp};
//         const user_response = {user_response:user_input};
//         // console.log(`in .then`);
//         // console.log(data);
//         // console.log(temp);
//         // console.log(date);
//         // console.log(user_response);
//         postData('/addEntry',{date:newDate, temp:data.main.temp, user_response:user_input});
//     })

//     .then(function() {
//         getData('/all');
//     })
// }

// // Make async API request at openweathermap.org
// const getWeather = async (baseURL, newZip, country_code,apiKey)=>{

//     const res = await fetch(baseURL+newZip+country_code+apiKey);

//     try {
//         const data = await res.json();
//         // console.log(data);

//     postData('/addEntry', data);
//     return data;

// }  catch(error) {
//     console.log("error", error);
//     }
// }

// // Make async POST request
// const postData = async ( url = '', data)=>{
//     const res = await fetch(url, {
//     method: 'POST',
//     credentials: 'same-origin',
//     headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//     },
//      // Body data type must match "Content-Type" header
//     body: JSON.stringify(data),
//     });

//     try {
//         const newData = await res.json();
//         console.log(newData);
//         return newData;

//     }catch(error) {
//     console.log("error", error);
//     }
// }

// // Make async GET request
// const getData = async () => {
//     const request = await fetch('/all')
//     try{
//         const allData = await request.json();
//         console.log("allData is:", allData);
// //  Update DOM elements
//         document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
//         document.getElementById('content').innerText = allData.user_response;
//         document.getElementById('date').innerHTML = allData.date;

//     }catch(error) {
//     console.log("error", error);
//     }
// }