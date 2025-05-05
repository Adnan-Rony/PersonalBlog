import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance.js";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ExploreTags from "./ExploreTags.jsx";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const allTags = [...new Set(blogs.flatMap((blog) => blog.tags))];

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
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 py-6 space-y-2">
        <div class="lg:col-span-8 space-y-5  ">
          {blogs.map((blog) => (
            <Link to={`/blogs/${blog._id}`}>
              <div class="bg-white rounded-lg shadow p-4 flex justify-between flex-col md:flex-row gap-4 space-y-2 my-2">
                <div>
                  <h2 class="text-xl font-bold text-gray-900">{blog.title}</h2>

                  {/* <div
                    className="text-gray-600"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  ></div> */}

                  <div class="text-sm text-gray-500 mt-2 flex items-center gap-4">
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    <span>👁️ 359</span>
                    <span>💬 10</span>
                  </div>
                </div>

                <div>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO0AAADVCAMAAACMuod9AAAAYFBMVEXu7u5mZmbx8fFdXV3AwMDFxcWLi4tXV1dlZWX09PSrq6u8vLykpKSRkZHs7OxiYmLX19d2dnZwcHDR0dFra2vf3995eXmZmZmBgYHj4+O0tLRTU1OhoaGcnJxaWlqFhYUsohkDAAADb0lEQVR4nO3bC2/iOBSG4cSGwaYQ5waFbsv+/3+55zidQohhupqsFjPvI1WVwFT9eo4vCbQoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgLvMXP7vIN+xW85l9/h5zXp1+uskVr/ptHrJIa1ttj9+37a1i8dvZrM+vfsZJqx/tVnUdrXxM/wcvz1lkfa0meO39Ns8akvaf+8J01ZyFCmq5PCnS2uqy29Xni7tUQpr/B9T26KoX16Wf0ra3WsZXDgsUuOfK6008fGHLV3pXC+xJnP3ydJW5t32oS/LYJtdMXnJU6WVIcdGyhpKEd6mZ82nSisrcS0xpZNDKMPH9BVZp630nsZo9TWdTFkXJ275Mb22yzptnJjjc8SucdrGkjYkcuWcVnIe5Wv0hN+cettrL7eJezI5py18d1j4y06ujDn+bZ3qU7EyTluZrgm9xr18yuvpIrhD8o5MvmmNqWWOhlLiFhfnCCl1vXhbHpO3OvJN6+s2yNrbu6vq6kT2N27r5Jt2CCvFDctxNo1bpePmmnaorG6roQ+xmc+Di1hrEzfj42iTyjCt0Vbt2mFfjWys7tU1QOzoTVv7+IJBhmkrr6uxPaeVo+LCF9fXAJLRrG1ouovHM0wrZOvRkOe4shElru82oXeh7c6Hy+zS6tm4bi7aOB4TXTueu8OL5Kpe/hRN97VkZZdWGrTbh3FaLa9W9+v6vdKpuh5GuYu42aXVytpJWO3mpT+fmU2s7M9FrK0/H88ura+bMhFWu/m878aw4fOqXpu5Hp7KLa2RfTYk45a2jM2sgwovlXXDqF7OIEE2Im3yjNLGc0LdTOfsubzSzJUeLmQ1DqOnJK6+gZBR2mIIeyurxo0bkWw466s/idNmzi2t7/Z3sn7GrXSfdZNm15W5MhmlTW49V5lk3y3WtkxM7bDvTC61Xb17U+81xJ288Rph8eamo3TF0pVZ0s7xHv9/Sw68H/76BHWzvuWNue3a3WseaVfr453V+DJSGW4uZPZwCBmklam43YeY5ddx+/QoV+obJqn7ro/GvFl3b+sZuVVbvavu8uhk+52yfgNpHw1pnzvtPELyEwqPZZa0+u5QJrVd2Tmc7CqHtPViJi+79GeLHsos/1Lw9TFlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4LZ/AJgyNWEu01a3AAAAAElFTkSuQmCC"
                    alt="thumbnail"
                    class="w-full md:w-48 h-32 object-cover rounded "
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div class="lg:col-span-4 space-y-6">
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-lg font-semibold mb-4">Staff Picks</h3>
            <ul class="space-y-2">
              <li>
                <p class="text-sm font-medium">Can You Spot Fake News?...</p>
                <span class="text-xs text-gray-500">Apr 18</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-4">Recommended Tags</h3>
            <div className="flex flex-wrap gap-2 ">
              {allTags.map((tag, index) => (
                <button
                  key={index}
                  className="bg-gray-100 text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </button>
              ))}

              <Link to="/alltags" className="text-xs text-gray-600">
                see more tags
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
