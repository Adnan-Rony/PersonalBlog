import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance.js";
import { Link } from "react-router-dom";

const ExploreTags = () => {
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [blogLoading, setBlogLoading] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axiosInstance.get("/blogs/tags");
        setTags(response.data);
        setFilteredTags(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = tags.filter((tag) => tag.toLowerCase().includes(term));
    setFilteredTags(filtered);
    setShowDropdown(term.length > 0 && filtered.length > 0);
  }, [searchTerm, tags]);

  const handleTagSelect = async (tag) => {
    setSearchTerm(tag);
    setShowDropdown(false);
    await fetchBlogsByTag(tag);
  };

  const fetchBlogsByTag = async (tag) => {
    setBlogLoading(true);
    try {
      const response = await axiosInstance.get(`/blogs/tag/${tag}`);
      setBlogs(response.data);
    } catch (error) {
      setBlogs([]);
      console.error("Error fetching blogs:", error);
    }
    setBlogLoading(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {tags.slice(0,10).map((tag, index) => (
          <span
            key={index}
            onClick={() => handleTagSelect(tag)}
            className="bg-gray-100 text-sm px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="my-10">
        <h2 className="text-4xl font-semibold mb-4 text-center">
          Explore Tags
        </h2>

        <div className="relative flex justify-center">
          <input
            type="text"
            placeholder="Search all tags"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input w-full max-w-md border-none bg-gray-100 px-4 py-2 rounded"
            onFocus={() => {
              if (searchTerm.length > 0 && filteredTags.length > 0) {
                setShowDropdown(true);
              }
            }}
            onBlur={() => {
              setTimeout(() => setShowDropdown(false), 200);
            }}
          />

          {showDropdown && (
            <ul className="absolute top-full mt-1 bg-white border border-gray-200 rounded-md shadow w-full max-w-md z-10">
              {filteredTags.map((tag, index) => (
                <li
                  key={index}
                  onClick={() => handleTagSelect(tag)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-6">
        {blogLoading ? (
          <p>Loading blogs...</p>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Link to={`/blogs/${blog._id}`}>
                <div
                  key={blog._id}
                  className="bg-white p-4  rounded-lg  shadow-sm hover:shadow-md transition duration-300"
                >
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  ) : (
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO0AAADVCAMAAACMuod9AAAAYFBMVEXu7u5mZmbx8fFdXV3AwMDFxcWLi4tXV1dlZWX09PSrq6u8vLykpKSRkZHs7OxiYmLX19d2dnZwcHDR0dFra2vf3995eXmZmZmBgYHj4+O0tLRTU1OhoaGcnJxaWlqFhYUsohkDAAADb0lEQVR4nO3bC2/iOBSG4cSGwaYQ5waFbsv+/3+55zidQohhupqsFjPvI1WVwFT9eo4vCbQoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgLvMXP7vIN+xW85l9/h5zXp1+uskVr/ptHrJIa1ttj9+37a1i8dvZrM+vfsZJqx/tVnUdrXxM/wcvz1lkfa0meO39Ns8akvaf+8J01ZyFCmq5PCnS2uqy29Xni7tUQpr/B9T26KoX16Wf0ra3WsZXDgsUuOfK6008fGHLV3pXC+xJnP3ydJW5t32oS/LYJtdMXnJU6WVIcdGyhpKEd6mZ82nSisrcS0xpZNDKMPH9BVZp630nsZo9TWdTFkXJ275Mb22yzptnJjjc8SucdrGkjYkcuWcVnIe5Wv0hN+cettrL7eJezI5py18d1j4y06ujDn+bZ3qU7EyTluZrgm9xr18yuvpIrhD8o5MvmmNqWWOhlLiFhfnCCl1vXhbHpO3OvJN6+s2yNrbu6vq6kT2N27r5Jt2CCvFDctxNo1bpePmmnaorG6roQ+xmc+Di1hrEzfj42iTyjCt0Vbt2mFfjWys7tU1QOzoTVv7+IJBhmkrr6uxPaeVo+LCF9fXAJLRrG1ouovHM0wrZOvRkOe4shElru82oXeh7c6Hy+zS6tm4bi7aOB4TXTueu8OL5Kpe/hRN97VkZZdWGrTbh3FaLa9W9+v6vdKpuh5GuYu42aXVytpJWO3mpT+fmU2s7M9FrK0/H88ura+bMhFWu/m878aw4fOqXpu5Hp7KLa2RfTYk45a2jM2sgwovlXXDqF7OIEE2Im3yjNLGc0LdTOfsubzSzJUeLmQ1DqOnJK6+gZBR2mIIeyurxo0bkWw466s/idNmzi2t7/Z3sn7GrXSfdZNm15W5MhmlTW49V5lk3y3WtkxM7bDvTC61Xb17U+81xJ288Rph8eamo3TF0pVZ0s7xHv9/Sw68H/76BHWzvuWNue3a3WseaVfr453V+DJSGW4uZPZwCBmklam43YeY5ddx+/QoV+obJqn7ro/GvFl3b+sZuVVbvavu8uhk+52yfgNpHw1pnzvtPELyEwqPZZa0+u5QJrVd2Tmc7CqHtPViJi+79GeLHsos/1Lw9TFlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4LZ/AJgyNWEu01a3AAAAAElFTkSuQmCC"
                      alt="thumbnail"
                      class="w-full h-48 object-cover rounded "
                    />
                  )}

                  <h4 className="text-lg font-semibold mb-2">{blog.title}</h4>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: blog.content?.slice(0, 35),
                    }}
                  />
                </div>
              </Link>
            ))}
          </div>
        ) : searchTerm ? (
          <p>No blogs found for this tag.</p>
        ) : null}
      </div>
    </div>
  );
};

export default ExploreTags;
