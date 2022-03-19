const addUserToPlan = require("../modules/addUserToPlan");

module.exports = async (req, res) => {
	const { plan, admin, amount } = req.body;
	try {
		const { status, message, err, alert } = await addUserToPlan({
			planId: plan,
			userData: req.user,
			adminId: admin,
			amountInvested: Number(amount)
		});

		return res.status(status).json({ alert, message, err });
	} catch (error) {
		console.error("An error in your code:", error);
		return res.status(500).json({ message: "An error occured in our server", err: error.message });
	}
}