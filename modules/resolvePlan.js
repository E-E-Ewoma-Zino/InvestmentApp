// This script helps resolve a plan when an admin is done with it for a user

const planHistory = require("../models/planHistory");
const plans = require("../models/plans");
const user = require("../models/user");
const getVerifiedPlanHistory = require("./helper/getPlanHistory.resolvePlan");
const verifyResolvePlan = require("./helper/verify.resolvePlan");
const transfer = require("./transfer");

module.exports = async ({ adminData, userId, planId, investmentOutCome }) => {
	// TODO: 
	// find the user by their Id
	const foundUser = await user.findById(userId);
	if (!foundUser) return { message: null, err: `Could not find the user with Id ${userId}`, status: 404 };

	// find the plan by its Id
	const foundPlan = await plans.findById(planId);
	if (!foundPlan) return { message: null, err: `Could not find the plan with Id ${planId}`, status: 404 };

	const getVerPlan = await getVerifiedPlanHistory({ userData: foundUser, adminData: adminData, plan: foundPlan });
	if (!getVerPlan) return { message: null, err: `Could not find the planHistory`, status: 404 };

	// verification before this requset can be processed
	const verify = verifyResolvePlan({adminData, verifiedPlanHistory: getVerPlan, userData: foundUser, planData: foundPlan});
	if (!verify.test)  return {err: verify.message, status: 403, message: "You are not allowed to make this request"};
	
	// remove user form plan
	const removedUserFromPlan = await plans.update({
		itemToupdateId: { _id: foundPlan._id },
		propertyToUpdate: "activeUsers",
		optionsToUse: "$pull",
		updateValue: foundUser._id
	});
	if (!removedUserFromPlan) return { message: null, err: `Could not remove the user ${foundUser._id} from the ${foundPlan._id}`, status: 501 };
	
	// remove plan from user
	const removedPlanFromUser = await user.update({
		itemToupdateId: { _id: foundUser._id },
		propertyToUpdate: "userActivePlan",
		optionsToUse: "$pull",
		updateValue: foundPlan._id
	});
	if (!removedPlanFromUser) return { message: null, err: `Could not remove the plan ${foundPlan._id} from the ${foundUser._id}`, status: 501 };
	
	// remove the user from the adminsActivePlan.user
	const removeUserFromAdmin = await user.update({
		itemToupdateId: { _id: adminData._id, "adminActivePlan.plan": foundPlan._id },
		propertyToUpdate: "adminActivePlan.$.user.id",
		optionsToUse: "$pull",
		updateValue: foundUser._id
	});
	if (!removeUserFromAdmin) return { err: `Could not remove the user ${foundUser._id} form the admin ${adminData._id} `, status: 501, message: null };

	console.log("outcone".america);
	// make a transfer from admin to the user 
	const {status: transfer_status, err: transfer_err, message: transfer_message} = await transfer({
		amountToTransfer: investmentOutCome,
		userData: adminData,
		transferTo: foundUser._id,
		description: "Resolved",
		methodOfPayment: "App Transfer"
	});
	if(transfer_err) return {err: transfer_err, status: transfer_status, message: transfer_message};
	
	// update the plan history for the admin and user. They both share the same plan history
	const updatePlanHistory = await planHistory.update({
		itemToupdateId: { _id: getVerPlan[getVerPlan.length - 1]._id },
		propertyToUpdate: "investmentOutcome",
		optionsToUse: "$set",
		updateValue: investmentOutCome
	});
	
	if(!updatePlanHistory) return {err: "Could not update the planHistory with the investmentOutCome", status: 500, message: null};
	
	if(removedUserFromPlan && removedPlanFromUser && removeUserFromAdmin && !transfer_err && updatePlanHistory) return { message: "Successfully resolved user", err: null, status: 200 }
	else return { status: 500, err: "Problem: Something went wrong while resolving this plan", message: null };

	// NOTE: Notify the user that he has bee resolved
}