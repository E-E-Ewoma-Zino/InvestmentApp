// This script removes the admin from a plan
const leavePlan = require("../modules/leavePlan");

module.exports = async (req, res) => {
	const { plan } = req.body;
	try {
		const { status, message, alert, err } = await leavePlan({
			planId: plan,
			adminData: req.user
		});
	
		return res.status(status).json({ alert, message, err });
	} catch (error) {
		console.error("An error in your code:", error);
		return res.status(500).json({ message: "An error occured in our server", err: error.message });
	}
}