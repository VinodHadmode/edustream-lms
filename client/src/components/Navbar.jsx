import React from "react";
import { BookOpen, UserCircle } from "lucide-react";
import { Link, useNavigate, NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../redux/authSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user } = useSelector((store) => {
    return store.auth;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("http://localhost:3000/api/auth/user/logout", {
      method: "GET",
      credentials: "include",
    });
    dispatch(userLoggedOut());
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const navLinkClass = ({ isActive }) => {
    isActive
      ? "text-white"
      : "text-gray-400 hover:text-ehite transition-colors duration-200";
  };

  return (
    <div className="bg-gray-900 w-full sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-6">
        {/* logo section  */}
        <Link to={"/"} className="flex items-center gap-2">
          <BookOpen className="text-blue-400 w-8 h-8" />
          <h1 className="text-white text-2xl font-bold">EduFlow</h1>
        </Link>

        {/* menu section  */}
        <ul className="flex gap-7 text-white items-center font-semibold">
          <li>
            <NavLink to={"/"} className={navLinkClass}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to={"/courses"} className={navLinkClass}>
              Courses
            </NavLink>
          </li>

          {user?.role === "instructor" && (
            <li>
              <NavLink to="/instructor/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
            </li>
          )}

          {!user ? (
            <li className="flex gap-3">
              <Link to="/signup">
                <button className="bg-blue-500 hover:bg-blue-600  text-white px-4 py-2 rounded transition-colors duration-200">
                  Signup
                </button>
              </Link>
              <Link to={"/login"}>
                <button className="bg-gray-500 hover:bg-gray-800  text-white px-4 py-2 rounded transition-colors duration-200">
                  Login
                </button>
              </Link>
            </li>
          ) : (
            <li className="flex items-center gap-4">
              <Link to="/profile">
                {user?.photoUrl ? (
                  <img
                    src={user.photoUrl}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover border-2 border-blue-500 hover:border-blue-400 transition-colors duration-200"
                  />
                ) : (
                  <UserCircle className="w-9 h-9 text-gray-300 hover:text-white transition-colors duration-200" />
                )}
              </Link>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-200"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
