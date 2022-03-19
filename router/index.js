const express = require("express");
const register = require("../auth/register");
const login = require("../auth/login");
const logout = require("../auth/logout");
const userAndAdmin = require("../middleware/usersAuth");
const home = require("../controller/home/index");

const router = express.Router();

// @desc	Home Page
// @route	/
router.get("/", (req, res) => res.redirect("/home"));

// @desc	Home Page
// @route	/home
router.get("/home", (req, res) => home(req, res));

// @desc	Register in User
// @route	/register
router.post("/register", (req, res) => register(req, res));

// @desc	Login User
// @route	/login
router.post("/login", (req, res, next) => login(req, res, next));

// @desc	LogOut User
// @route	logout
router.post("/logout", (req, res) => logout(req, res));

module.exports = router;