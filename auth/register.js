// controlls all the authentication for the users
const bird = require("../utils/messageBird");
const Users = require("../schema/Users");
const passport = require("passport");
const AppWallet = require("../models/appWallet");
const users = require("../models/user");
const error500 = require("../controller/errors/error500");

module.exports = (req, res) => {
	
	const { password, ...body } = req.body;
	
	// console.log("body", password, body);
	// Here the user is being created and the authLevel is set to 1 to give user auth to admin pages
	Users.register(body, password, (register_err, user) => {
		if (register_err) {
			console.log(":::register_err", register_err);
			bird.message("danger", register_err._message);
			// NOTE: change this to res.redirect("back");
			// TODO: Add a woy for user to know that that email has already been in use
			res.redirect("back");
		} else {
			passport.authenticate("local")(req, res, () => {
				bird.message("success", "Successful Registered");

				// After user is created we assign them a wallet and vis the wallet the user
				AppWallet.create({ owner: user._id }, async (createWallet_err, newWallet) => {
					if (createWallet_err) {
						// res.status(500).json({message: "Opps error you don't have a wallet"});
						bird.message("danger", "Could not gentrate a Wallet for you");
						return error500(req, res);
					} else if (newWallet) {
						try {
							const updatedUser = await users.update({
								itemToupdateId: { _id: user._id },
								optionsToUse: "$set",
								propertyToUpdate: "appWallet",
								updateValue: newWallet._id
							});
							// TODO: Make an error page where errors would go to 
							// TODO: Add message bird
							// if(!updatedUser) return res.status(500).json({message: null, err: "Could not update this user with the appWallet Id"});
							if (!updatedUser) {
								bird.message("danger", "Could not setup wallet");
								return error500(req, res);
							}
							else {
								if (user.authLevel) bird.message("success", "Welcome Admin " + req.user.firstname);
								else bird.message("success", "Welcome " + req.user.firstname);
								return res.status(200).redirect("/dashboard");
							}
						} catch (error) {
							// return res.status(500).json({message: "Failed to update, An Error Occured", err: error});
							bird.message("danger", "Could not setup wallet");
							return error500(req, res);
						}
					} else {
						// res.status(500).json({message: "Opps don't know whats wrong you don't have a wallet"});
						bird.message("danger", "Could not setup wallet");
						return error500(req, res);
					}
				});
				// NOTE: change this to res.redirect("back");
				// res.json({message: "OK"});
			});
		}
	});
}