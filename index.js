const express = require('express');
const app = express();
const browserObject = require('./browser');
const scraperController = require('./pageController');

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

app.get('/', async (req, res) => {
    res.json(await scraperController(browserInstance));
});

app.get('*', async (req, res) => {
    res.json({errorMessage: "404 Not Found"});
});

const port = process.env.PORT || 8080;

app.listen(port, function () {
    console.log("Server is running port: 8080");
});