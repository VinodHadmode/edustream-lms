import { BookOpen, PlusCircle, TrendingUp, Users } from "lucide-react";
import React from "react";
import { Link } from "react-router";

// Dummy data — will replace with API later
const stats = [
  {
    label: "Total Courses",
    value: 4,
    icon: BookOpen,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    label: "Total Students",
    value: 120,
    icon: Users,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    label: "Total Revenue",
    value: "₹24,000",
    icon: TrendingUp,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
];

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Instructor Dashboard
          </h1>
          <p className="text-sm text-gray-600">
            Manage your courses and performance
          </p>
        </div>

        <Link
          to="/instructor/courses/create"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg transition"
        >
          + New Course
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-5 shadow-sm"
          >
            <div className={`${stat.bg} p-4 rounded-xl`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>

            <div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-gray-900 text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/instructor/courses"
            className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            View My Courses
          </Link>

          <Link
            to="/instructor/courses/create"
            className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Create New Course
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
