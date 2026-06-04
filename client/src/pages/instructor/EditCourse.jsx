import React from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

const categories = [
  "Web Development",
  "Frontend",
  "Backend",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "Computer Science",
  "DevOps",
  "UI/UX Design",
  "Database",
];

const EditCourse = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      {/* Header  */}
      <div className="flex items-center gap-4">
        <Link
          to={"/instructor/courses"}
          className="text-gray-400 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Edit Course</h1>
          <p className="text-gray-400 text-sm mt-1">
            Update your course details
          </p>
        </div>
      </div>

      {/* course details form  */}
      <div className="bg-gray-900 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-white mb-6">Course Details</h2>
        <form className="space-y-6">
          {/* thumbnail */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">
              Thumbnail
            </label>
            <div>
              {true ? (
                <img
                  src={
                    "https://png.pngtree.com/thumb_back/fh260/background/20240913/pngtree-stunning-red-and-blue-smoke-images-for-download-image_16191211.jpg"
                  }
                  alt="thumbnail"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-3">
                  <Upload className="w-8 h-8 text-gray-500" />
                  <p className="text-gray-500 text-sm">
                    Click to upload thumbnail
                  </p>
                </div>
              )}
            </div>
            <input type="file" id="thumbnail" accept="image/*" />
          </div>

          {/* title  */}
          <div>
            <label htmlFor=""></label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
