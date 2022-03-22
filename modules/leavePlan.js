// This script will add an admin to a plan
const plans = require("../models/plans");
const user = require("../models/user");


module.exports = async ({ planId, adminData }) => {
	// check if admin inputed is an admin
	if (!adminData.authLevel) return { status: 403, err: "Only investors can make this request", message: "Not allowed!" };

	try {
		// get the plan from the planId to know if it is valid
		const thePlan = await plans.findById(planId);
		if (!thePlan) return { err: "This plan does not exist!", status: 404, message: "Refresh the page and retry!" };

		// check if admin is already in plan
		if (!adminData.adminActivePlan.filter(adminPlan => adminPlan.plan.toString() == planId.toString()).length) {
			return { status: 202, message: "You are not in this plan!", err: null, alert: "warning" };
		}
		else {
			// verify if all users has been resolved
			if (adminData.adminActivePlan.filter(adminPlan => adminPlan.plan.toString() == planId.toString())[0].user.length) return {
				err: "You have not resolved all your investments!",
				message: "Before leaving you must resolve all investment.",
				alert: "warning",
				status: 202
			}

			// Remove the admin from plan
			const updatePlan = plans.update({
				itemToupdateId: { _id: planId },
				propertyToUpdate: "activeAdmins",
				optionsToUse: "$pull",
				updateValue: adminData._id
			});
			if (!updatePlan) return { err: "Failed to remove you from this plan", status: 500, message: null };

			// Remove the plan from the admin
			const updateAdmin = user.update({
				itemToupdateId: { _id: adminData._id },
				propertyToUpdate: "adminActivePlan",
				optionsToUse: "$pull",
				updateValue: { plan: planId }
			});
			if (!updateAdmin) return { err: "Failed to remove this plan from you", status: 500, message: null };

			if (updatePlan && updateAdmin) return { message: `Admin added to ${await thePlan.name}`, status: 200, err: null };
			else return { status: 500, err: "Failed to remove you from this plan", message: "Refresh the page and then retry" };
		}
	} catch (err) {
		return { status: 500, message: err.message, err: "There was an error somewhere" };
	}
}