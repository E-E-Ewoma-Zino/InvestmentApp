// This script adds a user to a plan and makes the required transactions

const AppWallet = require("../models/appWallet");
const plans = require("../models/plans");
const user = require("../models/user");
const planHistory = require("../models/planHistory");
const verifyAddUserToPlan = require("./helper/verify.addUserToPlan");
const transfer = require("./transfer");

module.exports = async ({ planId, userData, adminId, amountInvested }) => {
	// check if the req has a valid adminId and planId and check if  amount for investment is greater than plan minBudget
	// find the admin if admin exist
	const foundAdmin = await user.findById(adminId);
	if(!foundAdmin) return {err: `Could not find admin ${adminId}`, status: 400, message: null};

	// find the plan
	const foundPlan = await plans.findById(planId);
	if(!foundPlan) return {err: `Could not find plan ${planId}`, status: 400, message: null};

	// find appWallet to get the amount of the user
	const foundAppWallet = await AppWallet.findById(userData.appWallet);
	if(!foundAppWallet) return {err: `Could not find users appWallet ${userData.appWallet}`, status: 400, message: null};


	// verification
	const verify = verifyAddUserToPlan({ foundAdmin, foundPlan, foundAppWallet, userData, amountInvested });
	if (!verify.test) return {err: verify.message, message: "Access Denied!", alert: "warning", status: 403};
	
	// 
	// update plan's user details with userId
	const updatedPlan = await plans.update({
		itemToupdateId: { _id: foundPlan._id },
		propertyToUpdate: "activeUsers",
		optionsToUse: "$push",
		updateValue: userData._id
	});
	if(!updatedPlan) return {err: "Could not update plan with userData", status: 500, message: null};

	// update user's details with planId, adminId, and amount
	const updateUser = await user.update({
		itemToupdateId: { _id: userData._id },
		propertyToUpdate: "userActivePlan",
		optionsToUse: "$push",
		updateValue: {
			plan: foundPlan._id,
			admin: foundAdmin._id,
			amount: amountInvested
		}
	});
	if(!updateUser) return {err: "Could not update user with planId, adminId, and amount", status: 500, message: null};

	// update adminActivePlan details with userId and amount invested
	const updatedAdmin = await user.update({
		itemToupdateId: { _id: foundAdmin._id, "adminActivePlan.plan": foundPlan._id },
		propertyToUpdate: "adminActivePlan.$.user",
		optionsToUse: "$push",
		updateValue: {
			id: userData._id,
			amount: amountInvested
		}
	});
	if(!updatedAdmin) return {err: "Could not update the admin with userId and amount invested", status: 500, message: null};

	// transfer the money to the admin from the user
	const {status: transfer_status, err: transfer_err, message: transfer_message} = await transfer({
		amountToTransfer: amountInvested,
		userData,
		transferTo: adminId,
		methodOfPayment: "App Transfer",
		description: `Started ${foundPlan.name} with AppWallet(${amountInvested}), the invistor was admin ${foundAdmin.firstname}`
	});
	if(transfer_err) return {err: transfer_err, status: transfer_status, message: transfer_message};

	// create PlanHistory for this plan
	const newPlanHistory = await planHistory.create({
		name: foundPlan.name,
		plan: foundPlan._id,
		user: userData._id,
		admin: foundAdmin._id,
		investmentIncome: amountInvested
	});
	if(!newPlanHistory) return {err: "Could not update the plan history", status: 500, message: null};

	// update the user with this plan history
	const updateUserAgain = await user.update({
		itemToupdateId: { _id: userData._id },
		propertyToUpdate: "userPlanHistory",
		optionsToUse: "$push",
		updateValue: newPlanHistory._id
	});
	if(!updateUserAgain) return {err: "Could not update the user with the plan history", status: 500, message: null};

	// update the admin with this plan history
	const updateAdminAgain = await user.update({
		itemToupdateId: { _id: foundAdmin._id },
		propertyToUpdate: "adminPlanHistory",
		optionsToUse: "$push",
		updateValue: newPlanHistory._id
	});
	if(!updateAdminAgain) return {err: "Could not update the admin with the plan history", status: 500, message: null};

	if(foundAdmin && foundAppWallet && foundPlan && updateAdminAgain && updatedAdmin && updateUser && newPlanHistory && !transfer_err) return {err: null, status: 200, message: "Successfully added user to plan"};
	else return { status: 500, err: "Problem in adding user to plan", message: null };

}

// TODO: Add a try catch block
