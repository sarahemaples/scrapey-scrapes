// when you click the button you want to scrapey scrape
$(document).on("click", "button", function() {
    $.get("/creepy").then(function(data) {
        console.log(data);
    })
})