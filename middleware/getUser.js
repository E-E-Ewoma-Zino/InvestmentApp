// This script helps get the user details

module.exports = (req, res, next)=>{
	req.userDetails = req.isAuthenticated() && {login: req.isAuthenticated(),name: req.user.username}

	if(req.userDetails) next();
	else {
		req.userDetails = false;
		next();
	}
}