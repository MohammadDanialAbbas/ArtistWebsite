const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = Schema({
	username: {
		type: String, 
		required: true,
	},
    password: {
		type: String, 
		required: true,
	},
    type:{
        type: String,
        required: true,
    },
    followedArtists:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist' 
    }],
    artworks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artwork' 
    }],

});

module.exports = mongoose.model("User", userSchema);
