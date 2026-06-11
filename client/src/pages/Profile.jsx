import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import userAvatar from "../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { BookOpen, Mail, FileText, Edit } from "lucide-react";
import { Link } from "react-router";
import EditProfileModal from "../components/EditProfileModal";
import { fetchInstructorCourses } from "../redux/courseSlice";
import { userLoggedIn } from "../redux/authSlice";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const { instructorCourses } = useSelector((store) => store.course);

  const [showModal, setShowModal] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.role === "instructor") {
      dispatch(fetchInstructorCourses());
    } else {
      fetchEnrolledCourses();
    }
  }, [user]);

  const fetchEnrolledCourses = async () => {
    setLoadingCourses(true);
    try {
      const response = await fetch("http://localhost:3000/api/user/profile", {
        credentials: "include",
      });

      const data = await response.json();
      if (data.success) {
        //update redux too
        dispatch(userLoggedIn(data.user));
        const populated = (data.user.enrolledCourses || []).filter(
          (c) => typeof c == "object" && c.title,
        );
        setEnrolledCourses(populated);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch courses");
    } finally {
      setLoadingCourses(false);
    }
  };

  return (
    <>
      {/* Edit profile modal  */}
      {showModal && <EditProfileModal onClose={() => setShowModal(false)} />}

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* profile Header  */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* left: avtar  + info */}
            <div className="flex items-center gap-6">
              <img
                src={user?.photoUrl || userAvatar}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
              />
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user?.name || "User name"}
                </h1>

                <p className="text-gray-600 text-sm">
                  {user?.email || "your@email.com"}
                </p>

                <span className="inline-block text-xs mt-2 font-semibold bg-blue-50 text-blue-600 px-3 py-1 rounded-full capitalize">
                  {user?.role || "student"}
                </span>
              </div>
            </div>

            {/* Right: edit  */}
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          </div>

          {/* Bio */}
          <p className="text-gray-600 text-sm mt-6 max-w-2xl">
            {user?.description || "No bio added yet"}
          </p>
        </div>

        {/* Enrolled or Created course  */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          {/* section header  */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">
                {user?.role === "instructor"
                  ? "My Created Courses"
                  : "My Learning"}
              </h2>
            </div>

            <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
              {user?.role === "instructor"
                ? instructorCourses?.length
                : enrolledCourses?.length}
            </span>
          </div>

          {/* instructor view  */}
          {user?.role === "instructor" ? (
            instructorCourses?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {instructorCourses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-gray-300 rounded-xl p-12 text-center">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-700 font-medium mb-1">
                  No courses created yet
                </p>
                <p className="text-gray-500 text-sm mb-6">
                  Start creating courses to see them here
                </p>
                <Link
                  to="/create-course"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2 rounded-lg transition"
                >
                  Create Course
                </Link>
              </div>
            )
          ) : enrolledCourses?.length > 0 ? (
            // student view
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <CourseCard key={course._id} course={course} enrolled={true} />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-gray-300 rounded-xl p-12 text-center">
              <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-700 font-medium mb-1">
                No enrolled courses
              </p>
              <p className="text-gray-500 text-sm mb-6">
                Courses you enroll in will appear here
              </p>
              <Link
                to="/courses"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2 rounded-lg transition"
              >
                Browse Courses
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
