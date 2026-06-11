import React, { useState } from "react";
import Students from "../assets/Students.webp";
import { useNavigate } from "react-router";

const Hero = () => {
  const navigate = useNavigate();


  return (
    <div className="bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* text-section  */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 leading-tight">
            Learn in-demand skills with expert-led courses
          </h1>
          <p className="text-slate-600 text-base">
            Learn from expert instructors and build real-world skills today.
          </p>

          
        </div>

        {/* image section  */}
        <div className="flex justify-center">
          <img
            src={Students}
            alt="Students learning online"
            className="w-full max-w-md object-contain rounded-2xl shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
