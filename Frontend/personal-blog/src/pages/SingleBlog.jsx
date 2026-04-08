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
import defaultAvatar from "../assets/user-profile-icon-free-vector.jpg";
import RecommndedBlogs from "../components/blog/RecommndedBlogs.jsx";

const SingleBlog = () => {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const queryClient  = useQueryClient();

  const { data: blog, isLoading, isError, refetch } = UseFetchBlogById(id);
  const { data: userData } = UseCurrentUser();

  const [inputData,  setInputData]  = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [liked,      setLiked]      = useState(false);
  const [likeCount,  setLikeCount]  = useState(0);

  const { mutate: likeBlog }   = UseLikeBlog();
  const { mutate: unlikeBlog } = UseUnlikeBlog();

  useEffect(() => {
    if (blog && userData?.user) {
      const uid = userData.user._id.toString();
      setLiked(blog.likes.map(l => l.toString()).includes(uid));
      setLikeCount(blog.likes.length);
    }
  }, [blog, userData]);

  const handleLikeToggle = () => {
    if (!userData?.user) return navigate("/login");
    if (liked) {
      unlikeBlog({ id }, { onSuccess: () => { setLiked(false); setLikeCount(p => p - 1); queryClient.invalidateQueries({ queryKey: ["blog", id] }); } });
    } else {
      likeBlog(  { id }, { onSuccess: () => { setLiked(true);  setLikeCount(p => p + 1); queryClient.invalidateQueries({ queryKey: ["blog", id] }); } });
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
  if (isError)   return (
    <div style={{ background: "var(--bg)", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#9898a8" }}>Blog not found.</p>
    </div>
  );

  const sanitized = DOMPurify.sanitize(blog.content);
  const { toc, htmlWithIds } = extractHeadingsFromHTML(sanitized);
  const readTime = Math.max(1, Math.ceil(sanitized.replace(/<[^>]+>/g, "").split(" ").length / 200));

  const user = userData?.user;

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Seo title={blog.title} />

      {/* ── Floating like button (desktop) ── */}
      <div className="hidden lg:flex" style={{ flexDirection: "column", alignItems: "center", gap: 6, position: "fixed", left: 20, top: "38%", zIndex: 50 }}>
        <button
          onClick={handleLikeToggle}
          style={{
            width: 44, height: 44, borderRadius: "50%",
            border: liked ? "1px solid rgba(249,115,22,0.5)" : "1px solid rgba(255,255,255,0.1)",
            background: liked ? "rgba(249,115,22,0.15)" : "rgba(14,14,26,0.8)",
            color: liked ? "#f97316" : "#6b6b80",
            fontSize: "1.1rem", cursor: "pointer", transition: "all 0.2s",
            backdropFilter: "blur(12px)",
          }}
        >
          ❤️
        </button>
        <span style={{ fontSize: "0.78rem", color: "#9898a8", fontFamily: "'Syne',sans-serif", fontWeight: 600 }}>{likeCount}</span>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px", display: "grid", gridTemplateColumns: "1fr 300px", gap: 28, alignItems: "start" }} className="lg:grid-cols-[1fr_300px] grid-cols-1">

        {/* ── LEFT: main content ── */}
        <div style={{ background: "var(--bg2)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "32px 36px" }} className="sm:p-8">

          {/* Category + read time */}
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 18, flexWrap: "wrap" }}>
            {blog.categories?.length > 0 && (
              <span style={{ fontSize: "0.68rem", fontWeight: 600, padding: "3px 11px", borderRadius: 100, background: "rgba(249,115,22,0.12)", color: "#f97316", border: "1px solid rgba(249,115,22,0.25)", fontFamily: "'Syne',sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {blog.categories[0]}
              </span>
            )}
            <span style={{ fontSize: "0.75rem", color: "#6b6b80" }}>{readTime} min read</span>
            <span style={{ fontSize: "0.75rem", color: "#6b6b80" }}>
              {new Date(blog.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,3vw,2.4rem)", lineHeight: 1.2, color: "#e8e6e1", margin: "0 0 24px" }}>
            {blog.title}
          </h1>

          {/* Author bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "14px 18px", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#f97316,#ea580c)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1rem", color: "#fff", flexShrink: 0 }}>
                {blog.author?.name?.charAt(0) || "A"}
              </div>
              <div>
                <div style={{ fontWeight: 600, color: "#e8e6e1", fontSize: "0.9rem" }}>{blog.author?.name || "Anonymous"}</div>
                <div style={{ fontSize: "0.75rem", color: "#6b6b80" }}>
                  {new Date(blog.createdAt).toDateString()} · {readTime} min read
                </div>
              </div>
            </div>
            {/* Mobile like */}
            <button
              onClick={handleLikeToggle}
              className="lg:hidden"
              style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 16px", borderRadius: 100, border: liked ? "1px solid rgba(249,115,22,0.4)" : "1px solid rgba(255,255,255,0.1)", background: liked ? "rgba(249,115,22,0.12)" : "transparent", color: liked ? "#f97316" : "#9898a8", cursor: "pointer", fontSize: "0.82rem", transition: "all 0.2s" }}
            >
              ❤️ {likeCount}
            </button>
          </div>

          {/* Banner image */}
          {blog.image && (
            <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 32, border: "1px solid rgba(255,255,255,0.07)" }}>
              <img src={blog.image} alt={blog.title} style={{ width: "100%", maxHeight: 420, objectFit: "cover", display: "block" }} />
            </div>
          )}

          {/* ── Blog content — dark prose ── */}
          <style>{`
            .dark-prose { color: #c8c6c0; line-height: 1.85; font-size: 1rem; }
            .dark-prose h1,.dark-prose h2,.dark-prose h3,.dark-prose h4 {
              color: #e8e6e1; font-family:'Syne',sans-serif; font-weight:700;
              margin-top:2em; margin-bottom:0.6em; line-height:1.25;
            }
            .dark-prose h1 { font-size:1.8rem; }
            .dark-prose h2 { font-size:1.45rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.4em; }
            .dark-prose h3 { font-size:1.2rem; color:#f97316; }
            .dark-prose p  { margin-bottom:1.2em; color:#c8c6c0; }
            .dark-prose a  { color:#f97316; text-decoration:underline; text-decoration-color:rgba(249,115,22,0.4); }
            .dark-prose a:hover { color:#fb923c; }
            .dark-prose ul,.dark-prose ol { padding-left:1.5em; margin-bottom:1.2em; }
            .dark-prose li { color:#c8c6c0; margin-bottom:0.4em; }
            .dark-prose blockquote {
              border-left:3px solid #f97316; margin:1.5em 0;
              padding:0.8em 1.2em; background:rgba(249,115,22,0.06);
              border-radius:0 10px 10px 0; color:#9898a8; font-style:italic;
            }
            .dark-prose code {
              background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.1);
              color:#fbbf24; padding:2px 7px; border-radius:5px;
              font-size:0.88em; font-family:monospace;
            }
            .dark-prose pre {
              background:#0a0a12; border:1px solid rgba(255,255,255,0.1);
              border-radius:12px; padding:20px; overflow-x:auto; margin-bottom:1.5em;
            }
            .dark-prose pre code { background:none; border:none; color:#e8e6e1; padding:0; font-size:0.9em; }
            .dark-prose img { border-radius:10px; border:1px solid rgba(255,255,255,0.08); max-width:100%; }
            .dark-prose strong { color:#e8e6e1; font-weight:600; }
            .dark-prose table { width:100%; border-collapse:collapse; margin-bottom:1.5em; }
            .dark-prose th { background:rgba(249,115,22,0.1); color:#f97316; padding:10px 14px; text-align:left; border:1px solid rgba(255,255,255,0.08); font-family:'Syne',sans-serif; font-size:0.82rem; }
            .dark-prose td { padding:10px 14px; border:1px solid rgba(255,255,255,0.07); color:#c8c6c0; font-size:0.9rem; }
            .dark-prose tr:nth-child(even) td { background:rgba(255,255,255,0.02); }
            .dark-prose hr { border:none; border-top:1px solid rgba(255,255,255,0.08); margin:2em 0; }
          `}</style>

          <div
            className="dark-prose"
            dangerouslySetInnerHTML={{ __html: htmlWithIds }}
          />

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", margin: "40px 0" }} />

          {/* ── Tags ── */}
          {blog.tags?.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
              {blog.tags.map((tag, i) => (
                <span key={i} style={{ padding: "5px 13px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 100, fontSize: "0.75rem", color: "#9898a8" }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* ── Comments ── */}
          <div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#e8e6e1", marginBottom: 20 }}>
              Responses <span style={{ color: "#6b6b80", fontWeight: 400, fontSize: "1rem" }}>({blog.comments.length})</span>
            </h2>

            {/* Current user row */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              {user?.profilePicture ? (
                <img src={user.profilePicture} style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(255,255,255,0.1)" }} alt="" />
              ) : (
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#f97316,#ea580c)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#fff" }}>
                  {user?.name?.charAt(0).toUpperCase() || "?"}
                </div>
              )}
              <span style={{ color: "#9898a8", fontSize: "0.85rem" }}>{user?.name || "Sign in to comment"}</span>
            </div>

            <CommentForm
              inputData={inputData}
              onChange={e => setInputData(e.target.value)}
              onSubmit={handleSubmit}
              submitting={submitting}
              disabled={!user}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 24 }}>
              {blog.comments?.slice().reverse().map((comment, i) => (
                <CommentItem key={i} comment={comment} />
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", margin: "40px 0" }} />

          {/* ── Recommended ── */}
          <RecommndedBlogs blogId={id} />
        </div>

        {/* ── RIGHT: sticky sidebar ── */}
        <div className="hidden lg:block" style={{ position: "sticky", top: 90 }}>
          {/* Table of contents */}
          {toc.length > 0 && (
            <div style={{ background: "var(--bg2)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "20px 22px", marginBottom: 16 }}>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#e8e6e1", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
                Contents
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {toc.map(({ id, text }) => (
                  <li key={id}>
                    <a href={`#${id}`} style={{ display: "block", fontSize: "0.82rem", color: "#6b6b80", textDecoration: "none", padding: "4px 0", borderLeft: "2px solid rgba(255,255,255,0.07)", paddingLeft: 10, transition: "color 0.2s, border-color 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.color = "#f97316"; e.currentTarget.style.borderLeftColor = "#f97316"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "#6b6b80"; e.currentTarget.style.borderLeftColor = "rgba(255,255,255,0.07)"; }}
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Blog meta card */}
          <div style={{ background: "var(--bg2)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "20px 22px" }}>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#e8e6e1", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
              About this post
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["📅 Published", new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })],
                ["⏱ Read time", `${readTime} min`],
                ["💬 Comments", blog.comments.length],
                ["❤️ Likes",    likeCount],
              ].map(([label, val]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem" }}>
                  <span style={{ color: "#6b6b80" }}>{label}</span>
                  <span style={{ color: "#e8e6e1", fontFamily: "'Syne',sans-serif", fontWeight: 600 }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SingleBlog;
