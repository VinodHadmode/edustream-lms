import React from "react";
import { Link } from "react-router";

const CourseCard = ({ course }) => {
  return (
    <Link to={`/course-detail/${course._id}`}>
      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] transition-all duration-300 cursor-pointer h-full flex flex-col">
        {/* Thumbnail */}
        <img
          src={
            course.thumbnail ||
            "https://placehold.co/600x400/1e293b/94a3b8?text=No+Thumbnail"
          }
          alt={course.title}
          className="w-full h-44 object-cover"
        />

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 gap-3">
          <h2 className="text-white font-bold text-lg leading-snug line-clamp-2">
            {course.title}
          </h2>
          <p className="text-gray-400 text-sm line-clamp-2 flex-1">
            {course.description || "No description available"}
          </p>

          {/* Instructor */}
          {course.instructor && (
            <p className="text-gray-500 text-xs">
              By{" "}
              <span className="text-gray-300 font-medium">
                {course.instructor.name}
              </span>
            </p>
          )}

          {/* Meta row */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-700">
            <span className="text-blue-400 font-bold text-lg">
              ₹{course.price}
            </span>
            <span className="bg-blue-500/10 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full capitalize">
              {course.level}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
