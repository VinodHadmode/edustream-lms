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
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header  */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Instructor Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">Manage your course</p>
        </div>
        <Link
          to={"/instructor/courses"}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200"
        >
          {" "}
          <PlusCircle className="w-5 h-5" />
          New Course
        </Link>
      </div>

      {/* stat  */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => {
          return (
            <div
              key={stat.label}
              className="bg-gray-900 rounded-2xl p-6 flex items-center gap-5"
            >
              <div className={`${stat.bg} p-4 rounded-xl`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-white text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* QUick links  */}
      <div className="bg-gray-900 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/instructor/courses"
            className="bg-slate-700 hover:bg-slate-600 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            View My Courses
          </Link>
          <Link
            to="/instructor/courses/create"
            className="bg-slate-700 hover:bg-slate-600 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Create New Course
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
