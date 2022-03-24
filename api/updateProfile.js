// This script updates the users profile
const updateProfile = require("../modules/updateProfile");
const bird = require("../utils/messageBird");

module.exports = async (req, res) => {
	const data = req.body;
	data.profilePic = req.file;
	console.log("data", data);
	
	// return res.json({ body: data, files: req.file, bird: bird.fly });
	try {
		const { status, message, alert, err } = await updateProfile({
			data,
			userData: req.user
		});

		return res.status(status).json({ alert, message, err, bird: bird.fly });
	} catch (error) {
		console.error("An error in your code:", error);
		return res.status(500).json({ message: "An error occured in our server", err: error.message, bird: bird.fly });
	}
}