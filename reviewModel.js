const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let reviewSchema = Schema({
	username: {
		type: String, 
		required: true,
	},
    review: {
		type: String, 
		required: true,
	},

});

module.exports = mongoose.model("Review", reviewSchema);
