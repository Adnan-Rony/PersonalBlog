// src/components/Profile/LeftBlogsection.jsx
import React from "react";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import img from "../../assets/download.png";
import { MdDeleteOutline } from "react-icons/md";
import { myblogdelete } from "../../api/blogApi.js";
import toast from "react-hot-toast";


const LeftBlogsection = ({ blogs,setBlogs }) => {
  if (!blogs.length) return <p>No blogs found.</p>;


  const handleDelete = (blogId) => {
    toast((t) => (
      <span className="flex flex-col gap-2">
        <p>Are you sure you want to delete this blog?</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={async () => {
              try {
                await myblogdelete(blogId);
                setBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
                toast.dismiss(t.id);
                toast.success("Blog deleted successfully.");
              } catch (err) {
                toast.dismiss(t.id);
                toast.error("Failed to delete blog.");
              }
            }}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            No
          </button>
        </div>
      </span>
    ));
  };






  return (
    <div>
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="bg-white rounded-lg shadow p-4 flex justify-between flex-col md:flex-row gap-4 space-y-2 my-2"
        >
          <div>
            <Link to={`/blogs/${blog._id}`}>
              <div className="text-gray-600">
                <h2 className="text-xl font-bold text-gray-900">
                  {blog.title}
                </h2>
                <p>{blog.content.replace(/<[^>]+>/g, "").slice(0, 100)}...</p>
              </div>
            </Link>
            <div className="text-sm text-gray-500 mt-2 flex items-center gap-4">
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              <span>💬 {blog.comments.length}</span>

              <Link to={`/blogs/update/${blog._id}`}>
                <BsThreeDots className="text-2xl cursor" />
              </Link>

              <MdDeleteOutline onClick={()=>handleDelete(blog._id)} className="text-2xl cursor" />





            </div>
          </div>
          <div>
            <img
              src={img}
              alt="thumbnail"
              className="w-52 h-32 object-cover rounded"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeftBlogsection;
