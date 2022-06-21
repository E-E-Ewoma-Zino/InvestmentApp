const express = require("express");
// const colors = require("colors");
const login = require("../auth/login");
const logout = require("../auth/logout");
const register = require("../auth/register");
const plan = require("../controller/dashboard/plan");
const adminOnly = require("../middleware/adminOnly");
const view = require("../controller/dashboard/view");
const userAndAdmin = require("../middleware/usersAuth");
const profile = require("../controller/dashboard/profile");
const loginPage = require("../controller/dashboard/login");
const planPage = require("../controller/dashboard/planPage");
const dashboard = require("../controller/dashboard/dashboard");
const otherPage = require("../controller/dashboard/otherPage");
const withdrawal = require("../controller/dashboard/withdrawal");
const registerPage = require("../controller/dashboard/register");
const transactions = require("../controller/dashboard/transactions");

const router = express.Router();

// ===== GET ======
// @desc	dashboard Page
// @route	/dashboard
router.get("/", userAndAdmin, (req, res) => dashboard(req, res));

// @desc	Profile
// @route	/dashboard/profile
router.get("/profile", userAndAdmin, (req, res) => profile(req, res));

// @desc	plan
// @route	/dashboard/plans
router.get("/plans", userAndAdmin, (req, res) => planPage(req, res));

// @desc	plan
// @route	/dashboard/plan
router.get("/plans/:planName", userAndAdmin, (req, res) => plan(req, res));

// @desc	plan
// @route	/dashboard/transactions
router.get("/transactions", userAndAdmin, (req, res) => transactions(req, res));

// @desc	plan
// @route	/dashboard/withdrawal
router.get("/withdrawal", userAndAdmin, (req, res) => withdrawal(req, res));

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