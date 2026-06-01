import React from "react";
import CourseCard from "../components/CourseCard";
import userAvatar from "../assets/user.png";
import { useSelector } from "react-redux";
import { BookOpen, Mail, FileText, Edit } from "lucide-react";
import { Link } from "react-router";

const Profile = () => {
  const user = useSelector((store) => store.auth);

  //temp
  //   const enrolledCourses = [];
  const enrolledCourses = [
    {
      id: 1,
      title: "Complete MERN Stack Development",
      description:
        "Learn MongoDB, Express, React, and Node.js by building real-world applications.",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
    },
    {
      id: 2,
      title: "Advanced React.js",
      description:
        "Master hooks, context API, performance optimization, and scalable React architecture.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    },
    {
      id: 3,
      title: "Node.js & Express Backend",
      description:
        "Build secure REST APIs, authentication systems, and backend services using Node.js.",
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613",
    },
    {
      id: 4,
      title: "UI Design with Tailwind CSS",
      description:
        "Design modern, responsive, and clean user interfaces using Tailwind CSS.",
      image: "https://images.unsplash.com/photo-1545235617-9465d2a55698",
    },
    {
      id: 5,
      title: "JavaScript Data Structures & Algorithms",
      description:
        "Improve problem-solving skills and prepare for coding interviews using JavaScript.",
      image: "https://images.unsplash.com/photo-1517430816045-df4b7de01c0d",
    },
    {
      id: 6,
      title: "Full-Stack Web Development Bootcamp",
      description:
        "A complete hands-on bootcamp covering frontend, backend, and deployment.",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* profile card  */}
      <div className="bg-gray-900 rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10">
        {/* avtar  */}
        <div className="relative shrink-0">
          <img
            src={user?.photoUrl || userAvatar}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
          />
        </div>

        {/* info  */}
        <div className="flex-1 text-center sm:text-left space-y-3">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {user?.name || "User name"}
            </h1>
            <span className="text-xs font-semibold bg-blue-500/10 text-blue-400 px-3 py-1">
              {user?.role || "student"}
            </span>
          </div>

          <div className="space-y-2 text-sm text-gray-400">
            <p className="flex items-center justify-center sm:justify-start gap-2">
              <Mail className="w-4 h-4 text-blue-400" />
              {user?.email || "your@email.com"}
            </p>
            <p className="flex items-center justify-center sm:justify-start gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              {user?.description || "No bio added yet"}
            </p>
          </div>
        </div>

        {/* edit  */}
        {/* Edit Button */}
        <Link
          to="/profile/edit"
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200 shrink-0"
        >
          <Edit className="w-4 h-4" />
          Edit Profile
        </Link>
      </div>

      {/* Enrolled course  */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="text-blue-400 w-5 h-5" />
          <h2 className="text-xl font-bold text-white">Enrolled Course</h2>
          <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full ml-1">
            {enrolledCourses.length}
          </span>
        </div>

        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => {
              return <CourseCard key={course.id} course={course} />;
            })}
          </div>
        ) : (
          <div className="bg-gray-900 rounded-2xl p-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 font-medium mb-1">No courses yet</p>
            <p className="text-gray-600 text-sm mb-6">
              Courses you enroll in will appear here
            </p>
            <Link
              to="/courses"
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Browse Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
