const addPlanPermission = require("../modules/addPlanPermission");

module.exports = async (req, res) => {
	const { planId } = req.body;

	try {
		const { status, alert, message, err } = await addPlanPermission({ planId, userData: req.user });
		return res.status(status).json({ alert, message, err });
	} catch (error) {
		console.error("An error in your code:", error);
		return res.status(500).json({ message: "An error occured in our server", err: error.message });
	}
}