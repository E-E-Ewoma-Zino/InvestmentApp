// The module for the users
const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	// Things needed for all user Schema
	username: String,
	password: String,
	firstname: String,
	lastname: String,
	phoneNo: String,
	address: String,
	zipCode: String,
	profilePic: Object,
	// things need for a user for this site
	// 
	profilePic: Object,
	// balance
	appWallet: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "AppWallet"
	},
	walletType: {
		type: String,
		default: "USDT"
	},
	love: String,
	// history
	transactionHistory: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "TransactionHistory"
	}],

	// message
	message: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Message"
	},

	// this is the plans this user is currenty on
	userActivePlan: [{
		plan: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Plan"
		},
		admin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		amount: {
			type: Number
		}
	}],

	// this would hold the history of the plans the admin has been in, and how it went
	userPlanHistory: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "PlanHistory"
	}],

	// this is a list of keys that a user can use to access a plan
	planPermission: {
		type: Array,
		default: ["*"]
	},

	// things for admin
	// 
	// admins are allowed to have users who are investing with them for each plan
	adminActivePlan: [{
		plan: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Plan"
		},
		user: [
			{
				id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User"
				},
				amount: Number
			}
		],
	}],

	// admin plan descriptions
	planDescriptions: [{
		plan: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Plan"
		},
		description: {
			type: String,
			default: "Empty"
		},
		method: {
			type: String,
			default: "Empty"
		},
		increase: {
			type: Number,
			default: 10
		},
		duration: {
			type: String,
			default: "Empty"
		},
		maxInvestment: {
			type: Number,
			default: 3
		},
		level: {
			type: String,
			default: "Basic"
		}
	}],

	// this would hold the history of the plans the admin has been in, and how it went
	adminPlanHistory: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "PlanHistory"
	}],

	// Things needed for the authorization for admin and user.
	authLevel: {
		type: Number,
		min: 0,
		max: 2,
		default: 0
	},
	// Things needed for all user Schema
}, { timestamps: true });

userSchema.plugin(passportLocalMongoose);

module.exports = new mongoose.model("User", userSchema);