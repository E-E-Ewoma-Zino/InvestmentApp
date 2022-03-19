// The module for the App Manager
const mongoose = require("mongoose");

const appManagerSchema = mongoose.Schema({
	appName: {
		type: String,
		default: "Investment App",
		requierd: true
	},
	// standard value that would be used in converting the appManager ot any currency
	// Here for default 1 of the appManager is equal to the current value of dollar
	// So 1 dollar = 0.05 appManager
	appWalletValue: {
		type: Number,
		default: "5",
		required: true
	}
	// Things needed for all appManager Schema
}, { timestamps: true });

module.exports = new mongoose.model("appManager", appManagerSchema);