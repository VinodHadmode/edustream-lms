const express = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { upload } = require("../middlewares/multer");
const { getProfile, updateProfile } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/profile", isAuthenticated, getProfile);

userRouter.patch(
  "/profile-update",
  isAuthenticated,
  upload.single("photo"),
  updateProfile,
);

module.exports = {
  userRouter,
};
