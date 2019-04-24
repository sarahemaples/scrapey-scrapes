// Grab the articles as a json
$.getJSON("/pastas", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#pastas").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
  });

// when you click the button you want to scrapey scrape
$(document).on("click", "button", function() {
    $.get("/creepy").then(function(data) {
        console.log(data);
    })
})