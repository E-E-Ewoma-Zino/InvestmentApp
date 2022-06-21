// All get requests

const plans = require("../models/plans");
const user = require("../models/user")

module.exports = {
	userById: async (req, res) => {
		const { id } = req.query;
		const theUser = await user.findById(id);

		if (theUser) return res.status(200).json({ err: null, message: theUser });
		else return res.status(404).json({ err: `Could not find user with id ${id}`, message: "Try again later" });
	},
	userByIdAndPopulate: async (req, res) => {
		const { id, opt } = req.query;
		const theUser = await user.findByIdAndPopulate(id, opt);

		if (theUser) return res.status(200).json({ err: null, message: theUser });
		else return res.status(404).json({ err: `Could not find user with id ${id}`, message: "Try again later" });
	},
	allUsers: async (req, res) => {
		const theUsers = await user.findById();

		if (theUsers) return res.status(200).json({ err: null, message: theUsers });
		else return res.status(404).json({ err: `Could not find users`, message: "Try again later" });
	},
	planHistory: async (req, res) => {
		
	},
	planById: async (req, res) => {
		const {id} = req.query;
		const thePlan = await plans.findById(id);
		
		if (thePlan) return res.status(200).json({err: null, message: thePlan});
		else return res.status(404).json({err: `Could not find plan with id ${id}`, message: "Try again later"});
	},
	allPlans: async (req, res) => {
		const thePlans = await plans.findById();

		if (thePlans) return res.status(200).json({ err: null, message: thePlans });
		else return res.status(404).json({ err: `Could not find plans`, message: "Try again later" });
	},
	transactionHistory: async (req, res) => {

	},
	appWallet: async (req, res) => {

	}
}