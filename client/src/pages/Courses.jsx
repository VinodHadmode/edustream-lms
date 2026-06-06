import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import CourseCard from "../components/CourseCard";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPublishedCourses();
  }, []);

  const fetchPublishedCourses = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/course/published",
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
      setCourses(data.courses);
    } catch (error) {
      toast.error("Failed to fetch course");
    } finally {
      setLoading(false);
    }
  };

  console.log("courses", courses);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-3">
            Explore Our Courses
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-base">
            Browse our library of expert-led courses and start building
            real-world skills today.
          </p>
        </div>

        {/* Search */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-900 text-white placeholder:text-gray-500 px-5 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md"
          />
        </div>

        {/* Grid */}
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-20 text-lg">
            No courses found for "<span className="text-white">{search}</span>"
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
