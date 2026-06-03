import React from "react";
import { Eye, EyeOff, Pencil, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export const Icourses = [
  {
    id: "1",
    title: "Complete MERN Stack Development",
    description:
      "Learn MongoDB, Express, React, and Node.js by building real-world applications from scratch.",
    category: "Web Development",
    level: "intermediate",
    price: 999,
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600",
    isPublished: true,
    instructor: "John Doe",
    enrolledStudents: 45,
  },
  {
    id: "2",
    title: "Advanced React.js",
    description:
      "Master hooks, context API, performance optimization, and scalable React architecture.",
    category: "Frontend",
    level: "advanced",
    price: 799,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600",
    isPublished: true,
    instructor: "John Doe",
    enrolledStudents: 32,
  },
  {
    id: "3",
    title: "Node.js & Express Backend",
    description:
      "Build secure REST APIs, authentication systems, and backend services using Node.js.",
    category: "Backend",
    level: "intermediate",
    price: 699,
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600",
    isPublished: false,
    instructor: "John Doe",
    enrolledStudents: 0,
  },
  {
    id: "4",
    title: "UI Design with Tailwind CSS",
    description:
      "Design modern, responsive, and clean user interfaces using Tailwind CSS utility classes.",
    category: "Frontend",
    level: "beginner",
    price: 499,
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600",
    isPublished: true,
    instructor: "John Doe",
    enrolledStudents: 78,
  },
  {
    id: "5",
    title: "JavaScript Data Structures & Algorithms",
    description:
      "Improve problem-solving skills and prepare for coding interviews using JavaScript.",
    category: "Computer Science",
    level: "intermediate",
    price: 599,
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de01c0d?w=600",
    isPublished: false,
    instructor: "John Doe",
    enrolledStudents: 0,
  },
  {
    id: "6",
    title: "Full-Stack Web Development Bootcamp",
    description:
      "A complete hands-on bootcamp covering frontend, backend, databases, and deployment.",
    category: "Web Development",
    level: "beginner",
    price: 1299,
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600",
    isPublished: true,
    instructor: "John Doe",
    enrolledStudents: 120,
  },
];

const InstructorCourses = () => {
  // Add isPublished + level + price to dummy data for now
  const [courses, setCourses] = useState(Icourses);

  const handleDelete = (id) => {
    // will call API later
    setCourses(courses.filter((c) => c.id !== id));
  };

  const handleTogglePublish = (id) => {
    // will call API later
    setCourses(
      courses.map((c) =>
        c.id === id ? { ...c, isPublished: !c.isPublished } : c,
      ),
    );
  };
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header  */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-gray-400 text-sm mt-1">
            {courses.length} Course created
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
      {courses.length > 0 ? (
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
          {courses.map((course) => {
            return (
              <div
                key={course.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-800 items-center hover:bg-gray-800/50 transition-colors duration-150"
              >
                {/* course info */}
                <div className="col-span-5 flex items-center gap-4">
                  <img
                    src={course.image}
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
                    onClick={() => handleTogglePublish(course.id)}
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
                    to={`/instructor/courses/${course.id}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                    title="Edit"
                  >
                    <Pencil className="w-5 h-5" />
                  </Link>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(course.id)}
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
