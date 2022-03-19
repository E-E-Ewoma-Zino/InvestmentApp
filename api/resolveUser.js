const resolvePlan = require("../modules/resolvePlan");

module.exports = async (req, res) => {
	const { plan, user, amount } = req.body;
	try {
		const { status, message, err, alert } = await resolvePlan({
			adminData: req.user,
			userId: user,
			planId: plan,
			investmentOutCome: Number(amount)
		});

		return res.status(status).json({ alert, message, err });
	} catch (error) {
		console.error("An error in your code:", error);
		return res.status(500).json({ message: "An error occured in our server", err: error.message });
	}

}