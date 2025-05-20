import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseSearchBlog } from "../Features/blog/blogQuery.js";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const { data, isLoading } = UseSearchBlog(input);
  console.log(data);
  const navigate = useNavigate();

  const handleSelect = (blogId) => {
    setInput(""); // Clear input
    navigate(`blogs/${blogId}`); // Navigate to blog page
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search blog"
        className="w-full border bg-[#272935] text-white rounded px-4 py-2 focus:outline-none focus:ring-2 "
      />

      {/* Dropdown results */}
  {input.trim() && (
  <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg border border-gray-200 rounded z-50 max-h-60 overflow-y-auto">
    {isLoading ? (
      <p className="p-3 text-gray-500">Loading...</p>
    ) : Array.isArray(data) && data.length > 0 ? (
      data.map((blog) => (
        <button
          key={blog._id}
          onClick={() => handleSelect(blog._id)}
          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
        >
          {blog.title}
        </button>
      ))
    ) : (
      <p className="p-3 text-gray-500 text-sm">No blogs found.</p>
    )}
  </div>
)}

    </div>
  );
};

export default SearchBar;
