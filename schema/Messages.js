// The module for the messages
const mongoose = require("mongoose");

const messagesSchema = mongoose.Schema({
	message: String,
	from: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	to: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	status: {
		type: Number,
		min: -1,
		max: 1
	}
	// Things needed for all messages Schema
}, { timestamps: true });

module.exports = new mongoose.model("Messages", messagesSchema);