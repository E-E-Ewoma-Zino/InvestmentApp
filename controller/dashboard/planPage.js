// Plan page controller
const bird = require("../../utils/messageBird");
const plans = require("../../models/plans");
const user = require("../../models/user");

module.exports = async (req, res) => {
	const pageData = await user.schema.findById({ _id: req.user._id }).populate({
		path: "appWallet",
		select: "amount"
	});
	if (!pageData) bird.message("danger", "Page did not loadup correctly");

	const planData = await plans.findAndPopulate({
		path: "activeAdmins",
		select: "firstname profilePic"
	});
	if (!planData) bird.message("danger", "Could not loadup plans");

	res.render("dashboard/planPage", {
		title: "Plans",
		bird: bird.fly,
		user: req.user,
		data: pageData,
		plans: planData
	});

}