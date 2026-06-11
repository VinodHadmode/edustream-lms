import React from "react";
import {
  BookOpen,
  Eye,
  EyeOff,
  Pencil,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInstructorCourses,
  removeCourse,
  toggleCoursePublish,
} from "../../redux/courseSlice";
import { SERVER_URL } from "../../utils/constants";

const InstructorCourses = () => {
  const dispatch = useDispatch();
  const { instructorCourses, loading } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(fetchInstructorCourses());
  }, []);

  const handleDelete = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const response = await fetch(
        `${SERVER_URL}/api/course/${courseId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to delete course");
        return;
      }

      dispatch(removeCourse(courseId)); //local update
      toast.success("Course deleted");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete course");
      return;
    }
  };

  const handleTogglePublish = async (courseId) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/api/course/${courseId}/toggle-publish`,
        {
          method: "PATCH",
          credentials: "include",
        },
      );

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to delete course");
        return;
      }

      // Update local state instead of refetching
      dispatch(toggleCoursePublish(courseId));
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update course");
      return;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
          <p className="text-sm text-gray-600">
            {instructorCourses?.length} course created
          </p>
        </div>

        <Link
          to="/instructor/courses/create"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg transition"
        >
          + New Course
        </Link>
      </div>

      {/* Course Table */}
      {instructorCourses?.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 text-gray-600 text-sm font-semibold uppercase bg-gray-50">
            <div className="col-span-5">Course</div>
            <div className="col-span-2 text-center">Level</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-1 text-center">Status</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          {/* Table Rows */}
          {instructorCourses.map((course) => (
            <div
              key={course._id}
              className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 items-center hover:bg-gray-50 transition"
            >
              {/* Course Info */}
              <div className="col-span-5 flex items-center gap-4">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-14 h-14 rounded-lg object-cover shrink-0 border"
                />
                <p className="text-gray-900 font-medium text-sm line-clamp-2">
                  {course.title}
                </p>
              </div>

              {/* Level */}
              <div className="col-span-2 text-center">
                <span className="text-gray-600 text-sm capitalize">
                  {course.level}
                </span>
              </div>

              {/* Price */}
              <div className="col-span-2 text-center">
                <span className="text-gray-900 font-semibold">
                  ₹{course.price}
                </span>
              </div>

              {/* Status */}
              <div className="col-span-1 text-center">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    course.isPublished
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {course.isPublished ? "Live" : "Draft"}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center justify-center gap-4">
                {/* Publish Toggle */}
                <button
                  onClick={() => handleTogglePublish(course._id)}
                  title={course.isPublished ? "Unpublish" : "Publish"}
                  className="text-gray-500 hover:text-gray-900 transition"
                >
                  {course.isPublished ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>

                {/* Edit */}
                <Link
                  to={`/instructor/courses/${course._id}`}
                  title="Edit"
                  className="text-blue-600 hover:text-blue-700 transition"
                >
                  <Pencil className="w-5 h-5" />
                </Link>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(course._id)}
                  title="Delete"
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-16 text-center">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-700 font-medium mb-1">No courses yet</p>
          <p className="text-gray-500 text-sm mb-6">
            Create your first course to get started
          </p>
          <Link
            to="/instructor/courses/create"
            className="inline-flex bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2 rounded-lg transition"
          >
            Create Course
          </Link>
        </div>
      )}
    </div>
  );
};

export default InstructorCourses;
