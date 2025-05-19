// src/pages/SingleBlog.jsx
import React, {  useState } from "react";
import { useParams } from "react-router-dom";
import img from "../assets/user-profile-icon-free-vector.jpg";
import ReactHtmlParser from "html-react-parser";
import CommentForm from "../components/blog/CommentForm.jsx";
import CommentItem from "../components/blog/CommentItem.jsx";
// Add at the top with your imports
import DOMPurify from "dompurify";
import { useQueryClient } from "@tanstack/react-query";
import RecommndedBlogs from "../components/blog/RecommndedBlogs.jsx";

import LoadingSpinner from "../components/LoadingSpinner.jsx";
import Seo from "../components/Seo.jsx";
import { UseCreateBlogComment, UseFetchBlogById } from "./../Features/blog/blogQuery";
import { UseCurrentUser } from "../Features/users/userQuery.js";
import { postcomment } from "../Features/blog/blogAPI.js";

const SingleBlog = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data: blog, isLoading, isError,refetch } = UseFetchBlogById(id);


  const { data: user } = UseCurrentUser();


  const [inputData, setInputData] = useState("");

  const [submitting, setSubmitting] = useState(false);





  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputData.trim()) return;

    try {
      setSubmitting(true);
      await postcomment(id, inputData); 
      setInputData("");
      await refetch()
     queryClient.invalidateQueries({ queryKey: ["blog", id] });
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setSubmitting(false);
    }
  };





  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (isError) return <p className="text-center mt-10">Blog not found.</p>;

  return (
    <div>
      <Seo
        title="DevThought | Details blog  "
        description="Explore all blog posts on various topics including tech, life, and tips. Stay informed with our latest posts."
      />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          Posted on {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <div className="my-4">
          <img
            className="w-[679px] h-[453px] rounded-2xl "
            src={blog.image}
            alt=""
          />
        </div>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
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
              <h1>{user?.user?.name || "Anonymous User"}</h1>
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
    </div>
  );
};

export default SingleBlog;
