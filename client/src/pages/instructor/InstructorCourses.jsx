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

const InstructorCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    getInstructorCourses();
  }, []);

  const getInstructorCourses = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/course", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to fetch instructor courses");
        return;
      }
      // console.log("courses", data.courses);
      setCourses(data.courses);
    } catch (error) {
      toast.error("Failed to fetch instructor courses");
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const response = await fetch(
        `http://localhost:3000/api/course/${courseId}`,
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

      let coursesAfterDeletion = courses.filter((c) => c._id !== courseId);
      setCourses(coursesAfterDeletion);
      toast.success("Course deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete course");
      return;
    }
  };

  const handleTogglePublish = async (courseId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/course/${courseId}/toggle-publish`,
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
      let coursesAfterTogglePublish = courses.map((c) => {
        return c._id === courseId ? { ...c, isPublished: !c.isPublished } : c;
      });
      setCourses(coursesAfterTogglePublish);
      toast.success(data.message || "Course deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete course");
      return;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header  */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">My Courses</h1>
          <p className="text-gray-400 text-sm mt-1">
            {courses?.length} Course created
          </p>
        </div>
        <Link
          to="/instructor/courses/create"
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200"
        >
          <PlusCircle className="w-5 h-5" />
          New Course
        </Link>
      </div>

      {/* course table  */}
      {courses?.length > 0 ? (
        <div className="bg-gray-900 rounded-2xl overflow-hidden">
          {/* table header  */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-700 text-gray-400 text-sm font-semibold uppercase">
            <div className="col-span-5">Courses</div>
            <div className="col-span-2 text-center">Level</div>
            <div className="col-span-2 text-center">Prices</div>
            <div className="col-span-1 text-center">Status</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          {/* table rows  */}
          {courses?.map((course) => {
            return (
              <div
                key={course._id}
                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-800 items-center hover:bg-gray-800/50 transition-colors duration-150"
              >
                {/* course info */}
                <div className="col-span-5 flex items-center gap-4">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                  />
                  <p className="text-white font-medium text-sm line-clamp-2">
                    {course.title}
                  </p>
                </div>

                {/* Level */}
                <div className="col-span-2 text-center">
                  <span className="text-gray-400 text-sm capitalize">
                    {course.level}
                  </span>
                </div>

                {/* Price */}
                <div className="col-span-2 text-center">
                  <span className="text-white font-semibold">
                    ₹{course.price}
                  </span>
                </div>

                {/* Status */}
                <div className="col-span-1 text-center">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      course.isPublished
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {course.isPublished ? "Live" : "Draft"}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex items-center justify-center gap-3">
                  {/* Toggle Publish */}
                  <button
                    onClick={() => handleTogglePublish(course._id)}
                    title={course.isPublished ? "Unpublish" : "Publish"}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {course.isPublished ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>

                  {/* Edit */}
                  <Link
                    to={`/instructor/courses/update/${course._id}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                    title="Edit"
                  >
                    <Pencil className="w-5 h-5" />
                  </Link>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(course._id)}
                    title="Delete"
                    className="text-red-400 hover:text-red-300 transition-colors duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-gray-900 rounded-2xl p-16 text-center">
          <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 font-medium mb-1">No courses yet</p>
          <p className="text-gray-600 text-sm mb-6">
            Create your first course to get started
          </p>
          <Link
            to="/instructor/courses/create"
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Create Course
          </Link>
        </div>
      )}
    </div>
  );
};

export default InstructorCourses;
