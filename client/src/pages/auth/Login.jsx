import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { userLoggedIn } from "../../redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const disPatch=useDispatch()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        return toast.error(data.message || "Login Failed");
      }

      disPatch(userLoggedIn(data.user))
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      return toast.error("Login Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-300 flex items-center justify-center px-4 py-12">
      <div className="bg-gray-900 text-gray-200 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          Welcome back
        </h1>
        <p className="text-gray-400 mb-8 text-sm text-center">
          Please login to your account
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-slate-700 text-white placeholder:text-gray-500 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* password */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="bg-slate-700 text-white placeholder:text-gray-500 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit  */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
          >
             {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-gray-400 text-sm text-center mt-6">
          Don't have an account?{" "}
          <Link
            to={"/signup"}
            className="text-blue-400 hover:underline font-medium"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
