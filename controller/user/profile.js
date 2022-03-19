// Profile page controller
const bird = require("../../utils/messageBird");

module.exports = (req, res)=>{
	res.render("user/profile",{
		title: "Dashboard",
bird: bird.fly,
		user: req.user
	});
}