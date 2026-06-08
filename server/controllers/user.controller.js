const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { cloudinary } = require("../config/cloudinary");
const { uploadToCloudinary } = require("../utils/uploadToCloudinary");

const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id)
      .select("-password")
      .populate({
        path: "enrolledCourses",
        populate: { path: "instructor", select: "name photoUrl" },
      });

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch profile" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user._id;

    let photoUrl = req.user.photoUrl;
    let publicId = req.user.publicId;
    // using this id to delete old photo

    if (!name && !description) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required",
      });
    }

    if (req.file) {
      //delete old
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }

      //upload new photo
      const result = await uploadToCloudinary(req.file.buffer, "lms/profiles");

      photoUrl = result.secure_url;
      publicId = result.public_id;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { name, description, photoUrl, publicId },
      { new: true },
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      // message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
