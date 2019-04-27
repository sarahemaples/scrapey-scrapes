// Grab the articles as a json
$.getJSON("/pastas", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      var html = "";
      var fullLink = "<a href='" + data[i].link + "' target='blank'>[full story]</a>";
      // render cards for each pasta
      html += "<div class='card'><div class='card-header pasta-title'><h3>";
      html += data[i].title;
      html += "</div><div class='card-body'><h5>";
      html += "<p>";
      html += data[i].teaser.replace("[Read More]", fullLink);
      html += "</p>";
      html += "</h5></div><div class='card-footer'>";
      html += "<div class='comments-section' ></div>";
      html += "<button class='btn btn-primary comment-btn' data-id='" + data[i]._id + "'>comment</button>";
      html += "</div>";
      $("#pastas").append(html);
    }
  });

// when you click the button you want to scrapey scrape
$(document).on("click", ".scrape-btn", function() {
    $.get("/scrape").then(function(data) {
        console.log(data);
    })
})

// get route for pasta. when user clicks the comment
// btn, they will be able to add a note to the pasta
$(document).on("click", ".comment-btn", function() {
  var thisId = $(this).data("id");
  var target = $(this).parent().parent();

  $.get("/pastas/"+thisId).then(function(data) {
    // little box pops up allowing user to enter text for a comment
    // A textarea to add a new note body
    $(target).append("<textarea id='bodyinput' name='body'></textarea>");
    // A button to submit a new note, with the id of the article saved to it
    $(target).append("<button class='btn btn-primary' data-id='" + thisId + "' id='add-comment'>Add Comment</button>");
  });

})

// when user clicks the add comment btn, their comment will bee added
$(document).on("click", "#add-comment", function() {
  var thisId = $(this).data("id");
  var comment = {
    body: $("#bodyinput").val().trim()
  }

    $.post("/pastas/"+thisId, comment)
      .then(function(data) {
        console.log(data);
      });
})