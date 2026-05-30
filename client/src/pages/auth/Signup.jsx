import React from "react";
import { Link } from "react-router";

const Signup = () => {
  return (
    <div className="bg-slate-300 flex items-center justify-center px-4 py-12">
      <div className="bg-gray-900 text-gray-200 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          Create your account
        </h1>
        <p className="text-gray-400 mb-8 text-sm text-center">
          Join thousands of learners today
        </p>

        <form action="" className="space-y-4">
          {/* full name  */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="bg-slate-700 text-white placeholder:text-gray-500 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              className="bg-slate-700 text-white placeholder:text-gray-500 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="text"
              placeholder="Enter your password"
              className="bg-slate-700 text-white placeholder:text-gray-500 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Role</label>
            <div className="flex gap-6">
              <label htmlFor="student" className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  id="student"
                  className="accent-blue-500"
                />
                Student
              </label>
              <label htmlFor="student" className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  id="student"
                  className="accent-blue-500"
                />
                Instructor
              </label>
            </div>
          </div>

          {/* Submit  */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
          >
            Create Account
          </button>
        </form>
        <p className="text-gray-400 text-sm text-center mt-6">
          Already have account?{" "}
          <Link
            to={"/login"}
            className="text-blue-400 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
