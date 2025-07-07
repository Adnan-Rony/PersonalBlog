import React from "react";
import { UseFetchBlog } from "../../Features/blog/blogQuery.js";
import { Link } from "react-router-dom";
import FeaturedPostSkeleton from "../FeaturedPostSkeleton.jsx";

const FeaturedPosts = () => {
  const { data: blogs = [], isLoading, isError } = UseFetchBlog();

  const featuredSingleBlogs = blogs.slice(0, 1);
  const featuredRightsideBlogs = blogs.slice(1, 6);
   if (isLoading) return <FeaturedPostSkeleton />;

  return (
    <div className="container mx-auto sm:px-6 lg:px-8 py-12">
      <div className="">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-10">
        Featured Posts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Large Post */}
          <div className="md:col-span-2 ">
            {featuredSingleBlogs.map((blog) => (
              <Link
                to={`/blogs/${blog._id}`}
                key={blog._id}
                className="block bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition duration-300"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="rounded-xl w-full  object-cover mb-4"
                />
                <div className="flex flex-wrap gap-2 mb-3">
                  {blog.tags?.slice(0, 2).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium bg-purple-100 text-purple-700 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {blog.title}
                </h3>
                <p className=" sm:text-base text-gray-700 py-4 line-clamp-3">
                  {blog.content.replace(/<[^>]+>/g, "").slice(0, 300)}...
                </p>
              </Link>
            ))}
          </div>

          {/* Right Smaller Posts */}
          <div className="space-y-4">
            {featuredRightsideBlogs.map((post) => (
              <Link
                to={`/blogs/${post._id}`}
                key={post._id}
                className="group block bg-white rounded-2xl p-4 flex items-center gap-4 border border-transparent hover:border-purple-500 transition duration-300 shadow-sm hover:shadow-lg"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-1">
                    {post.tags?.slice(0, 1).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-sm font-semibold text-gray-800 group-hover:text-purple-700 transition line-clamp-2">
                    {post.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPosts;
