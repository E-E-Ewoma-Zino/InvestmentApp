// handel 500 errors

module.exports = (req, res)=>{
	res.status(500).render("dashboard/500");
}