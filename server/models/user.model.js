const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    description: { type: String },
    photoUrl: { type: String, default: "" },
    role: { type: String, enum: ["instructor", "student"], default: "student" },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    publicId: { type: String, default: "" },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("User", userSchema);

module.exports = {
  UserModel,
};
