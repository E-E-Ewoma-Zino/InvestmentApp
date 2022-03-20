// This script will verify if the user can be added to a plan

module.exports = ({ foundAdmin: admin, foundPlan: plan, userData: user, amountInvested: amount, foundAppWallet: appWallet }) => {
	let pass = true;
	let message = "";

	// make sure only user can join a plan
	if (user.authLevel) {
		pass = false;
		message = "Admins can not join a plan";
	}	// check if the user is already in the plan
	else if (user.userActivePlan.filter(aPlans => aPlans.plan.toString() == plan._id.toString()).length) {
		pass = false;
		message = "You are already on this plan, wait until it gets resolved or you can cancel it";
	}	// check if adminId inputed is an admin
	else if (!admin.authLevel) {
		pass = false;
		message = "This user does not have access to control this plan";
	} 	// check if admin is in the plan else return
	else if (!plan.activeAdmins.filter(admin => admin.toString() == admin._id.toString()).length) {
		pass = false;
		message = "This admin does not exist in this plan";
	} 	// check if user has plan key else return
	else if (!user.planPermission.filter(permission => permission == plan.planKey).length) {
		pass = false;
		message = "User does not have this plan key!";
	} 	// check if user has enough money for this plan
	else if (amount > appWallet.amount) {
		pass = false;
		message = "Insuffient Balance";
	} 	// check if user payed above plan minBudget else return
	else if (amount < plan.minBudget) {
		pass = false;
		message = `${amount} is too small for this plan`;
	}
	else if (amount > plan.maxBudget) {
		pass = false;
		message = `${amount} is greater than this plans budget, try a different plan with larger budget`;
	}
	else {
		console.log("Come here");
	}
	// 
	return { test: pass, message };
}

