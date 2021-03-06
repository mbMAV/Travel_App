# Project Travel App

## Table of content
*[General info](#general-info)
*[Technologies](#technologies)
*[Setup](#setup)

## General info

Find it on GitHub: https://github.com/mbMAV/Travel_App

This project is about build and run a website with modern webpack loaders and plugins.
Using an natural language processing API and manipulate the HTML. Unit testing via Jest and and service worker are also required. The API key should not be visible on Client side.
Css files need to be Sass before production.

## Technologies

- Webpack 5
- node.js
- express
- dotenv
- Jest
- workbox

## Setup
### There are 3 API keys needet to run succesfull.
Create .env in root folder with:

GEO_USER=""
WEATHERBIT_KEY=""
PIXABAY_KEY=""

Get Keys from:

http://www.geonames.org/export/web-services.html
https://www.weatherbit.io/account/create
https://pixabay.com/api/docs/

### To run this project use:

`$ npm install`

`$ npm run build-dev`

`$ npm run build-prod`
`$ npm run start`

### For Jest unit test use:

`$ npm run test`