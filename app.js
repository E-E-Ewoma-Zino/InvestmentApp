require("dotenv").config();
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const express = require("express");
const path = require("path");

// create app
const app = express();

// @desc	app configs
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));

// session setup
// tell app to use express session
app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false
}));

// passport config
app.use(passport.initialize());
app.use(passport.session());

// set up db
require(__dirname + "/config/db")(mongoose);

// configure passport
require(__dirname + "/config/passport")(passport);

// @desc	for all home route "/"
// @route	home
app.use("/", require(__dirname + "/router/index"));
// @desc	for all dashboard route "/dashboard"
// @route	/dashboard
app.use("/dashboard", require(__dirname + "/router/dashboard"));
// @desc	for all api route "/api"
// @route	/api
app.use("/api", require(__dirname + "/router/api"));
// @desc	404 Page
app.use(require(__dirname + "/controller/errors/error404"));

const port = process.env.PORT || 5003;
app.listen(port, ()=> console.log("started app at port" + port));