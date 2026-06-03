const CourseModel =require('../models/course.model')
//Create course
const createCourse = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: "Title and Category required.",
      });
    }

    const course = await CourseModel.create({
      title,
      category,
      instructor: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Course created",
      course,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to create course" });
  }
};

//Get all course by instructor
const getInstructorCourses = async (req, res) => {
  try {
    const courses = await CourseModel.find({ instructor: req.user._id });
    return res.status(200).json({ success: true, courses });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch course" });
  }
};

// Get single course by id
const getCourseById = async (req, res) => {
  try {
    const course = await CourseModel.findById(req.params.courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found." });
    }

    return res.status(200).json({ success: true, course });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch course" });
  }
};

//Update course
const updateCourse = async (req, res) => {};

//Delete course
const deleteCourse = async (req, res) => {};

//Toggle publish status
const togglePublish = async (req, res) => {};

//Get all published courses (for students)
const getPublishedCourses = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  createCourse,
  getInstructorCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  togglePublish,
  getPublishedCourses
};
