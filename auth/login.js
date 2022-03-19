// controlls all the authentication for the users
const bird = require("../utils/messageBird");
const passport = require("passport");
const error500 = require("../controller/errors/error500");

module.exports = (req, res, next) => {
	// LogIn a user
	// I am using the passport custom callback to authenticate the user
	passport.authenticate("local", function (logIn_err, user, info) {
		// if any exceptions happen, come here
		// TODO: Add means to tell the user that the process failed
		if (logIn_err) {
			bird.message("danger", logIn_err + "\n\n" + info.message);
			console.log("::logIn_err:", logIn_err, info.message);
			return next(logIn_err);
		}
		// if user is not found, come here
		if (!user) {
			bird.message("danger", info.message);
			console.log("NO USER FOUND!", info.message);
			return res.redirect("back");
		}
		// if everything goes well, come here
		req.logIn(user, function (reqLogIn_err) {
			if (reqLogIn_err) {
				bird.message("danger", reqLogIn_err);
				console.log("::reqLogIn_err:", reqLogIn_err);
				return next(reqLogIn_err);
			}

			// checking where the auth is coming from
			if (user.authLevel) bird.message("success", "Welcome Admin " + req.user.firstname);
			else bird.message("success", "Welcome " + req.user.firstname);
			return res.status(200).redirect("/dashboard");
		});
	})(req, res, next);
}