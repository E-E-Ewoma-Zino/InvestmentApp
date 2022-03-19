const express = require("express");
const userAndAdmin = require("../middleware/usersAuth");
const adminOnly = require("../middleware/adminOnly");
const creditWallet = require("../api/credit");
const createPlan = require("../api/createplan");
const addPlanPermission = require("../api/addPlanPermission");
const addAdminToPlan = require("../api/addAdminToPlan");
const addUserToPlan = require("../api/addUserToPlan");
const resolvePlan = require("../api/resolveUser");
const getRetuest = require("../api/getRequest");

const router = express.Router();
// ====== GET ======
// @desc	Get all users
// @route	/api/get/all/users
router.get("/get/all/users", (req, res)=> getRetuest.allUsers(req, res));

// @desc	Get user by id
// @route	/api/get/byid/user
router.get("/get/byid/user", (req, res)=> getRetuest.userById(req, res));

// @desc	Get all plans
// @route	/api/get/all/plans
router.get("/get/all/plans", (req, res)=> getRetuest.allPlans(req, res));

// @desc	Get plan by id
// @route	/api/get/byid/plan
router.get("/get/byid/plan", (req, res)=> getRetuest.planById(req, res));

// -===== POST =====
// @desc	Create a plan
// @route	api/createplan
router.post("/createPlan", (req, res) => createPlan(req, res));

// ==== PATCH ======
// @desc	Credit wallet
// @route	api/credit
router.patch("/credit", userAndAdmin, (req, res) => creditWallet(req, res));
// @desc	Give a user a plans permission
// @route	api/addPlanPermission
router.patch("/addPlanPermission", adminOnly, (req, res) => addPlanPermission(req, res));
// @desc	Add an admin to a plan
// @route	api/addAdminToPlan
router.patch("/addAdminToPlan", adminOnly, (req, res) => addAdminToPlan(req, res));
// @desc	Add a user to a plan
// @route	api/addUserToPlan
router.patch("/addUserToPlan", userAndAdmin, (req, res) => addUserToPlan(req, res));
// @desc	Resolve a user
// @route	api/resolveuser
router.patch("/resolveuser", userAndAdmin, (req, res) => resolvePlan(req, res));


module.exports = router;