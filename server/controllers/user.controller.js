const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { cloudinary } = require("../config/cloudinary");
const { uploadToCloudinary } = require("../utils/uploadToCloudinary");

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
    return res.status(201).json({
      success: true,
      message: "New Account Created!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Register User!",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send token as httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Return user data without password
    const { password: _, ...userData } = user.toObject();
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: userData,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

const getProfile = async (req, res) => {
  try {
    return res.status(200).json({ success: true, user: req.user });
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
    console.log("Update profile error:", error); // change this line
    return res.status(500).json({
      success: false,
      // message: "Failed to update profile",
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
};

// import { v2 as cloudinary } from 'cloudinary';
// import multer from 'multer';
// import streamifier from 'streamifier';

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const upload = multer({ storage: multer.memoryStorage() });

// app.post('/upload', upload.single('image'), (req, res) => {
//   if (!req.file) return res.status(400).send('No file uploaded.');

//   const uploadStream = cloudinary.uploader.upload_stream(
//     { resource_type: 'image' },
//     (error, result) => {
//       if (error) return res.status(500).send(error);
//       // Save result.url and result.public_id to your DB
//       res.json({ url: result.url, public_id: result.public_id });
//     }
//   );
//   streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
// });
