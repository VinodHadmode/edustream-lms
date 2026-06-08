import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import CourseCard from "../components/CourseCard";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublishedCourse } from "../redux/courseSlice";
import toast from "react-hot-toast";

const Home = () => {
  // const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { publishedCourses, loading, error } = useSelector(
    (state) => state.course,
  );

  useEffect(() => {
    dispatch(fetchPublishedCourse());
  }, []);

  // useEffect(() => {
  //   if (error) toast.error(error);
  // }, [error]);

  const featuredCourse = publishedCourses?.slice(0, 3);

  return (
    <div>
      <Hero />

      {/* Featured Courses Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-white mb-1">
              Featured Courses
            </h2>
            <p className="text-gray-400 text-sm">
              Handpicked courses to get you started
            </p>
          </div>
          <Link
            to="/courses"
            className="text-blue-400 hover:text-blue-300 font-semibold text-sm border border-blue-400 hover:border-blue-300 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <p className="text-gray-400">Loading courses...</p>
          </div>
        ) : featuredCourse.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {featuredCourse.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400">No courses available yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
