// Require mongoose
var mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NewsSchema object
// This is similar to a Sequelize model
var NewsSchema = new Schema({
      // `title` is required and of type String
    title: {
        type: String,
        required: true
    },
    // `teaser` is required and of type String
    teaser: {
        type: String,
        required: true
    },
      // `link` is required and of type String
    link: {
        type: String,
        required: true
    }
})

// This creates our model from the above schema, using mongoose's model method
var News = mongoose.model("News", NewsSchema);

// Export the News model
module.exports = News;