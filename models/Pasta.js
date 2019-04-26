// Require mongoose
var mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new PastaSchema object
// This is similar to a Sequelize model
var PastaSchema = new Schema({
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
    },
    // `note` is an object that stores a Note id
    // The ref property links the ObjectId to the Note model
    // This allows us to populate the Article with an associated Note
    note: {
        type: Schema.Types.ObjectId,
        ref: "Notes"
    }
})

// This creates our model from the above schema, using mongoose's model method
var Pasta = mongoose.model("Pasta", PastaSchema);

// Export the Pasta model
module.exports = Pasta;