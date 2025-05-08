// src/pages/SingleBlog.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import img from "../assets/user-profile-icon-free-vector.jpg";


import CommentForm from "../components/blog/CommentForm.jsx";
import CommentItem from "../components/blog/CommentItem.jsx";

import RecommndedBlogs from "../components/blog/RecommndedBlogs.jsx";
import { getBlogById, getLoginuser, postcomment } from "../api/blogApi.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

const SingleBlog = () => {


  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputData, setInputData] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [users, setusers] = useState([]);

  const fetchBlog = async () => {
    try {
      const response = await getBlogById(id)
      setBlog(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blog:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputData.trim()) return;
  
    try {
      setSubmitting(true);
      await postcomment(id, inputData); // ✅ uses axiosInstance inside
      setInputData("");
      await fetchBlog(); // refresh blog with new comment
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setSubmitting(false);
    }
  };
 
  const fetchUser = async () => {
    try {
      const res = await getLoginuser()
      setusers(res.data);
    } catch (err) {
      console.log("error fetching users", err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <LoadingSpinner></LoadingSpinner>
  if (!blog) return <p className="text-center mt-10">Blog not found.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        Posted on {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      <hr className="my-10 text-gray-200" />

      <div className="my-2">
        <p className="text-2xl font-semibold">
          Responses ({blog.comments.length})
        </p>

        <div className="flex items-center gap-2 my-4">
          <img
            src={blog.author?.image || img}
            alt="User Avatar"
            className="rounded-full w-10 h-10"
          />
          <div>
            <h1>{users.user.name}</h1>
          </div>
        </div>

        <CommentForm
          inputData={inputData}
          onChange={(e) => setInputData(e.target.value)}
          onSubmit={handleSubmit}
          submitting={submitting}
        />

        <hr className="my-10 text-gray-200" />

        {blog.comments
          ?.slice()
          .reverse()
          .map((comment, index) => (
            <CommentItem key={index} comment={comment} />
          ))}
      </div>

      <hr className="my-10 text-gray-200" />

      <h1 className="text-3xl font-semibold py-4">Recommended from Medium</h1>

      <RecommndedBlogs currentBlogId={id} key={id} />
    </div>
  );
};

export default SingleBlog;
