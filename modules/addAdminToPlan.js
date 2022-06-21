// This script will add an admin to a plan
const plans = require("../models/plans");
const user = require("../models/user");


module.exports = async ({ planId, adminData }) => {
	// check if admin inputed is an admin
	if (!adminData.authLevel) return { status: 403, err: "You do not have access to be added to this plan", message: "Not allowed!" };

	try {
		// get the plan from the planId to know if it is valid
		const thePlan = await plans.findById(planId);
		if (!thePlan) return { err: "This plan does not exist!", status: 404, message: null, alert: "danger" };

		// check if admin is already in plan
		if (!adminData.adminActivePlan.filter(adminPlan => adminPlan.plan.toString() == thePlan._id.toString()).length) {
			// update the plan with the adminId
			const updatePlan = plans.update({
				itemToupdateId: { _id: thePlan._id },
				propertyToUpdate: "activeAdmins",
				optionsToUse: "$push",
				updateValue: adminData._id
			});
			if (!updatePlan) return { err: "Failed to update plan with adminId", status: 500, message: null };

			// update the admin with the planId
			const updateAdmin = user.update({
				itemToupdateId: { _id: adminData._id },
				propertyToUpdate: "adminActivePlan",
				optionsToUse: "$push",
				updateValue: {
					plan: thePlan._id,
					user: []
				}
			});
			if (!updateAdmin) return { err: "Failed to update admin with planId", status: 500, message: null };

			// check if the plan description has been added before
			if (!adminData.planDescriptions.filter(des => des.plan.toString() == thePlan._id.toString()).length) {
				// create a plan description for this plan
				const planDescriptions = await user.update({
					itemToupdateId: { _id: adminData._id },
					propertyToUpdate: "planDescriptions",
					optionsToUse: "$push",
					updateValue: {
						plan: thePlan._id
					}
				});
				if (!planDescriptions) return { err: "Failed to create user plan description", status: 500, message: null };
			}
			if (updatePlan && updateAdmin) return { message: `Admin added to ${await thePlan.name}`, status: 200, err: null };
			else return { status: 500, err: "Problem in adding admin to plan function", message: null };
		}
		else {
			return { status: 202, message: "You are already in this plan", alert: "warning" };
		}
	} catch (err) {
		console.log("errorr::", err);
		return { status: 500, err: err.message, message: "There was an error somewhere" };
	}
}