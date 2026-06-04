import React from "react";
import { Outlet } from "react-router";

const InstructorLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <p className="font-bold">Instructor Panel</p>
      </aside>

      {/* main content  */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default InstructorLayout;
