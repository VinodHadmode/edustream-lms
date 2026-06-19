import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import CourseCard from "../components/CourseCard";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublishedCourse } from "../redux/courseSlice";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const Home = () => {
  // const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { publishedCourses, loading, error } = useSelector(
    (state) => state.course,
  );

  useEffect(() => {
    dispatch(fetchPublishedCourse());
  }, []);

  const featuredCourse = publishedCourses?.slice(0, 3);

  return (
    <div>
      <Hero />

      {/* Featured Courses Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Featured Courses
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Handpicked courses to get you started
            </p>
          </div>
          <Link
            to="/courses"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition"
          >
            View All →
          </Link>
        </div>

        {/* Content  */}
        {loading ? (
          <div>
            <Loader label="Loading courses.." />
          </div>
        ) : featuredCourse.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourse.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-slate-300 rounded-xl">
            <p className="text-sm text-slate-500">No courses available yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
