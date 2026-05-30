import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
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
