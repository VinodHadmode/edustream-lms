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
import { SERVER_URL } from "../../utils/constants";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { currentCourse, loading } = useSelector((state) => state.course);

  useEffect(() => {
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
      const response = await fetch(`${SERVER_URL}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ courseId }),
      });

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
        name: "EduStream",
        description: data.course.title,
        image: data.course.thumbnail,
        order_id: data.order.id,

        //Step 3 - On payment success
        handler: async (response) => {
          console.log("Razorpay response in handler:", response);

          try {
            const verifyRes = await fetch(
              `${SERVER_URL}/api/payment/verify`,
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

  console.log("currentCourse", currentCourse);

  //check if student enrolled already
  const isEnrolled =
    user &&
    currentCourse?.enrolledStudents?.some((id) => {
      return id.toString() === user._id.toString();
    });

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-sm text-slate-500">Loading course...</p>
      </div>
    );
  }

  if (!currentCourse) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-sm text-slate-500">Course not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* left content */}
        <div className="flex-1 space-y-10">
          {/* thumbnail */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white">
            <img
              src={
                currentCourse?.thumbnail ||
                "https://placehold.co/800x450/1e293b/94a3b8?text=No+Thumbnail"
              }
              alt={currentCourse?.title || "Course Title"}
              className="w-full h-72 object-cover"
            />
          </div>

          {/* title + meta  */}
          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
              {currentCourse?.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <BarChart2 className="w-4 h-4 text-indigo-600" />
                <span className="capitalize">{currentCourse?.level}</span>
              </span>
              <span className="flex items-center gap-1">
                <Tag className="w-4 h-4 text-indigo-600" />{" "}
                {currentCourse?.category}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                {currentCourse?.lectures?.length} lectures
              </span>
            </div>
          </div>

          {/* Instructor  */}
          <div className="flex items-center gap-3 mt-6">
            <img
              src={user?.photoUrl}
              alt={currentCourse?.instructor?.name}
              className="w-10 h-10 rounded-full object-cover border-slate-200"
            />
            <p className="text-sm text-slate-600">
              Created by{" "}
              <span className="font-medium text-slate-900 hover:underline cursor-pointer">
                {currentCourse?.instructor?.name}Instructor
              </span>
            </p>
          </div>

          {/* Description  */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              About this course
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {currentCourse?.description || "No description provided"}
            </p>
          </div>

          {/* Course Content  */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Course Content
            </h2>
            <div className="space-y-3">
              {currentCourse?.lectures.length > 0 ? (
                currentCourse.lectures.map((lecture, index) => {
                  return (
                    <div
                      key={lecture._id}
                      className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-5 py-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-slate-100 p-2 rounded-lg">
                          {lecture.isPreview ? (
                            <PlayCircle className="w-5 h-5 text-slate-500" />
                          ) : (
                            <Lock className="w-5 h-5 text-slate-500" />
                          )}
                        </div>
                        <p className="text-slate-700 text-sm font-medium">
                          {index + 1}. {lecture.title}
                        </p>
                      </div>

                      {lecture?.isPreview && (
                        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                          Free Preview
                        </span>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-slate-500 text-sm">No lectures added yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* right side  */}
        {user?.role !== "instructor" && (
          <div className="lg:w-80 shrink-0">
            <div className="bg-white border border-slate-200 rounded-xl p-6 sticky top-24 space-y-5">
              {/* price  */}
              <div>
                <p className="text-2xl font-semibold text-slate-900">
                  ₹{currentCourse?.price}
                </p>
                <p className="text-slate-500 text-sm mt-1">One-time payment</p>
              </div>

              {/* CTA button */}
              {isEnrolled ? (
                <button
                  onClick={() => navigate(`/course-progress/${courseId}`)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-3 rounded-lg transition"
                >
                  Go to Course
                </button>
              ) : (
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-3 rounded-lg transition"
                >
                  Buy Now
                </button>
              )}

              {/* Includes  */}
              <div className="border-t border-slate-200 pt-5">
                <p className="text-slate-900 font-medium text-sm mb-3">
                  This course includes:
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    {currentCourse?.lectures.length} lectures
                  </li>
                  <li className="flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-indigo-600" />
                    <span className="capitalize">
                      {currentCourse?.level} level
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-indigo-600" />
                    {currentCourse?.category}
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    Full lifetime access
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
