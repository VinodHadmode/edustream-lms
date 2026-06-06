const { cloudinary } = require("../config/cloudinary");
const { CourseModel } = require("../models/course.model");
const { uploadToCloudinary } = require("../utils/uploadToCloudinary");

//Create course
const createCourse = async (req, res) => {
  try {
    const { title, category, description, level, price } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: "Title and Category required.",
      });
    }

    let thumbnail = "";
    let publicId = "";

    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer,
        "lms/thumbnails",
      );

      thumbnail = result.secure_url;
      publicId = result.public_id;
    }

    const course = await CourseModel.create({
      title,
      category,
      description,
      level: level || "beginner",
      price: Number(price) || 0,
      thumbnail,
      publicId,
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
const updateCourse = async (req, res) => {
  try {
    const { title, description, category, level, price } = req.body;
    const { courseId } = req.params;

    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found." });
    }

    let thumbnail = course.thumbnail;
    let publicId = course.publicId;

    if (req.file) {
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
      const result = await uploadToCloudinary(
        req.file.buffer,
        "lms/thumbnails",
      );

      thumbnail = result.secure_url;
      publicId = result.public_id;
    }

    const updatedCourse = await CourseModel.findByIdAndUpdate(
      courseId,
      {
        title,
        description,
        category,
        level,
        price: Number(price),
        thumbnail,
        publicId,
      },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Course Updated",
      course: updatedCourse,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update course" });
  }
};

//Delete course
const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not Authorized" });
    }

    //Delete course thumbnail from cloudinary
    if (course.publicId) {
      await cloudinary.uploader.destroy(course.publicId);
    }

    //Delete course lectures from cloudinary
    for (const lecture of course.lectures) {
      if (lecture.publicId) {
        await cloudinary.uploader.destroy(lecture.publicId, {
          resource_type: "video",
        });
      }
    }

    await CourseModel.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete course" });
  }
};

//Toggle publish status
const togglePublish = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not Authorized" });
    }

    //Prevent publishing if no course added
    if (!course.isPublished && course.lectures.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Add atleast one lecture before publishing",
      });
    }

    course.isPublished = !course.isPublished;
    await course.save();

    return res.status(200).json({
      success: true,
      message: course.isPublished ? "Course published" : "Course unpublished",
      course,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to toggle publish status" });
  }
};

//Get all published courses (for students)
const getPublishedCourses = async (req, res) => {
  try {
    const courses = await CourseModel.find({ isPublished: true })
      .populate("instructor", "name photoUrl")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
};

//lecture controllers
//add lecture to course
const addLecture = async (req, res) => {
  try {
    const { title, isPreview } = req.body;
    const { courseId } = req.params;

    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not Authorized" });
    }

    let videoUrl = "";
    let publicId = "";

    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer,
        "lms/lectures",
        "video",
      );
      videoUrl = result.secure_url;
      publicId = result.public_id;
    }

    course.lectures.push({
      title,
      videoUrl,
      publicId,
      isPreview: isPreview === "true",
    });

    await course.save();
    return res
      .status(201)
      .json({ success: true, message: "Lecture added", course });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to add lecture",
    });
  }
};

//delete lecture
const deleteLecture = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;

    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not Authorized" });
    }

    //deleting lecture from cloudinary
    const lecture = course.lectures.find((l) => l._id.toString() === lectureId);

    // const lecture = course.lectures.id(lectureId);
    // imp concepts of mongoose subdocument lookup

    if (lecture?.publicId) {
      await cloudinary.uploader.destroy(lecture.publicId, {
        resource_type: "video",
      });
    }

    course.lectures = course.lectures.filter(
      (l) => l._id.toString() !== lectureId,
    );

    await course.save();
    return res
      .status(200)
      .json({ success: true, message: "Lecture deleted", course });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ success: false, message: "Failed to delete lecture" });
  }
};

module.exports = {
  createCourse,
  getInstructorCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  togglePublish,
  getPublishedCourses,
  addLecture,
  deleteLecture,
};
