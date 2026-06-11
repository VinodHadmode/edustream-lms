import React, { use, useState } from "react";
import { BookOpen, Menu, UserCircle, X } from "lucide-react";
import { Link, useNavigate, NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../redux/authSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user } = useSelector((state) => {
    return state.auth;
  });

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("http://localhost:3000/api/auth/logout", {
      method: "GET",
      credentials: "include",
    });
    dispatch(userLoggedOut());
    toast.success("Logged out successfully!");
    navigate("/");
    setOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium ${isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"} transition-colors`;

  return (
    <header className="sticky top-0 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* logo section  */}
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="text-blue-600 w-8 h-8" />
            <span className="text-xl font-bold text-blue-600">EduStream</span>
          </Link>

          {/* Desktop menu  */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/courses" className={navLinkClass}>
              Courses
            </NavLink>

            {user?.role === "instructor" && (
              <NavLink to="/instructor/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
            )}
          </nav>

          {/* Desktop actions  */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile">
                  {user?.photoUrl ? (
                    <img
                      src={user.photoUrl}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover border"
                    />
                  ) : (
                    <UserCircle className="w-9 h-9 text-gray-500" />
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button  */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-700"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* mobile menu  */}
        {open && (
          <div className="md:hidden border-t py-4 space-y-4">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={navLinkClass}
            >
              Course
            </NavLink>
            
            <NavLink
              to="/courses"
              onClick={() => setOpen(false)}
              className={navLinkClass}
            >
              Home
            </NavLink>

            {user?.role === "instructor" && (
              <NavLink
                to="/instructor/dashboard"
                onClick={() => setOpen(false)}
                className={navLinkClass}
              >
                Dashboard
              </NavLink>
            )}

            <div className="pt-4 border-t flex flex-col gap-3">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-gray-600"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="bg-blue-600 text-white text-center text-sm font-medium py-2 rounded-md"
                  >
                    Signup
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-gray-600"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left text-sm font-medium text-red-600"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
