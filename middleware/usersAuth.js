// 

// Check the auth level for the user and the authlevel from the form used to send the req then send to the user pages if 0 or the admin page if 1
module.exports = (req, res, next) => {
	// Checks if user is authenticated and then redirect to the destination
	// IF user does not have auth validation then send back
	if (req.isAuthenticated()) {
		console.log("Access Granted!");
		return next();
	}
	else {
		// _bird.message("warning", "You are not logIn yet.");
		console.log("Access Denied!");
		return res.redirect("/dashboard/login");
	}
}