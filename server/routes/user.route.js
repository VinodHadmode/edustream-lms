const express = require("express");
const {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
} = require("../controllers/user.controller");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const userRouter = express.Router();

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.get("/logout", logout);

userRouter.get("/profile", isAuthenticated, getProfile);

userRouter.patch('/profile/update', isAuthenticated,updateProfile)

module.exports = {
  userRouter,
};
