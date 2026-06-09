const Razorpay = require("razorpay");
const crypto = require("crypto");
const { CourseModel } = require("../models/course.model");
const { UserModel } = require("../models/user.model");
const { CoursePurchaseModel } = require("../models/coursePurchase.model");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//Create razorpay order
const createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user._id;

    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found." });
    }

    //Check if already purchased
    const alreadyPurchased = await CoursePurchaseModel.findOne({
      user: userId,
      course: courseId,
      status: "completed",
    });

    if (alreadyPurchased) {
      return res
        .status(400)
        .json({ success: false, message: "Course already purchased." });
    }

    //Create razorpay order
    const order = await razorpay.orders.create({
      amount: course.price * 100,
      currency: "INR",
      receipt: `reciept_${userId}`,
    });

    //Save pending purchase in DB
    await CoursePurchaseModel.create({
      user: userId,
      course: courseId,
      amount: course.price,
      orderId: order.id,
      status: "pending",
    });

    return res.status(200).json({
      success: true,
      order,
      course: { title: course.title, thumbnail: course.thumbnail },
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Failed to create order",
    });
  }
};

//Verify payment after Razorpay checkout
const verifyPayment = async (req, res) => {
  console.log("verify called", req.body);
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    //generating signature using built-in crypto
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    //verify signature
    if (expectedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment signature" });
    }

    //Find the purchase record
    const purchase = await CoursePurchaseModel.findOne({
      orderId: razorpay_order_id,
    });
    if (!purchase) {
      return res
        .status(404)
        .json({ success: false, message: "Purchase record not found." });
    }

    //Update purchase status
    purchase.status = "completed";
    purchase.paymentId = razorpay_payment_id;

    await purchase.save();

    //Add student to course's enrolledStudents
    await CourseModel.findByIdAndUpdate(purchase.course, {
      $addToSet: { enrolledStudents: purchase.user },
    });

    //Add Course to user's enrolledCourses
    await UserModel.findByIdAndUpdate(purchase.user, {
      $addToSet: { enrolledCourses: purchase.course },
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully.",
      courseId: purchase.course,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Payment verification failed." });
  }
};

// Get purchase history
const getPurchaseHistory = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  createOrder,
  verifyPayment,
  getPurchaseHistory,
};
