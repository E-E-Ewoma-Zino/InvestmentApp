// this script will handel the creation of plans

const plans = require("../models/plans")

module.exports = async ({ name, minBudget, maxBudget, planKey, description }) => {
	try {
		const newPlan = await plans.create({ name, minBudget, maxBudget, planKey, description });

		if (!newPlan) return { err: "Failed to create plan", status: 404, message: null };
		else return { err: null, status: 200, message: "New plan created" };
	} catch (error) {
		return { err: err, status: 500, message: null };
	}
}