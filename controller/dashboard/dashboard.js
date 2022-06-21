// dashboard page controller
const bird = require("../../utils/messageBird");
const user = require("../../models/user");
const plans = require("../../models/plans");


module.exports = async (req, res) => {
	if (req.user.authLevel > 1) res.render("dashboard/adminDashboard", {
		title: "Dashboard",
		bird: bird.fly,
		user: req.user
	});
	else res.redirect("/dashboard/profile");
}