// add withdrawal details 
const user = require("../models/user");
const withdrawal = require("../models/withdrawal");
const appWallet = require("../models/appWallet");
const transactionHistory = require("../models/transactionHistory");

module.exports = async ({ userData, accountName, accountNo, bankName, withdrawAmount, currency, description, alert, methodOfPayment }) => {
	const theUser = await user.findById(userData._id);
	if (!theUser) return { err: "No user data found", message: "Login in and try again", alert: "danger", status: 404 };

	// check if details are ok
	const userAppWallet = await appWallet.findById(theUser._id);
	if (!userAppWallet) return { err: "No wallet data found", message: "Login in and try again", alert: "danger", status: 404 };

	// Check if user has the amount he wants to withdraw
	if (userAppWallet.amount < withdrawAmount) return { err: "You do not have " + withdrawAmount + " in your account", message: "Insufficient Balance", status: 304, alert: "warning" };

	// Update the users wallet with the money transfered
	const updatedWallet = await appWallet.update({
		itemToupdateId: { _id: theUser.appWallet },
		propertyToUpdate: "amount",
		updateValue: -withdrawAmount,
		optionsToUse: "$inc"
	});
	// check if wallet was updated
	if (!updatedWallet) return { err: "Failed to update wallet", status: 404, message: null };

	// create a transaction for the wallet
	const newTransaction = await transactionHistory.create({
		amountInUSD: withdrawAmount,
		amountInAppWallet: userAppWallet.amount - withdrawAmount,
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
		itemToupdateId: { _id: theUser._id },
		propertyToUpdate: "transactionHistory",
		optionsToUse: "$push",
		updateValue: newTransaction._id
	});
	// check if the user was updated
	if (!updatedUser) return { err: "Failed to update user data with new transaction", status: 404, message: null };

	
	const newWithdrawalDetails = {
		accountName,
		accountNo,
		bankName,
		user: theUser._id,
		withdrawAmount
	}
	
	// update the user with the withdrawal details
	const createNewWithdrawalDetails = await withdrawal.create(newWithdrawalDetails);
	if (!createNewWithdrawalDetails) return { err: "Could not create withdrawal.", message: "Refresh and try again", status: 403, alert: "danger" };
	
	if (updatedUser && newTransaction && updatedWallet && createNewWithdrawalDetails)  return { message: "Withdrawal Request Pending", err: null, status: 200, alert: "success" };
	else return { err: "Problem in withdrawal", status: 500, message: "This transaction may not be saved", alert: "danger"};
}

