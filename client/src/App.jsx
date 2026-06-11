import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SERVER_URL } from "./utils/constants";
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
      const res = await fetch(`${SERVER_URL}/api/user/profile`, {
        credentials: "include",
      });

      const data = await res.json();
      console.log("getProfile response:", data);

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
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <Toaster position="top-center" />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Routed pages will render here  */}
          <Outlet />
        </div>
      </main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-slate-500">
          © 2026 EduStream. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
