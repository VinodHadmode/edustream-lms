import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../components/CourseCard";
import { fetchPublishedCourse } from "../redux/courseSlice";

const Courses = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { publishedCourses, loading, error } = useSelector(
    (state) => state.course,
  );

  useEffect(() => {
    dispatch(fetchPublishedCourse());
  }, []);

  const filtered = publishedCourses?.filter((c) => {
    return c.title.toLowerCase().includes(search.toLowerCase());
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
          Explore Our Courses
        </h1>
        <p className="mt-3 text-slate-600 text-sm">
          Browse our library of expert-led courses and start building real-world
          skills today.
        </p>
      </div>

      {/* Search */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Course Grid */}
      {filtered?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <div className="mt-20 flex justify-center">
          <div className="border border-dashed border-slate-300 rounded-xl px-8 py-10 text-center">
            <p className="text-sm text-slate-500">No courses found.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
