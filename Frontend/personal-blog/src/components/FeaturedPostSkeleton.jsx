import React from "react";

const FeaturedPostSkeleton = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="">
     

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Large Skeleton */}
          <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-md animate-pulse">
            <div className="w-full h-64 bg-gray-200 rounded-xl mb-4"></div>
            <div className="flex gap-2 mb-3">
              {[1, 2].map((i) => (
                <span
                  key={i}
                  className="w-16 h-6 bg-purple-100 rounded-full"
                ></span>
              ))}
            </div>
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>

          {/* Right Smaller Skeletons */}
          <div className="space-y-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm animate-pulse"
              >
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="w-16 h-4 bg-purple-100 rounded-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPostSkeleton;
