// This script helps with the transfer of money between user

const appWallet = require("../models/AppWallet");
const transactionHistory = require("../models/transactionHistory");
const user = require("../models/user");

module.exports = async ({ amountToTransfer, userData, transferTo, methodOfPayment, description }) => {
	try {
		// find the users account to see if he has enough money to transfer
		const appWalletFound = await appWallet.findById(userData.appWallet);
		if (!appWalletFound) return { err: "This account does not exist!", status: 404, message: null };

		// check if user has enough money to transfer
		if (appWalletFound.amount < amountToTransfer) return { message: "You do not have enough money to transfer", status: 402, err: "Insuffient Balance" };
		else console.log("Pass");

		// first find the user using the transfetTo which is an id for appWallet, so we get the actual user Id from the appWallet Id
		const userBeingTransferedTo = await user.findById(transferTo);
		if (!userBeingTransferedTo) return { err: "This person you are transfering to does not exist!", status: 404, message: null };
		
		// update the wallet of the person making the transfer
		// remove the money from the debitor
		const updatedAppWallet = await appWallet.update({
			itemToupdateId: { _id: userData.appWallet },
			propertyToUpdate: "amount",
			updateValue: -amountToTransfer,
			optionsToUse: "$inc"
		});
		if (!updatedAppWallet) return { err: `Could not update the user making the transfer with id ${userData.appWallet} with the debit`, status: 404, message: null };

		// create a transaction for the debit transfer
		const senderTransaction = await transactionHistory.create({
			amountInAppWallet: amountToTransfer,
			toWho: userBeingTransferedTo._id,
			fromWho: userData._id,
			status: 1,
			alert: "Dedit",
			description,
			methodOfPayment
		});
		if (!senderTransaction) return { err: `Could not create a transaction for the debit of the user with id ${userData._id}`, status: 404, message: null };


		// put that new transaction into the wallet of the user who made the transfer
		const updatedUser = await user.update({
			itemToupdateId: { _id: userData._id },
			propertyToUpdate: "transactionHistory",
			optionsToUse: "$push",
			updateValue: senderTransaction._id
		});
		if (!updatedUser) return { err: `Could not update the user with a new debit transaction`, status: 404, message: null };

		// This is where the money is transfered to the person of instrest
		// add the money to the creditor
		// update the wallet of the user to be credited
		// this will update the wallet of the person being transfered to
		const updatedReceiversWallet = await appWallet.update({
			itemToupdateId: { _id: userBeingTransferedTo.appWallet },
			propertyToUpdate: "amount",
			updateValue: amountToTransfer,
			optionsToUse: "$inc"
		});
		// console.log("error".bgYellow, userBeingTransferedTo, updatedReceiversWallet);
		if (!updatedReceiversWallet) return { err: `Could not update the user with a the credited amount`, status: 404, message: null };

		// create a transaction for the user being transfered to
		const receiverTransaction = await transactionHistory.create({
			amountInAppWallet: amountToTransfer,
			toWho: userBeingTransferedTo._id,
			fromWho: userData._id,
			status: 1,
			alert: "Credit",
			methodOfPayment
		});
		if (!receiverTransaction) return { err: `Could not create a transaction for the receiver`, status: 404, message: null };

		// updating the user with the transaction from above
		const updatedReceiver = await user.update({
			itemToupdateId: { _id: userBeingTransferedTo._id },
			propertyToUpdate: "transactionHistory",
			optionsToUse: "$push",
			updateValue: receiverTransaction._id
		});
		if (!updatedReceiver) return { err: `Could not update the receiver with the new transaction`, status: 404, message: null };

	if (updatedAppWallet && updatedUser && updatedReceiversWallet && receiverTransaction && updatedReceiversWallet && senderTransaction) return { err: null , status: 200, message: "Transfer Successful" };
	else return { status: 500, err: "Problem: Something went wrong while making transfer", message: null };

	} catch (error) {
		return { err: error.message, status: 500, message: "Caught this error during transfer" };
	}

}