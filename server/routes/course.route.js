const express = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { isInstructor } = require("../middlewares/isInstructor");
const { uploadImage, uploadVideo } = require("../middlewares/multer");
const {
  getPublishedCourses,
  getCourseById,
  createCourse,
  getInstructorCourses,
  updateCourse,
  deleteCourse,
  togglePublish,
  addLecture,
  deleteLecture,
  getInstructorDashboard,
} = require("../controllers/course.controller");

const courseRouter = express.Router();

//Instructor routes - need auth + isInstructor MW
courseRouter.post(
  "/",
  isAuthenticated,
  isInstructor,
  uploadImage.single("thumbnail"),
  createCourse,
);

courseRouter.get("/", isAuthenticated, isInstructor, getInstructorCourses);

courseRouter.put(
  "/:courseId",
  isAuthenticated,
  isInstructor,
  uploadImage.single("thumbnail"),
  updateCourse,
);

courseRouter.delete("/:courseId", isAuthenticated, isInstructor, deleteCourse);

courseRouter.patch(
  "/:courseId/toggle-publish",
  isAuthenticated,
  isInstructor,
  togglePublish,
);

courseRouter.get(
  "/instructor/dashboard",
  isAuthenticated,
  isInstructor,
  getInstructorDashboard,
);

//Public route
courseRouter.get("/published", getPublishedCourses);
courseRouter.get("/:courseId", getCourseById);

//lecture routes
courseRouter.post(
  "/:courseId/lectures",
  isAuthenticated,
  isInstructor,
  uploadVideo.single("video"),
  addLecture,
);

courseRouter.delete(
  "/:courseId/lectures/:lectureId",
  isAuthenticated,
  isInstructor,
  deleteLecture,
);

module.exports = {
  courseRouter,
};
