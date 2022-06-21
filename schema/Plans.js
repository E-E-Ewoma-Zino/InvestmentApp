// The module for the plans
const mongoose = require("mongoose");

const planSchema = mongoose.Schema({
	name: String,
	description: String,
	planPic: Object,
	minBudget: {
		type: Number,
		required: true,
		min: 0
	},
	maxBudget: {
		type: Number,
		required: true,
	},
	planKey: {
		type: String,
		default: "*"
	},
	activeUsers: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}],
	activeAdmins: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}],

	// Things needed for all plans Schema
}, { timestamps: true });

module.exports = new mongoose.model("Plan", planSchema);