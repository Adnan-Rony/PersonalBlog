import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import {
  UseFetchBlogById,
  UseLikeBlog,
  UseUnlikeBlog,
} from "../Features/blog/blogQuery";
import { UseCurrentUser } from "../Features/users/userQuery.js";
import Seo from "../components/Seo.jsx";
import CommentForm from "../components/blog/CommentForm.jsx";
import CommentItem from "../components/blog/CommentItem.jsx";
import SingleBlogSkeleton from "../components/loader/SingleBlogSkeleton.jsx";
import { postcomment } from "../Features/blog/blogAPI.js";
import { extractHeadingsFromHTML } from "../utils/extractHeadings.js";
import RecommndedBlogs from "../components/blog/RecommndedBlogs.jsx";

const SingleBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: blog, isLoading, isError, refetch } =
    UseFetchBlogById(id);
  const { data: userData } = UseCurrentUser();

  const [inputData, setInputData] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const { mutate: likeBlog } = UseLikeBlog();
  const { mutate: unlikeBlog } = UseUnlikeBlog();

  useEffect(() => {
    if (blog && userData?.user) {
      const uid = userData.user._id.toString();
      setLiked(blog.likes.map((l) => l.toString()).includes(uid));
      setLikeCount(blog.likes.length);
    }
  }, [blog, userData]);

  const handleLikeToggle = () => {
    if (!userData?.user) return navigate("/login");

    if (liked) {
      unlikeBlog({ id }, {
        onSuccess: () => {
          setLiked(false);
          setLikeCount((p) => p - 1);
          queryClient.invalidateQueries({ queryKey: ["blog", id] });
        },
      });
    } else {
      likeBlog({ id }, {
        onSuccess: () => {
          setLiked(true);
          setLikeCount((p) => p + 1);
          queryClient.invalidateQueries({ queryKey: ["blog", id] });
        },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData?.user) return navigate("/login");
    if (!inputData.trim()) return;

    setSubmitting(true);
    try {
      await postcomment(id, inputData);
      setInputData("");
      await refetch();
      queryClient.invalidateQueries({ queryKey: ["blog", id] });
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <SingleBlogSkeleton />;
  if (isError)
    return (
      <div className="bg-[var(--bg)] min-h-[60vh] flex items-center justify-center text-[#9898a8]">
        Blog not found.
      </div>
    );

  const sanitized = DOMPurify.sanitize(blog.content);
  const { toc, htmlWithIds } = extractHeadingsFromHTML(sanitized);
  const readTime = Math.max(
    1,
    Math.ceil(
      sanitized.replace(/<[^>]+>/g, "").split(" ").length / 200
    )
  );

  const user = userData?.user;

  return (
    <div className="bg-[var(--bg)] min-h-screen">
      <Seo title={blog.title} />

      {/* Floating Like */}
      <div className="hidden lg:flex fixed left-5 top-[38%] flex-col items-center gap-2 z-50">
        <button
          onClick={handleLikeToggle}
          className={`w-11 h-11 rounded-full border backdrop-blur-lg transition
            ${liked
              ? "border-orange-500/50 bg-orange-500/15 text-orange-500"
              : "border-white/10 bg-black/60 text-gray-400"}`}
        >
          ❤️
        </button>
        <span className="text-xs text-gray-400 font-semibold">
          {likeCount}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">

        {/* LEFT */}
        <div className="bg-[var(--bg2)] border border-white/10 rounded-2xl p-5 sm:p-8">

          {/* Meta */}
          <div className="flex flex-wrap gap-2 mb-4 text-xs text-gray-400">
            {blog.categories?.[0] && (
              <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 uppercase tracking-widest">
                {blog.categories[0]}
              </span>
            )}
            <span>{readTime} min read</span>
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f1f1f5] mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Author */}
          <div className="flex justify-between items-center flex-wrap gap-3 bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold">
                {blog.author?.name?.charAt(0) || "A"}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  {blog.author?.name || "Anonymous"}
                </div>
                <div className="text-xs text-gray-400">
                  {readTime} min read
                </div>
              </div>
            </div>

            {/* Mobile like */}
            <button
              onClick={handleLikeToggle}
              className={`lg:hidden px-4 py-2 rounded-full text-sm border transition
                ${liked
                  ? "border-orange-500 bg-orange-500/10 text-orange-400"
                  : "border-white/10 text-gray-400"}`}
            >
              ❤️ {likeCount}
            </button>
          </div>

          {/* Image */}
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full max-h-[400px] object-cover rounded-xl mb-6 border border-white/10"
            />
          )}

          {/* CONTENT (FIXED READABILITY) */}
          <div
            className="prose prose-lg max-w-none leading-relaxed
              prose-p:text-[#cfcfd6]
              prose-headings:text-[#f1f1f5]
              prose-h3:text-orange-400
              prose-strong:text-white
              prose-a:text-orange-400 hover:prose-a:text-orange-300
              prose-code:text-yellow-300
              prose-pre:bg-[#0a0a12]
              prose-pre:text-gray-200
              prose-blockquote:text-gray-400
              prose-li:text-[#cfcfd6]
              prose-hr:border-white/10"
            dangerouslySetInnerHTML={{ __html: htmlWithIds }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            {blog.tags?.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-400"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Comments */}
          <div className="mt-10">
            <h2 className="text-lg font-bold text-white mb-4">
              Responses ({blog.comments.length})
            </h2>

            <CommentForm
              inputData={inputData}
              onChange={(e) => setInputData(e.target.value)}
              onSubmit={handleSubmit}
              submitting={submitting}
              disabled={!user}
            />

            <div className="mt-6 space-y-3">
              {blog.comments?.slice().reverse().map((c, i) => (
                <CommentItem key={i} comment={c} />
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 my-10" />

          <RecommndedBlogs blogId={id} />
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="hidden lg:block sticky top-24 space-y-4">

          {/* TOC */}
          {toc.length > 0 && (
            <div className="bg-[var(--bg2)] border border-white/10 rounded-xl p-5">
              <h3 className="text-xs uppercase tracking-widest text-white mb-3">
                Contents
              </h3>

              <ul className="space-y-2">
                {toc.map(({ id, text }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="text-sm text-gray-400 border-l-2 border-white/10 pl-3 hover:text-orange-400 hover:border-orange-400 transition"
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Meta */}
          <div className="bg-[var(--bg2)] border border-white/10 rounded-xl p-5">
            <h3 className="text-xs uppercase tracking-widest text-white mb-3">
              About this post
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">📅 Published</span>
                <span className="text-white">{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">⏱ Read</span>
                <span className="text-white">{readTime} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">💬 Comments</span>
                <span className="text-white">{blog.comments.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">❤️ Likes</span>
                <span className="text-white">{likeCount}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SingleBlog;