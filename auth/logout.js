// controlls all the authentication for the users
const bird = require("../utils/messageBird");

module.exports = (req, res) => {
	bird.message("info", "Bye " + req.user.firstname);
	req.logOut();
	res.redirect("/");
}