// This script will use the models to credit the user wallet
const { Convert } = require("easy-currencies");
const appWallet = require("../models/AppWallet");
const appManager = require("../models/appManager");
const transactionHistory = require("../models/transactionHistory");
const user = require("../models/user");
const colors = require("colors");

module.exports = async ({ amountToCredit, currency, userData, methodOfPayment, alert, description }) => {
	try {
		const convertedCurrency = await Convert(amountToCredit).from(currency || "NGN").to("USD");
		if (!convertedCurrency) return { err: `Could not convert currency ${currency} to USD`, status: 500, message: "Try another currency" };

		// convert the money to be in the value of the appWallet
		const convertedValue = await appManager.convertUSDToAppWalletValue({ amountInUSD: convertedCurrency });
		if (!convertedValue) return { err: "Unable to convert currency to appWallet value", status: 500, message: null };

		// Update the users wallet with the money transfered
		const updatedWallet = await appWallet.update({
			itemToupdateId: { _id: userData.appWallet },
			propertyToUpdate: "amount",
			updateValue: convertedValue,
			optionsToUse: "$inc"
		});
		// check if wallet was updated
		if (!updatedWallet) return { err: "Failed to update wallet", status: 404, message: null };

		// create a transaction for the wallet
		const newTransaction = await transactionHistory.create({
			amountInUSD: convertedCurrency,
			amountInAppWallet: convertedValue,
			toWho: userData._id,
			fromWho: userData._id,
			currency,
			status: 1,
			description,
			alert,
			methodOfPayment
		});
		// check if transaction was created
		if (!newTransaction) return { err: "Failed to create a transaction", status: 404, message: null };

		// Update the user with the transaction id
		const updatedUser = await user.update({
			itemToupdateId: { _id: userData._id },
			propertyToUpdate: "transactionHistory",
			optionsToUse: "$push",
			updateValue: newTransaction._id
		});
		// check if the user was updated
		if (!updatedUser) return { err: "Failed to update user data with new transaction", status: 404, message: null };

		if (updatedUser && newTransaction && updatedWallet) return { message: "Wallet has been credited", status: 200, err: null };
		else return { err: "Problem in creditWallet", status: 500, message: null };
	} catch (err) {
		return { err: err.message, status: 500, message: "No Internet Connection!" };
	}
}