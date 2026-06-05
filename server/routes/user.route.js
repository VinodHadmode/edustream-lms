const express = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { uploadImage } = require("../middlewares/multer");
const { getProfile, updateProfile } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/profile", isAuthenticated, getProfile);

userRouter.patch(
  "/profile-update",
  isAuthenticated,
  uploadImage.single("photo"),
  updateProfile,
);

module.exports = {
  userRouter,
};
