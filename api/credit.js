const creditWallet = require("../modules/creditWallet");

module.exports = async (req, res) => {
	const { amount, currency, description } = req.body;

	try {
		const { err, message, status, alert } = await creditWallet({
			userData: req.user,
			amountToCredit: Number(amount),
			alert: "Credit",
			currency,
			description,
			methodOfPayment: "Bank Transfer"
		});
	
		return res.status(status).json({ message, err, alert });
	} catch (error) {
		console.error("An error in your code:", error);
		return res.status(500).json({ message: "An error occured in our server", err: error.message });
	}
}
