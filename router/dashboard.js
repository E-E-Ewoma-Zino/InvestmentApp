const express = require("express");
const register = require("../auth/register");
const login = require("../auth/login");
const logout = require("../auth/logout");
const userAndAdmin = require("../middleware/usersAuth");
const adminOnly = require("../middleware/adminOnly");
const loginPage = require("../controller/dashboard/login");
const registerPage = require("../controller/dashboard/register");
const colors = require("colors");
const dashboard = require("../controller/dashboard/dashboard");
const profile = require("../controller/dashboard/profile");
const view = require("../controller/dashboard/view");
const plan = require("../controller/dashboard/plan");
const otherPage = require("../controller/dashboard/otherPage");

const router = express.Router();

// ===== GET ======
// @desc	dashboard Page
// @route	/dashboard
router.get("/", userAndAdmin, (req, res) => dashboard(req, res));

// @desc	Profile
// @route	/dashboard/profile
router.get("/profile", userAndAdmin, (req, res) => profile(req, res));

// @desc	plan
// @route	/dashboard/plan
router.get("/plan/:planName", userAndAdmin, (req, res) => plan(req, res));

// @desc	view
// @route	/dashboard/view
router.get("/view/:name", userAndAdmin, (req, res) => view(req, res));

// @desc	Other Page
// @route	/dashboard/:page
router.get("/other/:page", (req, res) => otherPage(req, res));


// @desc	LogIn Page
// @route	/dashboard/login
router.get("/login", (req, res)=> loginPage(req, res));

// @desc	Register Page
// @route	/dashboard/register
router.get("/register", (req, res)=> registerPage(req, res));

// ===== POST ======
// @desc	Register in User
// @route	dashboard/register
router.post("/register", (req, res) => register(req, res));

// @desc	Login User
// @route	dashboard/login
router.post("/login", (req, res, next) => login(req, res, next));

// @desc	LogOut User
// @route	dashboard/logout
router.post("/logout", (req, res) => logout(req, res));

module.exports = router;