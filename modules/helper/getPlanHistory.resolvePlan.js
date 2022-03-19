// This script will verify if the user can be resolve 

const planHistory = require("../../models/planHistory");

module.exports = async ({ userData, plan, adminData }) => {
	// check if the user and the admin shares the sane planHistory	
	return await planHistory.schema.find({ plan: plan._id, user: userData._id, admin: adminData._id });
}