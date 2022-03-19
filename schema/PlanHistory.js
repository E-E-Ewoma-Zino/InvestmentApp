// The module for the plan Historys
const mongoose = require("mongoose");

const planHistorySchema = mongoose.Schema({
	name: String,
	// Things needed for all plans Schema
	plan: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Plan"
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	investmentIncome: Number,
	investmentOutcome: Number
}, { timestamps: true });

module.exports = new mongoose.model("PlanHistory", planHistorySchema);