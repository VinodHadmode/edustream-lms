const multer = require("multer");

//stores file in memory as a buffer(strea, it to clodinary directly)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG,PNG, and WEBP images are allowed"));
    }
  },
});

module.exports = {
  upload,
};
