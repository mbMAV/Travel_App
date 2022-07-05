// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 5500;

// Setup Server
const server = app.listen(port, listening);

function listening() {
    console.log('Server running');
    console.log(`running at localhost: ${port}`);
}

// Add GET route

app.get('/all', (req,res) => {

    res.send(projectData);
    console.log(`GET responded projectData:`,projectData);
});

// Add POST route

app.post('/addEntry', (req,res)=> {

    newEntry = {
        temp: req.body.temp,
        date: req.body.date,
        user_response: req.body.user_response
    }

    projectData = newEntry;
    console.log(projectData);
    console.log("the post request is here!");
});