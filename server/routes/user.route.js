const express = require("express");
const {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
} = require("../controllers/user.controller");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { upload } = require("../middlewares/multer");

const userRouter = express.Router();

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.get("/logout", logout);

userRouter.get("/profile", isAuthenticated, getProfile);

userRouter.patch(
  "/profile/update",
  isAuthenticated,
  upload.single("photo"),
  updateProfile,
);

module.exports = {
  userRouter,
};
