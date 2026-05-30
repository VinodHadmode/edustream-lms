import React from "react";
import { BookOpen, UserCircle } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  const user = false;
  return (
    <div className="bg-gray-900 w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-6">
        <div className="flex gap-1">
          {/* logo section  */}
          <Link to={"/"}>
            <BookOpen className="text-gray-300 w-10 h-10" />
            <h1 className="text-gray-300 text-3xl font-bold">EduFlow</h1>
          </Link>
        </div>

        {/* menu section  */}
        <ul className="flex gap-7 text-xl items-center font-semibold text-white">
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"/course"}>
            <li>Courses</li>
          </Link>

          {!user ? (
            <li className="flex gap-3">
              <Link to={'/signup'}>
                <button className="bg-blue-500 hover:bg-blue-600  text-white px-4 py-2 rounded">
                  Signup
                </button>
              </Link>
              <Link to={'/login'}>
                <button className="bg-gray-500 hover:bg-gray-800  text-white px-4 py-2 rounded">
                  Login
                </button>
              </Link>
            </li>
          ) : (
            <div>
              <UserCircle className="w-8 h-8" />
              <button className="bg-blue-500 hover:bg-blue-600 text-white">
                Logout
              </button>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
