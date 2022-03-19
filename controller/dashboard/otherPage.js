// Other pages page controller

module.exports = (req, res) => {

	res.render(`dashboard/${req.params.page}`);
}