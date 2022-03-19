// View page controller
const bird = require("../../utils/messageBird");
const user = require("../../models/user");
const plans = require("../../models/plans");


module.exports = async (req, res) => {
	const userInfo = await user.findById(req.query.id);
	if(!userInfo) bird.message("danger", "Could not load this user");

	res.render("dashboard/view", {
		title: userInfo.firstname,
		bird: bird.fly,
		user: req.user,
		userInfo: userInfo
	});
}