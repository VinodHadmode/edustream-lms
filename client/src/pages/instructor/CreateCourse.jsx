import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Upload } from "lucide-react";
import toast from "react-hot-toast";

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

const CreateCourse = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "beginner",
    price: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category) {
      toast.error("Title and category required");
      return;
    }
    setIsLoading(true);
    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("category", formData.category);
      form.append("level", formData.level);
      form.append("price", formData.price);

      if (thumbnail) form.append("thumbnail", thumbnail);

      const response = await fetch("http://localhost:3000/api/course", {
        method: "POST",
        credentials: "include",
        body: form,
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to create course");
        return;
      }
      toast.success("Course created!");
      navigate("/instructor/courses");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Header  */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/instructor/courses"
          className="text-gray-400 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Create New Course</h1>
          <p className="text-gray-400 text-sm mt-1">
            Fill in the details to create your course
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* thumbnail upload */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300">
            Course Thumbnail
          </label>
          <div
            onClick={() => document.getElementById("thumbnail").click()}
            className="relative w-full h-52 bg-gray-900 border-2 border-dashed border-gray-700 hover:border-blue-500 transition-colors duration-200 overflow-hidden cursor-pointer"
          >
            {thumbnailPreview ? (
              <img
                src={thumbnailPreview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-3">
                <Upload className="w-8 h-8 text-gray-500" />
                <p className="text-gray-500 text-sm">
                  Click to upload thumbnail
                </p>
                <p className="text-gray-600 text-xs">JPEG, PNG, WEBP allowed</p>
              </div>
            )}

            {/* overlay on hover when img exists */}
            {thumbnailPreview && (
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <p className="text-white text-sm font-medium">
                  Change Thumbnail
                </p>
              </div>
            )}
          </div>
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            onChange={handleThumbnail}
            className="hidden"
          />
        </div>

        {/* title  */}
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-sm font-medium text-gray-300">
            Course Title <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Complete React.js Masterclass"
            className="bg-gray-900 text-white placeholder:text-gray-500 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* description  */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-300"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="What will students learn in this course"
            className="bg-gray-900 text-white placeholder:text-gray-500 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>
        </div>

        {/* category + level  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* category  */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-300"
            >
              Category <span className="text-red-400">*</span>
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="bg-gray-900 text-white px-4 py-3 rounded-lg outline-none focus:ring-blue-500 cursor-pointer"
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                );
              })}
            </select>
          </div>

          {/* level  */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="level"
              className="text-sm font-medium text-gray-300"
            >
              Level
            </label>
            <select
              name="level"
              id="level"
              value={formData.level}
              onChange={handleChange}
              className="bg-gray-900 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* price  */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="price"
              className="text-sm font-medium text-gray-300"
            >
              Price (₹)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 499"
              min={0}
              className="bg-gray-900 text-white placeholder:text-gray-500 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* button  */}
          <div className="flex gap-3 pt-2">
            <Link
              to="/instructor/course"
              className="flex-1 text-center bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              {isLoading ? "Creating..." : "Create Course"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
