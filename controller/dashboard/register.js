// register page controller

const bird = require("../../utils/messageBird");

module.exports = (req, res)=>{
	res.render("dashboard/sign-up", {
		title: "Dashboard",
bird: bird.fly,
		user: req.user
	});
}