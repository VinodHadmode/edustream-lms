import React from "react";

const Loader = ({ label = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />

      {/* Optional text */}
      <p className="mt-4 text-sm text-gray-600">{label}</p>
    </div>
  );
};

export default Loader;