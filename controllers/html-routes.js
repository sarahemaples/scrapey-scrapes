var express = require("express");

var router = express.Router();

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
    
      // Empty array to save our scraped data
      var results = [];
    
      // With cheerio, find each h3-tag with the class "post-title" and loop through the results
      $("h3.post-title").each(function(i, element) {
    
        // Save the text of the h4-tag as "title"
        var title = $(element).text();

        console.log("\n--------------\n");
        // console.log($(element).siblings());
    
        // Find the h4 tag's parent a-tag, and save it's href value as "link"
        var link = $(element).children().attr("href");
    
        // Make an object with data we scraped for this h4 and push it to the results array
        results.push({
          title: title,
        //   teaser: teaser,
          link: link
        });
      });
    
      // After looping through each h4.headline-link, log the results
      console.log(results);
    });
    console.log(req.body);
    res.send("message received");
    });
    

module.exports = router;