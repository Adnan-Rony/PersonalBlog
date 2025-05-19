// src/components/Profile/LeftBlogsection.jsx
import React from "react";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import img from "../../assets/download.png";
import { MdDeleteOutline } from "react-icons/md";

import Swal from 'sweetalert2';
import { UseDeleteBlog } from "../../Features/blog/blogQuery.js";


const LeftBlogsection = ({ blogs,setBlogs }) => {

  const { mutate: deleteBlog, isLoading: deleting } = UseDeleteBlog();

  if (!blogs.length) return <p>No blogs found.</p>;



const handleDelete = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to delete this blog?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      deleteBlog(id); 
      Swal.fire('Deleted!', 'Your blog has been deleted.', 'success');
    }
  });
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
