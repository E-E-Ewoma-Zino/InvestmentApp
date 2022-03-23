// update a users profile
const user = require("../models/user");

module.exports = async ({userData, data}) => {
	// update the data the user wants to update
	console.log("updating", data);
	let userUpdatedProfile;
	for (d in data){
		console.log("d", d);
		userUpdatedProfile = await user.update({
			itemToupdateId: { _id: userData._id },
			optionsToUse: "$set",
			propertyToUpdate: d,
			updateValue: data[d]
		});
		if(!userUpdatedProfile) return { message: "Could not update " + data[d], err: "Failed to finish update!", status: 505, alert: "danger" };
	}
	if(data.newPassword){
		// using the passport-local-mongoose module, you can use the changePassword function to change the password
		try{
			const changePassword = await userData.changePassword(data.previousPassword, data.newPassword);
			if(!changePassword) return { message: "Could not update " + changePassword_err.message, err: "Failed to finish update!", status: 505, alert: "danger" };
		}catch(error){
			if(error.message == "Password or username is incorrect") return { message: "Could not update, password mismatch", err: "Failed to finish update!", status: 401, alert: "warning" };
			return { message: "Could not update " + error.message, err: "Failed to finish update!", status: 400, alert: "danger" };
		}
	}

	if(userUpdatedProfile) return { message: "Updated Profile", err: null, status: 200, alert: "success" };
	else return { message: "Could not update", err: "Failed to finish update!", status: 505, alert: "danger" };
}