const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 1000 * 1000,
  },
  fileFilter(req, { originalname }, cb) {
    console.log("originalname", originalname);
    if (!originalname.match(/\.(jpeg|jpg|png)$/))
      return cb(new Error("Image type is not valid"));
    cb(undefined, true);
  },
});

module.exports = upload;
