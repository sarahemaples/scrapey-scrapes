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
router.get("/scrape", function(req, res) {
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

        // db.Pasta.createIndex( { "title": 1 },  )

        // create a new Pasta using the object we just built
        db.Pasta.create(creepyPasta)
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

// route for getting all the pastas fom the db
router.get("/pastas", function(req, res) {
  db.Pasta.find({})
    .then(function(dbPasta) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbPasta)
    })
    .catch(function(err) {
      res.json(err);
    });
});

router.get("/pastas/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Pasta.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("notes")
    .then(function(dbPasta) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbPasta);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// post route to add a note 
router.post("/pastas/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Notes.create({
    title: "test",
    body: "teehee"
  })
  .then(function(dbNote) {
    // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
    // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
    // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
    return db.Pasta.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
  })
  .then(function(dbPasta) {
    // If we were able to successfully update an Article, send it back to the client
    res.json(dbPasta);
  })
  .catch(function(err) {
    // If an error occurred, send it to the client
    res.json(err);
  });
})
    

module.exports = router;