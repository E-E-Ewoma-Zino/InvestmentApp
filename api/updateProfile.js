// This script updates the users profile
const updateProfile = require("../modules/updateProfile")
module.exports = async (req, res) => {
	const data = req.body;
	console.log("body", data);

	try{
		const { status, message, alert, err } = await updateProfile({
			data,
			userData: req.user
		});
	
		return res.status(status).json({ alert, message, err });
	}catch(error){
		console.error("An error in your code:", error);
		return res.status(500).json({ message: "An error occured in our server", err: error.message });
	}
}