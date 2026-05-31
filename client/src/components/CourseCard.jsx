import React from "react";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] transition-all duration-300 cursor-pointer h-full flex flex-col">
      {/* thumbnail  */}
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-44 object-cover"
      />

      {/* content  */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <h2 className="text-white font-bold text-lg leading-snug line-clamp-2">
          {course.title}
        </h2>
        <p className="text-gray-400 text-sm line-clamp-2 flex-1">
          {course.description}
        </p>
      </div>

      {/* meta row  */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-700 mx-2 my-2">
        <span className="text-blue-400 font-bold text-lg">₹499</span>
        <span className="bg-blue-500/10 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full">
          Beginner
        </span>
      </div>
    </div>
  );
};

export default CourseCard;
