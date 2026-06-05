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
} = require("../controllers/course.controller");


const courseRouter = express.Router();

//Student routes - need authMW
courseRouter.get("/published", isAuthenticated, getPublishedCourses);
courseRouter.get("/:courseId", isAuthenticated, getCourseById);

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
