// Withdrawal page controller
const bird = require("../../utils/messageBird");
const user = require("../../models/user");  

module.exports = async (req, res) => {
	const pageData = await user.schema.findById({ _id: req.user._id })
		.populate({
			path: "appWallet",
			select: "amount"
		})
		.populate({
			path: "userActivePlan.plan adminActivePlan.plan",
			select: "name"
		})
		.populate({
			path: "planDescriptions.plan",
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

	res.render("dashboard/withdrawal", {
		title: "Withdrawal",
		bird: bird.fly,
		user: req.user,
		data: pageData
	});
}