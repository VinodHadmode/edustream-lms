import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  PlusCircle,
  Trash,
  Trash2,
  Upload,
  Video,
} from "lucide-react";
import toast from "react-hot-toast";
import { useEffect } from "react";

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
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "beginner",
    price: "",
  });

  //lecture states
  const [isAddingLecture, setIsAddingLecture] = useState(false);
  const [lectures, setLectures] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [showLectureForm, setShowLectureForm] = useState(false);
  const [lectureData, setLectureData] = useState({
    title: "",
    isPreview: false,
  });

  //fetch course on mount
  useEffect(() => {
    fetchCourse();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("category", formData.category);
      form.append("level", formData.level);
      form.append("price", formData.price);
      if (thumbnail) form.append("thumbnail", thumbnail);

      const response = await fetch(
        `http://localhost:3000/api/course/${courseId}`,
        {
          method: "PUT",
          credentials: "include",
          body: form,
        },
      );

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to update");
        return;
      }
      toast.success("Course updated!");
      navigate("/instructor/courses");
    } catch (error) {
      console.log(error);
      toast.error("Somehing went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCourse = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/course/${courseId}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to fetch course");
        return;
      }
      const c = data.course;

      setFormData({
        title: c.title || "",
        description: c.description || "",
        category: c.category || "",
        level: c.level || "beginner",
        price: c.price || "",
      });
      setThumbnailPreview(c.thumbnail || null);
      setLectures(c.lectures || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch course");
    } finally {
      setIsFetching(false);
    }
  };

  const handleAddLecture = async (e) => {
    e.preventDefault();
    if (!lectureData.title) {
      toast.error("Lecture title required");
      return;
    }

    setIsAddingLecture(true);
    try {
      const form = new FormData();
      form.append("title", lectureData.title);
      form.append("isPreview", lectureData.isPreview);
      if (videoFile) form.append("video", videoFile);

      const response = await fetch(
        `http://localhost:3000/api/course/${courseId}/lectures`,
        {
          method: "POST",
          credentials: "include",
          body: form,
        },
      );

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to add lecture");
        return;
      }

      setLectures(data.course.lectures);
      setLectureData({ title: "", isPreview: false });
      setVideoFile(null);
      setShowLectureForm(false);
      toast.success("Lecture added");
    } catch (error) {
      toast.error("Failed to add lecture");
    } finally {
      setIsAddingLecture(false);
    }
  };

  const handleDeleteLecture = async (lectureId) => {
    if (!window.confirm("Delete this lecture?")) return;
    try {
      const response = await fetch(
        `http://localhost:3000/api/course/${courseId}/lectures/${lectureId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to delete course");
        return;
      }
      
      let lecturesAfterDeletion = lectures.filter((l) => l._id !== lectureId);
      setLectures(lecturesAfterDeletion);
      toast.success("Lecture deleted");
    } catch (error) {
      toast.error("Failed to delete lecture");
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Loading course...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      {/* Header  */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/instructor/courses"
          className="text-gray-400 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Edit Course</h1>
          <p className="text-gray-400 text-sm mt-1">Update your details</p>
        </div>
      </div>

      {/* course details form  */}
      <div className="bg-gray-900 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-white mb-6">Course Details</h2>

        <form onSubmit={handleUpdateCourse} className="space-y-6">
          {/* thumbnail upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">
              Thumbnail
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
                  <p className="text-gray-600 text-xs">
                    JPEG, PNG, WEBP allowed
                  </p>
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
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-300"
            >
              Course Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="bg-slate-800 text-white placeholder:text-gray-500 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
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
              className="bg-slate-800 text-white placeholder:text-gray-500 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
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
                className="bg-slate-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
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
                className="bg-slate-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
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
                className="bg-slate-900 text-white placeholder:text-gray-500 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* submit  */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* lectures section */}
      <div className="bg-gray-900 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Lectures</h2>
            <p className="text-gray-400 text-sm mt-1">
              {lectures.length} lecture{lectures.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => setShowLectureForm(!showLectureForm)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <PlusCircle className="w-4 h-4" />
            Add Lecture
          </button>
        </div>

        {/* Add lecture form  */}
        {showLectureForm && (
          <form
            onSubmit={handleAddLecture}
            className="bg-slate-800 rounded-xl p-6 mb-6 space-y-4"
          >
            <h3 className="text-white font-semibold">New Lecture</h3>

            {/* lecture title  */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-300">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={lectureData.title}
                onChange={(e) =>
                  setLectureData({ ...lectureData, title: e.target.value })
                }
                placeholder="e.g. Introduction to react"
                className="bg-gray-900 text-white placeholder:text-gray-500 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* video upload */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-300">Video</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
                className="bg-gray-900 text-gray-400 px-4 py-3 rounded-lg outline-none file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-blue-500 file:text-white file:text-sm cursor-pointer"
              />
              {videoFile && (
                <p className="text-gray-400 text-xs mt-1">
                  Selected: {videoFile.name}
                </p>
              )}
            </div>

            {/* is Preview  */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={lectureData.isPreview}
                onChange={(e) =>
                  setLectureData({
                    ...lectureData,
                    isPreview: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-blue-500"
              />
              <span className="text-gray-300 text-sm">Free preview</span>
            </label>

            {/* form actions  */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowLectureForm(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isAddingLecture}
                className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-colors duration-200"
              >
                {isAddingLecture ? "Uploading.." : "Add Lecture"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Lecture list  */}
      {lectures.length > 0 ? (
        <div className="space-y-3">
          {lectures.map((lecture, index) => {
            return (
              <div
                key={lecture._id}
                className="flex items-center justify-between bg-slate-800 rounded-xl px-5 py-4"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <Video className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">
                      {index + 1}. {lecture.title}
                    </p>
                    {lecture.isPreview && (
                      <span className="text-xs text-green-400 font-medium">
                        Free Preview
                      </span>
                    )}
                  </div>
                </div>
                <button
                  className="text-red-400 hover:text-red-300 transition-colors duration-200"
                  title="Delete Lecture"
                  onClick={() => handleDeleteLecture(lecture._id)}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10">
          <Video className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">
            No lectures yet — add your first one above
          </p>
        </div>
      )}
    </div>
  );
};

export default EditCourse;
