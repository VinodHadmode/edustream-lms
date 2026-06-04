const express = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const {
  getPublishedCourses,
  getCourseById,
  createCourse,
  getInstructorCourses,
  updateCourse,
  deleteCourse,
  togglePublish,
} = require("../controllers/course.controller");
const { isInstructor } = require("../middlewares/isInstructor");
const { upload } = require("../middlewares/multer");

const courseRouter = express.Router();


//Student routes - need authMW
courseRouter.get("/published", isAuthenticated, getPublishedCourses);
courseRouter.get("/:courseId", isAuthenticated, getCourseById);




//Instructor routes - need auth + isInstructor MW
courseRouter.post(
  "/",
  isAuthenticated,
  isInstructor,
  upload.single("thumbnail"),
  createCourse,
);

courseRouter.get("/", isAuthenticated, isInstructor, getInstructorCourses);

courseRouter.put("/:courseId", isAuthenticated, isInstructor, updateCourse);

courseRouter.delete("/:courseId", isAuthenticated, isInstructor, deleteCourse);

courseRouter.patch(
  "/:courseId/toggle-publish",
  isAuthenticated,
  isInstructor,
  togglePublish,
);

module.exports = {
  courseRouter,
};
