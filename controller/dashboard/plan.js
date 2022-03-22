// plan page page controller

const bird = require("../../utils/messageBird");
const plans = require("../../models/plans");
const user = require("../../models/user");
const error500 = require("../errors/error500");

module.exports = async (req, res) => {
	try {
		const data = new Object();

		try {
			data.planData = await plans.findByIdAndPopulate(req.query.id, {
				path: "activeAdmins"
			});
			if (!data.planData) bird.message("danger", "Could not load up plans");
		} catch (err) {
			bird.message("danger", "Invalid request!");
			res.redirect("back");
		}

		if (req.user.authLevel) {
			data.userData = await user.findByIdAndPopulate(req.user._id, [{
				path: "adminActivePlan",
				populate: {
					path: "user",
					populate: {
						path: "id",
						select: "firstname username"
					}
				}
			},
			{
				path: "adminActivePlan",
				populate: {
					path: "plan",
					select: "name"
				}
			}]);
			if (!data.userData) bird.message("danger", "Could not load up user");
			
			// return res.send(data.userData);
			return res.render("dashboard/adminPlanPage", {
				title: "Dashboard",
				bird: bird.fly,
				user: req.user,
				plan: data.planData,
				activeUsers: data.userData.adminActivePlan.filter( activePlan => activePlan.plan._id.toString() == data.planData._id.toString() )
			});
		}
		else return res.render("dashboard/userPlanPage", {
			title: "Dashboard",
			bird: bird.fly,
			user: req.user,
			plan: data.planData
		});
	} catch (error) {
		bird.message("danger", "An error occured in our server. Contact customer care for more info!");
		console.error("Error in server:", error);
		return error500(req, res);
	}
}