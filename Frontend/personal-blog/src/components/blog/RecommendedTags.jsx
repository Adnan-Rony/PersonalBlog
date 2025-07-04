import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { getAllBlogs } from "../../api/blogApi.js";

const RecommendedTags = ({ blogsProp }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);


  
  const allTags = [...new Set(blogs.flatMap((blog) => blog.tags))];
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAllBlogs()
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [blogsProp]);
  if (loading) return <p>loading....</p>
  return (
    <div>
      <div className="bg-white rounded-lg space-y-2  shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Recommended Tags</h3>
        <div className="grid grid-cols-2 gap-2 ">
          {allTags.slice(0, 12).map((tag, index) => (
            <Link key={index}
              to="/alltags"
              className="bg-gray-100 btn text-sm px-3 py-1 rounded-full text-gray-500"
            >
              <button  className="">
                {tag}
              </button>
            </Link>
          ))}
        </div>
        <Link to="/alltags" className="text- text-gray-600 pl-4 ">
          see more tags
        </Link>
      </div>
    </div>
  );
};

export default RecommendedTags;
