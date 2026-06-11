import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...formData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        return toast.error(data.message || "Registration Failed");
      }
      toast.success(data.message || "Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
        {/* Header  */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Create your account
          </h1>
          <p className="text-slate-500 mt-2">
            Join thousands of learners today
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* full name  */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="text-sm font-medium text-slate-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* password */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              className="px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Role */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">Role </label>

            <div className="flex gap-6 text-slate-600">
              <label htmlFor="student" className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  id="student"
                  value="student"
                  checked={formData.role === "student"}
                  onChange={handleChange}
                  className="accent-blue-500"
                />
                Student
              </label>
              <label htmlFor="instructor" className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  id="instructor"
                  value="instructor"
                  checked={formData.role === "instructor"}
                  onChange={handleChange}
                  className="accent-blue-500"
                />
                Instructor
              </label>
            </div>
          </div>

          {/* Submit  */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <p className="text-slate-500 text-sm text-center mt-6">
          Already have account?{" "}
          <Link
            to={"/login"}
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
