const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let artworkSchema = Schema({
  Title: {
    type: String,
    required: true,
  },
  Artist: {
    type: String,
    required: true,
  },
  Year: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Medium: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Poster: {
    type: String,
    required: true,
  },
  UserWhoLiked:[{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  reviews:[{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'reviews'
  }],
  // Add other fields as needed based on your requirements
});

module.exports = mongoose.model("Artwork", artworkSchema);
