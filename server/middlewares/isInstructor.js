const isInstructor = (req, res, next) => {
  if (req.user.role !== "instructor") {
    return res
      .status(403)
      .json({ success: false, message: "Access denied. Instructor only." });
  }
  next();
};

module.exports = {
  isInstructor,
};
