// The module for the transactionHistory
const mongoose = require("mongoose");

const transactionHistorySchema = mongoose.Schema({
	amountInUSD: Number,
	// this is the amount that was sent in appWallet value, it is equvilent to the amountInUSD value
	amountInAppWallet: Number,
	methodOfPayment: String,
	currency: String,
	alert: {
		type: String,
		default: "Credit"
	},
	description: String,
	account: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "account"
	},
	fromWho: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	toWho: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	status: {
		type: Number,
		min: -1,
		max: 1
	}
	// Things needed for all transactionHistory Schema
}, { timestamps: true });

module.exports = new mongoose.model("TransactionHistory", transactionHistorySchema);