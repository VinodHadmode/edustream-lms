import { BookOpen, PlusCircle, TrendingUp, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [courseStats, setCourseStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/course/instructor/dashboard",
        {
          credentials: "include",
        },
      );

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to fetch dashboard");
        return;
      }
      setStats(data.stats);
      setCourseStats(data.courseStats);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch dashboard");
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: "Total Courses",
      value: stats?.totalCourses || 0,
      sub: `${stats?.publishedCourses || 0} published`,
      icon: BookOpen,
      color: "text-blue-400",
      bg: "bg-blue-500",
    },
    {
      label: "Total Students",
      value: stats?.totalStudents || 0,
      sub: `across all courses`,
      icon: Users,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      label: "Total Revenue",
      value: `₹${stats?.totalRevenue || 0}`,
      sub: "from completed purchases",
      icon: TrendingUp,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Instructor Dashboard
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Track your courses and earnings
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-md mb-12">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/instructor/courses"
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            View My Courses
          </Link>
          <Link
            to="/instructor/courses/create"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Create New Course
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-6 flex items-center gap-5 shadow-md"
          >
            <div className={`${stat.bg} p-4 rounded-xl shrink-0`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-gray-900 text-2xl font-bold">{stat.value}</p>
              <p className="text-gray-400 text-xs mt-0.5">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Course Performance Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Course Performance
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Revenue and enrollment per course
          </p>
        </div>

        {courseStats.length > 0 ? (
          <>
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 text-gray-500 text-xs font-semibold uppercase mt-10">
              <div className="col-span-5">Course</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-center">Students</div>
              <div className="col-span-2 text-center">Revenue</div>
              <div className="col-span-1 text-center">Price</div>
            </div>

            {/* Table Rows */}
            {courseStats.map((course) => (
              <div
                key={course._id}
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition shadow-sm"
              >
                {/* Course Info */}
                <div className="col-span-5 flex items-center gap-4">
                  <img
                    src={
                      course.thumbnail ||
                      "https://placehold.co/56x56/1e293b/94a3b8?text=No+Image"
                    }
                    alt={course.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-gray-900 font-medium text-sm line-clamp-1">
                      {course.title}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-2 text-center">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      course.isPublished
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {course.isPublished ? "Live" : "Draft"}
                  </span>
                </div>

                {/* Students */}
                <div className="col-span-2 text-center flex justify-center items-center gap-1">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900 font-semibold">
                    {course.enrolledStudents}
                  </span>
                </div>

                {/* Revenue */}
                <div className="col-span-2 text-center font-semibold text-green-600">
                  ₹{course.revenue}
                </div>

                {/* Price */}
                <div className="col-span-1 text-center text-gray-500 text-sm">
                  ₹{course.price}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-center py-16">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-700 font-medium mb-1">No courses yet</p>
            <p className="text-gray-500 text-sm mb-6">
              Create your first course to see performance data
            </p>
            <Link
              to="/instructor/courses/create"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2 rounded-lg"
            >
              Create Course
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
