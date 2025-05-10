import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import img from "../assets/download.png";

import RecommendedTags from "../components/blog/RecommendedTags.jsx";
import { getAllBlogs } from "../api/blogApi.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import Seo from "../components/Seo.jsx";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const allCategories = [...new Set(blogs.flatMap((blog) => blog.categories))];

  const cleanedCategories = allCategories.flatMap((cat) =>
    cat
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  );
  const visibleCategories = expanded
    ? cleanedCategories
    : cleanedCategories.slice(0, 9); // Show first 5 if collapsed

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAllBlogs();
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="">
   <Seo
      title="DevThought | Home page  "
      description="Explore all blog posts on various topics including tech, life, and tips. Stay informed with our latest posts."
    />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 py-6 space-y-2">
        <div className="lg:col-span-8 space-y-5  ">
          {/* categories */}
          <div className="flex items-center gap-2 flex-wrap overflow-x-auto">
            {visibleCategories.map((cat, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded text-sm whitespace-nowrap"
              >
                {cat}
              </span>
            ))}

            {cleanedCategories.length > 8 && (
              <button onClick={() => setExpanded(!expanded)} className="">
                {expanded ? (
                  <MdKeyboardArrowLeft className="text-3xl cursor-auto" />
                ) : (
                  <MdKeyboardArrowRight className="text-3xl" />
                )}
              </button>
            )}
          </div>

          
          <hr className="text-gray-300 " />
          {blogs.map((blog, index) => (
            <Link key={index} to={`/blogs/${blog._id}`}>
              <div className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4 space-y-2 my-2">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">
                    {blog.title}
                  </h2>

                  <div className="text-gray-600">
                    {blog.content.replace(/<[^>]+>/g, "").slice(0, 100)}...
                  </div>

                  <div className="text-sm text-gray-500 mt-2 flex items-center gap-4">
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    <span>💬 {blog.comments.length}</span>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {
                    blog.image ? (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    ) : (
                      <img
                        src={img}
                        alt="default"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    )
                  }
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-4">Staff Picks</h3>
            <ul className="space-y-2">
              <li>
                <p className="text-sm font-medium">
                  Can You Spot Fake News?...
                </p>
                <span className="text-xs text-gray-500">Apr 18</span>
              </li>
            </ul>
          </div>
          <RecommendedTags blogsProp={blogs}></RecommendedTags>
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
