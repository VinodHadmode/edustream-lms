const express = require("express");
const {
  getCourseProgress,
  updateLectureProgress,
} = require("../controllers/courseProgress.controller");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const courseProgressRouter = express.Router();

courseProgressRouter.get("/:courseId", isAuthenticated, getCourseProgress);

courseProgressRouter.post(
  "/:courseId/lectures/:lectureId",
  isAuthenticated,
  updateLectureProgress,
);

module.exports={
    courseProgressRouter
}