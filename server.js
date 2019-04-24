var express = require("express");
// Set Handlebars.
var exphbs = require("express-handlebars");
// Our newest addition to the dependency family
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// // It works on the client and on the server
// var axios = require("axios");
// var cheerio = require("cheerio");

// // Require all models
// var db = require("./models");

var PORT = process.env.PORT || 8080;

// Initialize Express
var app = express();

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/scrapeyScrapes", { useNewUrlParser: true });

// here you need to use you api routes and stuff
var controller = require("./controllers/html-routes");

app.use(controller);

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});