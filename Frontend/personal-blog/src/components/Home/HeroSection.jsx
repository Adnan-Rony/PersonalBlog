import React from "react";
import { Link } from "react-router-dom";
// import HeroImage from "../assets/hero-image.png"; // <- adjust the path to your image

const HeroSection = () => {
  return (
    <div className="h-screen flex items-center justify-between px-20 bg-[#f9f6f1]">
      {/* Left side */}
      <div className="flex flex-col justify-center space-y-6">
        <h1 className="text-7xl font-serif font-semibold leading-tight text-black">
          Human <br /> stories & ideas
        </h1>

        <p className="text-xl text-gray-700">
          A place to read, write, and deepen your understanding
        </p>

        <Link to="/login">
          <button className="px-6 py-3 bg-black text-white rounded-full text-lg hover:bg-gray-800 transition">
            Start reading
          </button>
        </Link>
      </div>

      
      {/* <div className="hidden md:flex">
        <img src={HeroImage} alt="Hero" className="w-[500px]" />
      </div> */}
    </div>
  );
};

export default HeroSection;
