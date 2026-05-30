import React from "react";
import HeroImageGirl from '../assets/HeroImageGirl.webp'

const Hero = () => {
  return (
    <div className="bg-slate-800 min-h-screen pt-20">
      <div className="max-w-7xl mx-auto flex md:flex-row flex-col gap-10 items-center px-6 py-16">

        {/* text-section  */}
        <div className="space-y-7 flex-1">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-200 leading-tight">
            Explore our courses for all
          </h1>
          <p className="text-gray-300 text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis,
            eius.
          </p>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search your course here.."
              className="bg-gray-200 text-gray-800 p-4 rounded-l-xl placeholder:text-gray-500 w-full max-w-md outline-none"
            />
            <button className="px-6 py-4 bg-blue-500 hover:bg-blue-600 font-semibold text-white rounded-r-xl text-base whitespace-nowrap">Search</button>
          </div>
        </div>
        {/* image section  */}
        <div className="flex-1 flex justify-center">
            <img src={HeroImageGirl} alt="Hero" className="max-w-sm md:max-w-md w-full object-contain"/>
        </div>
      </div>
    </div>
  );
};

export default Hero;
