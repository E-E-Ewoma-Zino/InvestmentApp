// Profile page controller
const bird = require("../../utils/messageBird");
const user = require("../../models/user");
const plans = require("../../models/plans");


module.exports = async (req, res) => {
	const pageData = await user.schema.findById({ _id: req.user._id })
		.populate({
			path: "appWallet",
			select: "amount"
		})
		.populate({
			path: "userActivePlan.plan",
			select: "name"
		})
		.populate({
			path: "transactionHistory",
			populate: {
				path: "fromWho toWho",
				select: ["firstname", "username", "profilePic"],
			}
		});
	if (!pageData) bird.message("danger", "Page did not loadup correctly");

	const planData = await plans.findAndPopulate({
		path: "activeAdmins",
		select: "firstname profilePic"
	});
	if (!planData) bird.message("danger", "Could not loadup plans");

	res.render("dashboard/profile", {
		title: "Profile",
		bird: bird.fly,
		user: req.user,
		plans: planData,
		data: pageData
	});

}