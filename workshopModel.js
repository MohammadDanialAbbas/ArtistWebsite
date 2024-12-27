const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let workshopSchema = Schema({
	Title: {
		type: String, 
		required: true,
	},
    Artist: {
		type: String, 
		required: true,
	},

});

module.exports = mongoose.model("Workshop", workshopSchema);
