import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  authInitialized,
  userLoggedIn,
  userLoggedOut,
} from "./redux/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/user/profile", {
        credentials: "include",
      });

      const data = await res.json();
      console.log("user data on load", data);

      if (data.success) {
        dispatch(userLoggedIn(data.user));
      } else {
        dispatch(userLoggedOut());
      }
    } catch (error) {
      console.log(error);
      dispatch(userLoggedOut());
    } finally {
      dispatch(authInitialized());
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Toaster position="top-center" />
      <main className="flex-1">
        {/* this is where home, about login page will show */}
        <Outlet />
      </main>
      <footer className="bg-gray-900 text-gray-400 text-center py-4">
        <p>© 2025 EduFlow. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
