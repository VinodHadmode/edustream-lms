const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    videoUrl: { type: String },
    publicId: { type: String },
    isPreview: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    description: { type: String },

    category: { type: String, required: true },

    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    price: { type: Number, required: true, default: 0 },

    thumbnail: { type: String, default: "" },

    publicId: { type: String, default: '' },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    lectures: [lectureSchema],

    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    
    isPublished: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const CourseModel = mongoose.model("Course", courseSchema);

module.exports = {
  CourseModel
};
