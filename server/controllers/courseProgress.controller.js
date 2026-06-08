const { CourseModel } = require("../models/course.model");
const { CourseProgressModel } = require("../models/courseProgress.model");

const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

    //Get course with lectures
    const course = await CourseModel.findById(courseId).populate(
      "instructor",
      "name photoUrl",
    );
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found." });
    }

    // Get or Create course progress record
    let progress = await CourseProgressModel.findOne({
      user: userId,
      course: courseId,
    });
    if (!progress) {
      progress = await CourseProgressModel.create({
        user: userId,
        course: courseId,
        completedLectures: [],
      });
    }

    return res.status(200).json({
      success: true,
      course,
      progress,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch course progress" });
  }
};

//Mark lecture as complete or incomplete
const updateLectureProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.user._id;

    let progress = await CourseProgressModel.findOne({
      user: userId,
      course: courseId,
    });
    if (!progress) {
      progress = await CourseProgressModel.create({
        user: userId,
        course: courseId,
        completedLectures: [],
      });
    }

    const isCompleted = progress.completedLectures?.some(
      (id) => id.toString() === lectureId,
    );

    if (isCompleted) {
      //unmark as complete
      progress.completedLectures = progress.completedLectures.filter(
        (id) => id.toString() !== lectureId,
      );
    } else {
      //Mark as complete
      progress.completedLectures.push(lectureId);
    }

    //Check if all lectures completed
    const course = await CourseModel.findById(courseId);
    progress.completed =
      progress.completedLectures.length == course.lectures.length;

    await progress.save();

    return res.status(200).json({
      success: true,
      message: isCompleted ? "Marked as incomplete" : "Marked as complete",
      progress,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update progress" });
  }
};

module.exports = {
  getCourseProgress,
  updateLectureProgress,
};
