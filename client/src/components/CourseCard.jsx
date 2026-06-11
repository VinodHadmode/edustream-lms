import React from "react";
import { Link } from "react-router";

const CourseCard = ({ course, enrolled = false }) => {
  const path = enrolled
    ? `/course-progress/${course._id}`
    : `/course-detail/${course._id}`;

  return (
    <Link to={path} className="group">
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden transition hover:shadow-md">
        {/* Thumbnail */}
        <div className="h-44 w-full overflow-hidden bg-slate-100">
          <img
            src={
              course.thumbnail ||
              "https://placehold.co/600x400/1e293b/94a3b8?text=No+Thumbnail"
            }
            alt={course.title}
            className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3">
          <h2 className="text-slate-900 font-semibold text-base leading-snug line-clamp-2">
            {course.title}
          </h2>
          <p className="text-slate-600 text-sm line-clamp-2">
            {course.description || "No description available"}
          </p>

          {/* Instructor */}
          {course.instructor && (
            <p className="text-slate-500 text-xs">
              By{" "}
              <span className="text-slate-700 font-medium">
                {course.instructor.name}
              </span>
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-200">
            <span className="text-slate-900 font-semibold text-sm">
              ₹{course.price}
            </span>
            {course.level && (
              <span className="bg-blue-500/10 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                {course.level}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
