const SingleBlogSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main content skeleton */}
      <div className="bg-white lg:col-span-2 skeleton px-4 py-8 rounded-xl shadow-sm animate-pulse space-y-6">
        {/* Title */}
        <div className="h-10 bg-gray-300 skeleton rounded w-3/4"></div>
        {/* Date */}
        <div className="h-4 bg-gray-300 skeleton rounded w-1/4"></div>
        {/* Image */}
        <div className="h-64 bg-gray-300 skeleton rounded-2xl"></div>
        {/* Content paragraphs */}
        <div className="space-y-3">
          <div className="h-4 skeleton bg-gray-300 rounded w-full"></div>
          <div className="h-4 skeleton bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 skeleton bg-gray-300 rounded w-4/6"></div>
          <div className="h-4 skeleton bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 skeleton bg-gray-300 rounded w-2/3"></div>
        </div>

        {/* Comments header */}
        <div className="h-8 bg-gray-300 rounded w-1/3 mt-8"></div>
        {/* User info */}
        <div className="flex items-center space-x-4 mt-4">
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        </div>
        {/* Comment input */}
        <div className="h-12 bg-gray-300 rounded mt-4"></div>
        {/* Comment list skeleton */}
        <div className="space-y-4 mt-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          ))}
        </div>

        {/* Recommended Blogs header */}
        <div className="h-8 bg-gray-300 rounded w-1/3 mt-10"></div>
      </div>

      {/* Sidebar skeleton */}
      <div className="lg:col-span-1 animate-pulse">
        <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <ul className=" list-inside space-y-3">
            {[...Array(6)].map((_, i) => (
              <li key={i} className="h-4 bg-gray-300 skeleton rounded w-3/4"></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogSkeleton;
