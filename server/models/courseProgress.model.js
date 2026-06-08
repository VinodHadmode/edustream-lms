const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    completedLectures: [{ type: mongoose.Schema.Types.ObjectId }],
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const CourseProgressModel = mongoose.model(
  "CourseProgress",
  courseProgressSchema,
);

module.exports = {
  CourseProgressModel,
};
