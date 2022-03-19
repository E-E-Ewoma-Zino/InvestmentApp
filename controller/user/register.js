// register page controller
const bird = require("../../utils/messageBird");

module.exports = (req, res) => {
	res.render("user/sign-up",{
		title: "Dashboard",
bird: bird.fly,
		user: req.user
	});
}