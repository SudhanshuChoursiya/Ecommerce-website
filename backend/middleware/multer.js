const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = function (req, file, cb) {
  if (file.fieldname === "profile_img") {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      req.fileValidationError = "file type is invalid";
      cb(null, false);
    }
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
