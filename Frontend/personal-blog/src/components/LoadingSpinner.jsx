import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full border-t-4 border-black w-12 h-12"></div>
        <span className="text-black font-semibold text-xl">DevThoughts</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
