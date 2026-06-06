import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
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

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const isEnrolled = true;

  useEffect(() => {
    fetchCourse();
  }, []);

  const handleBuyNow = () => {};

  const fetchCourse = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/course/${courseId}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to fetch course");
        return;
      }
      console.log("courseOnDetailPage", data.course);
      setCourse(data.course);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch course");
      return;
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Loading course...</p>
      </div>
    );
  }

  if (!course) {
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
              course.thumbnail ||
              "https://placehold.co/800x450/1e293b/94a3b8?text=No+Thumbnail"
            }
            alt={course.title}
            className="w-full h-72 object-cover rounded-2xl"
          />

          {/* title + meta  */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white">{course.title}</h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <BarChart2 className="w-4 h-4 text-blue-400" />
                <span className="capitalize">{course.level}</span>
              </span>
              <span className="flex items-center gap-1">
                <Tag className="w-4 h-4 text-blue-400" /> {course.category}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4 text-blue-400" />
                {course?.lectures?.length} lecture
                {course?.lectures?.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Description  */}
          <div className="text-xl font-bold text-gray-600 mb-3">
            <h2 className="text-gray-400 leading-relaxed">About this course</h2>
            <p>{course.description || "No description provided"}</p>
          </div>

          {/* Instructor  */}
          <div className="bg-gray-900 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Instructor</h2>
            <div className="flex items-center gap-4">
              <img
                src={user.photoUrl}
                alt={course.instructor?.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
              />
              <div>
                <p className="text-white font-semibold">
                  {course.instructor?.name}
                </p>
                <p className="text-gray-400 text-sm">Instructor</p>
              </div>
            </div>
          </div>

          {/* Lecture list  */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">
              Coruse Content
            </h2>
            <div className="space-y-3">
              {course?.lectures.length > 0 ? (
                course.lectures.map((lecture, index) => {
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
              <p className="text-3xl font-bold text-white">₹{course.price}</p>
              <p className="text-gray-500 text-sm mt-1">One-time payment</p>
            </div>

            {/* CTA button */}
            {isEnrolled ? (
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                Go to Course
              </button>
            ) : (
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
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
                  {course.lectures.length} lectures
                </li>
                <li className="flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-blue-400" />
                  <span className="capitalize">{course.level} level</span>
                </li>
                <li className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-blue-400" />
                  {course.category}
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
