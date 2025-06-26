import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import img from "../assets/user-profile-icon-free-vector.jpg";
import CommentForm from "../components/blog/CommentForm.jsx";
import CommentItem from "../components/blog/CommentItem.jsx";
import DOMPurify from "dompurify";
import { useQueryClient } from "@tanstack/react-query";
import RecommndedBlogs from "../components/blog/RecommndedBlogs.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import Seo from "../components/Seo.jsx";
import {
  UseCreateBlogComment,
  UseFetchBlogById,
} from "./../Features/blog/blogQuery";
import { UseCurrentUser } from "../Features/users/userQuery.js";
import { postcomment } from "../Features/blog/blogAPI.js";
import { extractHeadingsFromHTML } from "../utils/extractHeadings.js";

const SingleBlog = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data: blog, isLoading, isError, refetch } = UseFetchBlogById(id);
  const { data: user } = UseCurrentUser();
const navigate = useNavigate();
  const [inputData, setInputData] = useState("");
  const [submitting, setSubmitting] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user?.user) {
    navigate("/login"); // Redirect to login if not logged in
    return;
  }

  if (!inputData.trim()) return;

  try {
    setSubmitting(true);
    await postcomment(id, inputData);
    setInputData("");
    await refetch();
    queryClient.invalidateQueries({ queryKey: ["blog", id] });
  } catch (error) {
    console.error("Error adding comment:", error);
  } finally {
    setSubmitting(false);
  }
};


  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-center mt-10">Blog not found.</p>;

  // Extract table of contents
  const sanitizedContent = DOMPurify.sanitize(blog.content);
  const { toc, htmlWithIds } = extractHeadingsFromHTML(sanitizedContent);

  return (
    <div>
      <Seo
        title="DevThought | Details blog"
        description="Explore all blog posts on various topics including tech, life, and tips. Stay informed with our latest posts."
      />
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="bg-white lg:col-span-2 px-4 py-8 rounded-xl shadow-sm">
          <div className="my-4 space-y-3">
            <h1 className="lg:text-3xl font-bold mb-2">{blog.title}</h1>
            <p className="lg:text-sm text-xs mb-4 text-blue-400 font-medium">
              Posted on {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="my-4 pt-4">
            <img
              className="w-full  object-cover rounded-2xl"
              src={blog.image}
              alt="Blog Banner"
            />
          </div>

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlWithIds }}
          />

          <hr className="my-10 border-gray-200" />

          {/* Comments Section */}
          <div>
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
               disabled={!user?.user}
            />
            <hr className="my-10 border-gray-200" />
            {blog.comments
              ?.slice()
              .reverse()
              .map((comment, index) => (
                <CommentItem key={index} comment={comment} />
              ))}
          </div>

          <hr className="my-10 border-gray-200" />
          <h1 className="text-3xl font-semibold py-4">Recommended Blog</h1>
          <RecommndedBlogs blogId={id} key={id} />
        </div>

        {/* Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">
                Table Of Contents
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                {toc.map(({ id, text }) => (
                  <li key={id}>
                    <a href={`#${id}`} className="hover:underline">
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default SingleBlog;
