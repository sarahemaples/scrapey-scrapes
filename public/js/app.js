// Grab the articles as a json
$.getJSON("/pastas", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      var html = "";
      var fullLink = "<a href='" + data[i].link + "' target='blank'>[full story]</a>";
      // render cards for each pasta
      // console.log(data[i].teaser.replace("[Read More]", ""));
      html += "<div class='card'><div class='card-header pasta-title'><h3>";
      html += data[i].title;
      html += "</div><div class='card-body'><h5>";
      html += "<p>";
      html += data[i].teaser.replace("[Read More]", fullLink);
      html += "</p>";
      html += "</h5></div><div class='card-footer'>";
      html += "<button class='btn btn-primary comment-btn' data-id='" + data[i]._id + "'>comment</button>";
      html += "</div>";
      // Display the apropos information on the page
      // $("#pastas").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].teaser + "<br />" + data[i].link + "</p>");
      $("#pastas").append(html);
    }
  });

// when you click the button you want to scrapey scrape
$(document).on("click", ".scrape-btn", function() {
    $.get("/scrape").then(function(data) {
        console.log(data);
    })
})

// get route for pasta. when user clicks on the title
// tthey will be given info on the item
// i guess send theem to the json that is cool
$(document).on("click", ".pasta-title", function() {
  var thisId = $(this).data("id");
  console.log(thisId);
  $.get("/pastas/"+thisId).then(function(data) {
    console.log(data);
  });
});

// post route for pasta. when user clicks the comment
// btn, they will be able to add a note to the pasta
$(document).on("click", ".comment-btn", function() {
  var thisId = $(this).data("id");
  console.log(thisId);
  $.post("/pastas/"+thisId).then(function(data) {
    console.log(data);
  });
})