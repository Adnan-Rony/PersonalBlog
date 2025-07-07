import React from "react";

const SubscribeNewsletter = () => {
  return (
    <div className="bg-gradient-to-r container mx-auto from-[#4f49f3] to-[#af1ffe] rounded-2xl p-10 md:flex justify-between items-center text-white shadow-lg">
      {/* Left Section */}
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Subscribe to DevThrought <br /> and stay updated.
        </h2>
        <p className="text-lg">
          Don't miss anything. Get all the latest posts delivered straight to
          your inbox. It's free!
        </p>
      </div>

      {/* Right Section */}
      <div className="bg-[#995cfa] rounded-xl p-8 w-full md:w-[400px] shadow-md">
        <input
          type="text"
          placeholder="Your name"
          className="w-full p-3 text-black rounded-full mb-4 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="email"
          placeholder="Your email address"
          className="w-full p-3 text-black rounded-full mb-4 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button className="w-full p-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default SubscribeNewsletter;
