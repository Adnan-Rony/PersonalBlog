// src/components/Profile/LeftBlogsection.jsx
import React from "react";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import img from "../../assets/download.png";
import { MdDeleteOutline } from "react-icons/md";

import Swal from "sweetalert2";
import { UseDeleteBlog } from "../../Features/blog/blogQuery.js";

const LeftBlogsection = ({ blogs, setBlogs }) => {
  const { mutate: deleteBlog, isLoading: deleting } = UseDeleteBlog();

  if (!blogs.length) return <p>No blogs found.</p>;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this blog?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(id);
        Swal.fire("Deleted!", "Your blog has been deleted.", "success");
      }
    });
  };

  return (
    <div>
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row justify-between gap-4 my-4"
        >
          {/* Left Side - Content */}
          <div className="flex-1">
            <Link to={`/blogs/${blog._id}`}>
              <div className="text-gray-600 space-y-2">
                <h2 className="text-xl font-bold text-gray-900">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-700">
                  {blog.content.replace(/<[^>]+>/g, "").slice(0, 100)}...
                </p>
              </div>
            </Link>

            {/* Meta Info */}
            <div className="text-sm text-gray-500 mt-3 flex flex-wrap items-center gap-4">
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              <span>💬 {blog.comments.length}</span>

              <Link to={`/blogs/update/${blog._id}`}>
                <BsThreeDots className="text-2xl cursor-pointer" />
              </Link>

              <MdDeleteOutline
                onClick={() => handleDelete(blog._id)}
                className="text-2xl text-red-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="md:w-52 w-full">
            <img
              src={blog.image || img}
              alt="thumbnail"
              loading="lazy"
              className="w-full h-32 object-cover rounded"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeftBlogsection;
