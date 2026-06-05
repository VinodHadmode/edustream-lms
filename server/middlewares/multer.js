const multer = require("multer");

//stores file in memory as a buffer(strea, it to clodinary directly)
const storage = multer.memoryStorage();

// For images — 5MB max
const uploadImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, and WEBP images are allowed"));
    }
  },
});

// For videos - 20MB
const uploadVideo = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["video/mp4", "video/webm", "video/mkv"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only MP4, WEBM, and MKV videos are allowed"));
    }
  },
});

module.exports = {
  uploadImage,
  uploadVideo,
};
