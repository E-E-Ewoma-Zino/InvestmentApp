const createPlan = require("../modules/createPlan");

module.exports = async (req, res) => {
	const { name, min, max, key, description } = req.body;

	try {
		const { message, alert, err, status } = await createPlan({
			name: name,
			minBudget: min,
			maxBudget: max,
			planKey: key,
			description
		});
	
		return res.status(status).json({ alert, message, err });
	} catch (error) {
		console.error("An error in your code:", error);
		return res.status(500).json({ message: "An error occured in our server", err: error.message });
	}
}