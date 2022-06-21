// update a users profile
const user = require("../models/user");
const fs = require("fs");

module.exports = async ({ userData, data }) => {
	// update the data the user wants to update
	console.log("updating", data);
	let userUpdatedProfile;
	for (d in data) {
		if(d == "plan" || d == "image" || d == "newPassword" || d == "previousPassword") continue;
		console.log("d", d);
		userUpdatedProfile = await user.update({
			itemToupdateId: { _id: userData._id},
			optionsToUse: "$set",
			propertyToUpdate: d == "firstname" || d == "lastname" || d == "phoneNo" || d == "profilePic"? d: `planDescriptions.${data.plan}.${d}`,
			updateValue: data[d]
		});
		if (!userUpdatedProfile) return { message: "Could not update " + data[d], err: "Failed to finish update!", status: 505, alert: "danger" };
	}
	if (data.newPassword) {
		// using the passport-local-mongoose module, you can use the changePassword function to change the password
		try {
			const changePassword = await userData.changePassword(data.previousPassword, data.newPassword);
			if (!changePassword) return { message: "Could not update " + changePassword_err.message, err: "Failed to finish update!", status: 505, alert: "danger" };
		} catch (error) {
			if (error.message == "Password or username is incorrect") return { message: "Could not update, password mismatch", err: "Failed to finish update!", status: 401, alert: "warning" };
			return { message: "Could not update " + error.message, err: "Failed to finish update!", status: 400, alert: "danger" };
		}
	}
	if (data.profilePic) {
		console.log("new ProfilePic");
		// Using fs.stat to check if the file exist before deleting
		if(userData.profilePic) fs.stat(userData.profilePic.path, (stat_err, stats) => {
			if (stat_err) {
				console.error("stat_err:", stat_err);
				return { message: "Searching for Profile", err: "Did not find profile pic", status: 300, alert: "secondary" };
			}
			// console.log("Stats", stats);
			// Using fs.unlink to also delete the book file
			fs.unlink(userData.profilePic.path, (unlink_err) => {
				if (unlink_err) {
					console.error("unlink_err:", unlink_err);
					return callback(unlink_err, null);
				}
				console.log("file deleted successfully");
				return { message: "Updated Profile", err: null, status: 200, alert: "success" };
			});
		});
	}

	if (userUpdatedProfile) return { message: "Updated Profile", err: null, status: 200, alert: "success" };
	else return { message: "Could not update", err: "Failed to finish update!", status: 505, alert: "danger" };
}