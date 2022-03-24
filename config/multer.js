const bird = require("../utils/messageBird");
const multer = require("multer");
const path = require("path");

// @desc	configure multer
const storage = multer.diskStorage({
	destination: "uploads",
	filename: (req, file, callback) => {
		callback(null, file.fieldname + "-" + file.originalname.substring(0, file.originalname.length - 4) + "-" + "Zino" + Date.now() + path.extname(file.originalname));
	}
});

module.exports = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if(file.fieldname === "image"){
			if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
				cb(null, true);
			} else {
				bird.message("danger", "You can only upload .png, .jpg, .gif and .jpeg files!");
				bird.message("danger", "Please re-upload a file");
				cb(null, false);
			}
		}else{
			console.log("Help multa");
			bird.message("warning", "Invalid input field");
			cb(null, false);
		}
	}
});