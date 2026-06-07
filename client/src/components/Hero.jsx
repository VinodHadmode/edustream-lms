import React, { useState } from "react";
import HeroImageGirl from "../assets/HeroImageGirl.webp";
import { useNavigate } from "react-router";

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-800 min-h-screen">
      <div className="max-w-7xl mx-auto flex md:flex-row flex-col gap-10 items-center px-6 py-16">
        {/* text-section  */}
        <div className="space-y-7 flex-1">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-200 leading-tight">
            Explore our courses for all
          </h1>
          <p className="text-gray-300 text-lg">
            Learn from expert instructors and build real-world skills today.
          </p>
        </div>

        {/* image section  */}
        <div className="flex-1 flex justify-center">
          <img
            src={HeroImageGirl}
            alt="Hero"
            className="max-w-sm md:max-w-md w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
