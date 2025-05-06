import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import img from "../assets/download.png"
import axiosInstance from "../api/axiosInstance.js";


const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const allTags = [...new Set(blogs.flatMap((blog) => blog.tags))];

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
        const response = await axiosInstance.get("/blogs");
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading blogs...</p>;

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 py-6 space-y-2">
        <div className="lg:col-span-8 space-y-5  ">
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
          </div>{" "}
          <hr className="text-gray-300 " />
          {blogs.map((blog, index) => (
            <Link key={index} to={`/blogs/${blog._id}`}>
              <div className="bg-white rounded-lg shadow p-4 flex justify-between flex-col md:flex-row gap-4 space-y-2 my-2">
                <div className="">
                  <h2 className="text-xl font-bold text-gray-900">
                    {blog.title}
                  </h2>

                  <div
                    className="text-gray-600"
                   
                  >
                    {blog.content.replace(/<[^>]+>/g, '').slice(0, 100)}...
                  </div>

                  <div className="text-sm text-gray-500 mt-2 flex items-center gap-4">
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    <span>👁️ 359</span>
                    <span>💬 10</span>
                  </div>
                </div>

                <div>
                  <img
                    src={img}
                    alt="thumbnail"
                    className="w-52   h-32 object-cover rounded "
                  />
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

          <div className="bg-white rounded-lg space-y-2  shadow p-4">
            <h3 className="text-lg font-semibold mb-4">Recommended Tags</h3>
            <div className="grid grid-cols-2 gap-2 ">
              {allTags.map((tag, index) => (
                <button
                  key={index}
                  className="bg-gray-100 btn text-sm px-3 py-1 rounded-full text-gray-500"
                >
                  {tag}
                </button>
              ))}
            </div>
            <Link to="/alltags" className="text- text-gray-600 pl-4 ">
              see more tags
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
