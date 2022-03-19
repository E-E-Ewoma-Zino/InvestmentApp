// This script will verify if the user can be added to a plan

module.exports = ({ adminData: admin, verifiedPlanHistory: planH, userData: user, planData: plan }) => {
	let pass = true;
	let message = "";

	// make sure only admind can redolve a plan
	if (!admin.authLevel)  {
		pass = false;
		message = "Only admins can resolve a plan";
	}	// check if this plan has already been resolve
	else if (!user.userActivePlan.filter( activePlan => activePlan.toString() == plan._id.toString() ).length) {
		pass = false;
		message = "This user is not running this plan";
	}	// 
	else if (planH[planH.length - 1].investmentOutcome !== undefined) {
		console.log(planH[planH.length - 1].investmentOutcome);
		pass = false;
		message = "You have already resolved this investment with this user";
	}
	else {
		console.log("Come here");
	}
	// 
	return { test: pass, message };
}

