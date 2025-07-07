import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/aerial-view-computer-laptop-wooden-table-workspace-concept.jpg"
const HeroBanner = () => {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <img
          src={img}
          alt="Background"
          className="w-full h-full object-cover blur-sm brightness-75"
        />
      </div>

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/blog-hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Welcome to <span className="text-purple-400">DevBlog</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-xl">
          Explore powerful blogs, tutorials & tech insights from developers around the world.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            to="/allblogs"
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full font-medium text-white transition"
          >
            Read Blogs
          </Link>
          {/* <Link
            to="/blog"
            className="border border-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-black transition"
          >
            Write a Blog
          </Link> */}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
