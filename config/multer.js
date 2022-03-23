const _bird = require("../middleware/messageBird");
const multer = require("multer");
const path = require("path");

// @desc	configure multer
const storage = multer.diskStorage({
	destination: "uploads",
	filename: (req, file, callback) => {
		callback(null, file.fieldname + "-" + file.originalname + "-" + Date.now() + path.extname(file.originalname));
	}
});

module.exports = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if(file.fieldname === "image"){
			if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
				cb(null, true);
			} else {
				cb(null, false);
				_bird.message("danger", "You can only upload .png, .jpg, .gif and .jpeg files!");
				_bird.message("danger", "Please re-upload the file");
			}
		}
		if(file.fieldname === "book"){
			if (file.mimetype == "application/pdf" || file.mimetype == "application/msword" || file.mimetype == "application/vnd.ms-excel" || file.mimetype == "application/vnd.ms-powerpoint" || file.mimetype == "text/plain") {
				cb(null, true);
			} else {
				cb(null, false);
				_bird.message("danger", "You can only upload .pdf, text/plain, .msword, .vnd.ms-excel and .vnd.ms-powerpoint files!");
				_bird.message("danger", "Please re-upload the file");
			}
		}
	}
});