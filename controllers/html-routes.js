var express = require("express");

var router = express.Router();

// default route
router.get("/", function(req, res){
    // console.log(req);
    res.render("index");
});

module.exports = router;