// The module for the Withdrawal
const mongoose = require("mongoose");

const withdrawal = mongoose.Schema({
	accountName: String,
	accountNo: Number,
	bankName: String,
	withdrawAmount: Number,
	status: {
		type: Number,
		default: 0,
		min: -1,
		max: 1
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
}, { timestamps: true });

module.exports = new mongoose.model("Withdrawal", withdrawal);