// This script add a user to a plan permission

const plans = require("../models/plans");
const user = require("../models/user");

module.exports = async ({ userData, planId }) => {
	// TODO:
	// I don't know why but why I try to call the plan.js file to plans.findById in this file I will no longer be able to use the user.findById in the plan file
	// so I found out that if I call the plans.js file from inside the function like this it will work, so for some reason I con't request the plans.js file from out side this function!
	const foundPlan = await plans.findById(planId);
	if (!foundPlan) return { err: `Could not find the plan ${planId}`, status: 400, message: null };

	// check if the user is already in the plan
	if (userData.authLevel) return {message: "Admins can not join a plan", err: "You can not own a plan key", status: 403};

	// check if user already has plan permission
	if (userData.planPermission.filter(premission => premission == foundPlan.planKey)[0] == [][0]) {
		const updatedUser = await user.update({
			itemToupdateId: { _id: userData._id },
			propertyToUpdate: "planPermission",
			optionsToUse: "$push",
			updateValue: foundPlan.planKey
		});
		if (!updatedUser) return { err: `Could not update users ${userData._id}with plan key`, status: 400, message: null };
		else return { err: null, status: 200, message: "You now have this plan key" };
	}
	else return { err: null, status: 202, alert: "warning", message: "You already have this plans key" };
	// send 200 to controller
}