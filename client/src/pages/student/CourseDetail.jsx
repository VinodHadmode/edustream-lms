import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  BarChart,
  BarChart2,
  BookOpen,
  Clock,
  Lock,
  PlayCircle,
  Tag,
} from "lucide-react";
import { fetchCourseById } from "../../redux/courseSlice";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { currentCourse, loading } = useSelector((state) => state.course);

  useEffect(() => {
    // fetchCourse();
    dispatch(fetchCourseById(courseId));
  }, [courseId]);

  const handleBuyNow = async () => {
    if (!user) {
      toast.error("/Please login to purchase this course.");
      navigate("/login");
      return;
    }

    try {
      //step 1 - Create order on backend
      const response = await fetch(
        "http://localhost:3000/api/payment/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ courseId }),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to initiate payment");
        return;
      }

      //Step 2 - Open Razorpay checkout
      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "EduFlow",
        description: data.course.title,
        image: data.course.thumbnail,
        order_id: data.order.id,

        //Step 3 - On payment success
        handler: async (response) => {
          console.log("Razorpay response in handler:", response);

          try {
            const verifyRes = await fetch(
              "http://localhost:3000/api/payment/verify",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              },
            );

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              toast.success("Payment successfull! Enjoy your course.");
              navigate(`/course-progress/${courseId}`);
            }
          } catch (error) {
            toast.error("Something went wrong during verification");
          }
        },

        prefill: {
          name: user.name,
          email: user.email,
          contact: "9999999999",
        },

        theme: { color: "#3b82f6" },
      };

      const rzp = new window.Razorpay(options);
      // Handle payment failure
      rzp.on("payment.failed", () => {
        toast.error("Payment failed. Please try again.");
      });

      rzp.open();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //check if student enrolled already
  const isEnrolled =
    user &&
    currentCourse?.enrolledStudents?.some((id) => {
      return id.toString() === user._id.toString();
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Loading course...</p>
      </div>
    );
  }

  if (!currentCourse) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Course not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* left -main content */}
        <div className="flex-1 space-y-8">
          {/* thumbnail */}
          <img
            src={
              currentCourse?.thumbnail ||
              "https://placehold.co/800x450/1e293b/94a3b8?text=No+Thumbnail"
            }
            alt={currentCourse?.title || "Course Title"}
            className="w-full h-72 object-cover rounded-2xl"
          />

          {/* title + meta  */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white">
              {currentCourse?.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <BarChart2 className="w-4 h-4 text-blue-400" />
                <span className="capitalize">{currentCourse?.level}</span>
              </span>
              <span className="flex items-center gap-1">
                <Tag className="w-4 h-4 text-blue-400" />{" "}
                {currentCourse?.category}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4 text-blue-400" />
                {currentCourse?.lectures?.length} lecture
                {currentCourse?.lectures?.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Description  */}
          <div className="text-xl font-bold text-gray-600 mb-3">
            <h2 className="text-gray-400 leading-relaxed">About this course</h2>
            <p>{currentCourse?.description || "No description provided"}</p>
          </div>

          {/* Instructor  */}
          <div className="bg-gray-900 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Instructor</h2>
            <div className="flex items-center gap-4">
              <img
                src={user?.photoUrl}
                alt={currentCourse?.instructor?.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
              />
              <div>
                <p className="text-white font-semibold">
                  {currentCourse?.instructor?.name}
                </p>
                <p className="text-gray-400 text-sm">Instructor</p>
              </div>
            </div>
          </div>

          {/* Lecture list  */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">
              Course Content
            </h2>
            <div className="space-y-3">
              {currentCourse?.lectures.length > 0 ? (
                currentCourse.lectures.map((lecture, index) => {
                  return (
                    <div
                      key={lecture._id}
                      className="flex items-center justify-between bg-gray-900 rounded-xl px-5 py-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-500/10 p-2 rounded-lg">
                          {lecture.isPreview ? (
                            <PlayCircle className="w-5 h-5 text-gray-500" />
                          ) : (
                            <Lock className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                        <p className="text-gray-300 text-sm font-medium">
                          {index + 1}. {lecture.title}
                        </p>
                      </div>

                      {lecture?.isPreview && (
                        <span className="text-xs text-blue-400 font-semibold bg-blue-500/10 px-3 py-1 rounded-full">
                          Free Preview
                        </span>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-sm">No lectures added yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* right side  */}
        <div className="lg:w-80 shrink-0">
          <div className="bg-gray-900 rounded-2xl p-6 sticky top-24 space-y-5">
            {/* price  */}
            <div>
              <p className="text-3xl font-bold text-white">
                ₹{currentCourse?.price}
              </p>
              <p className="text-gray-500 text-sm mt-1">One-time payment</p>
            </div>

            {/* CTA button */}
            {isEnrolled ? (
              <button
                onClick={() => navigate(`/course-progress/${courseId}`)}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
              >
                Go to Course
              </button>
            ) : (
              <button
                onClick={handleBuyNow}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
              >
                Buy Now
              </button>
            )}

            {/* course includes  */}
            <div className="border-t border-gray-700 pt-5 space-y-3">
              <p className="text-white font-semibold text-sm">
                This course includes:
              </p>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  {currentCourse?.lectures.length} lectures
                </li>
                <li className="flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-blue-400" />
                  <span className="capitalize">
                    {currentCourse?.level} level
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-blue-400" />
                  {currentCourse?.category}
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  Full lifetime access
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
