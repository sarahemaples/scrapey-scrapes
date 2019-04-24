var express = require("express");

var router = express.Router();

// Require all models
var db = require("../models");

// default route
router.get("/", function(req, res){
    // console.log(req);
    res.render("index");
});

// creepy route (eventually will be our scrapee i hope)


// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// creepy GET route (eventually will be our scrapee i hope)
router.get("/creepy", function(req, res) {
    // Making a request via axios for `nhl.com`'s homepage
    axios.get("https://www.creepypasta.com/").then(function(response) {
    
      // Load the body of the HTML into cheerio
      var $ = cheerio.load(response.data);
    
      // Empty object to save our scraped data
      var results = [];
    
      // With cheerio, find each div-tag with the class "post-content" and loop through the results
      $("div.post-content").each(function(i, element) {
        // save an empty pasta object
        var creepyPasta = {};
    
        // save the title text
        creepyPasta.title = $(element).children("h3.post-title").text();
        // save the teaser text in the p tag
        creepyPasta.teaser = $(element).children("p").text();
        // save the link from the title
        creepyPasta.link = $(element).children("h3.post-title").children().attr("href");

        // create a new News using the object we just built
        db.News.create(creepyPasta)
          .then(function(dbPasta) {
            // view the added result in the console
            console.log(dbPasta);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
    
        // // Make an object with data we scraped for this h4 and push it to the results array
        // results.push({
        //   title: title,
        //   teaser: teaser,
        //   link: link
        // });
      });
    
      // After looping through each h4.headline-link, log the results
      // console.log(results);
    });
    // console.log(req.body);
    res.send("Scrape complete");
    });
    

module.exports = router;