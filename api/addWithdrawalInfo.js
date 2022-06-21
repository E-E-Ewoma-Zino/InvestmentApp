const addWithdrawInfo = require("../modules/addWithdrawInfo");

module.exports = async (req, res) => {
	const { accountNo, accountName, bankName, withdrawAmount, currency, description } = req.body;
	try {
		const { status, message, err, alert } = await addWithdrawInfo({
			userData: req.user,
			accountName,
			accountNo,
			bankName,
			withdrawAmount,
			alert: "Debit",
			currency,
			description,
			methodOfPayment: "Bank Transaction"
		});

		return res.status(status).json({ alert, message, err });
	} catch (error) {
		console.error("An error in your code:", error);
		return res.status(500).json({ message: "An error occured in our server", err: error.message });
	}

}