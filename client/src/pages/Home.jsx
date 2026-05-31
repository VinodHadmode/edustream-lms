import React from "react";
import Hero from "../components/Hero";
import { courses } from "./Courses";
import CourseCard from "../components/CourseCard";
import { Link } from "react-router";

const Home = () => {
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

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {courses.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
