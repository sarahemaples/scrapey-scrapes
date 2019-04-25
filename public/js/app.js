// Grab the articles as a json
$.getJSON("/pastas", function(data) {
    // For each one
    for (var i = 5; i < data.length; i++) {
      var html = "";
      // render cards for each pasta
      html += "<div class='card'><div class='card-header'><h3>";
      html += data[i].title;
      html += "</div><div class='card-body'><h5>";
      html += "<p data-id='" + data[i]._id + "'>";
      html += data[i].teaser;
      html += "</p></h5></div><div class='card-footer'>";
      html += "<a href='" + data[i].link + "' target='blank'>full story</a>";
      html += "</div>";
      // Display the apropos information on the page
      // $("#pastas").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].teaser + "<br />" + data[i].link + "</p>");
      $("#pastas").append(html);
    }
  });

// when you click the button you want to scrapey scrape
$(document).on("click", "button", function() {
    $.get("/creepy").then(function(data) {
        console.log(data);
    })
})

// 11