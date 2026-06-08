import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import userAvatar from "../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { BookOpen, Mail, FileText, Edit } from "lucide-react";
import { Link } from "react-router";
import EditProfileModal from "../components/EditProfileModal";
import { fetchInstructorCourses } from "../redux/courseSlice";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  
  const { user } = useSelector((store) => store.auth);
  const { instructorCourses } = useSelector((store) => store.course);

  const dispatch = useDispatch();

  const enrolledCourses = user?.enrolledCourses || [];

  useEffect(() => {
    if (user?.role === "instructor") {
      dispatch(fetchInstructorCourses());
    }
  }, [user]);


  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* modal  */}
      {showModal && <EditProfileModal onClose={() => setShowModal(false)} />}

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
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200 shrink-0"
        >
          <Edit className="w-4 h-4" />
          Edit Profile
        </button>
      </div>

      {/* Enrolled or Created course  */}
      {user?.role === "instructor" ? (
        <div>
          {/* instructor - show created course  */}
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="text-blue-400 w-5 h-5" />
            <h2 className="text-xl font-bold text-white">My created Courses</h2>
            <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full ml-1">
              {instructorCourses?.length}
            </span>
          </div>

          {instructorCourses?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {instructorCourses.map((course) => {
                return <CourseCard key={course._id} course={course} />;
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
      ) : (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="text-blue-400 w-5 h-5" />
            <h2 className="text-xl font-bold text-white">Enrolled Course</h2>
            <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full ml-1">
              {enrolledCourses.length}
            </span>
          </div>

          {enrolledCourses?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => {
                return <CourseCard key={course._id} course={course} />;
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
      )}
    </div>
  );
};

export default Profile;
