import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseSearchBlog } from "../Features/blog/blogQuery.js";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const { data, isLoading } = UseSearchBlog(input);
  const navigate = useNavigate();

  const handleSelect = (blogId) => {
    setInput("");
    navigate(`blogs/${blogId}`);
  };

  return (
    <div className="relative w-full">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search blogs..."
        className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          transition duration-200 ease-in-out text-base md:text-lg"
        aria-label="Search blogs"
      />

      {input.trim() && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg border border-gray-200 rounded-md z-50 max-h-60 overflow-y-auto">
          {isLoading ? (
            <p className="p-3 text-gray-500">Loading...</p>
          ) : Array.isArray(data) && data.length > 0 ? (
            data.map((blog) => (
              <button
                key={blog._id}
                onClick={() => handleSelect(blog._id)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 text-sm md:text-base"
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
