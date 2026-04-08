import React, { useState, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { UseCreateBlog } from "../Features/blog/blogQuery.js";
import axios from "axios";

/* ─── Quill dark-mode + font + animation overrides ─── */
const QuillDarkStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');

    * { font-family: 'Outfit', sans-serif; }

    .ql-toolbar.ql-snow {
      background: #0f1117 !important;
      border: 1px solid #1e2030 !important;
      border-bottom: none !important;
      border-radius: 12px 12px 0 0 !important;
      padding: 10px 14px !important;
    }
    .ql-container.ql-snow {
      background: #0a0d14 !important;
      border: 1px solid #1e2030 !important;
      border-top: none !important;
      border-radius: 0 0 12px 12px !important;
      min-height: 280px;
    }
    .ql-editor {
      color: #cdd6f4 !important;
      font-family: 'JetBrains Mono', monospace !important;
      font-size: 14.5px !important;
      line-height: 1.85 !important;
      padding: 22px 24px !important;
      min-height: 280px;
    }
    .ql-editor.ql-blank::before {
      color: #3d4166 !important;
      font-style: normal !important;
      font-family: 'JetBrains Mono', monospace !important;
      font-size: 14px !important;
    }
    .ql-toolbar .ql-stroke { stroke: #6c7086 !important; transition: stroke .15s; }
    .ql-toolbar .ql-fill   { fill: #6c7086 !important; transition: fill .15s; }
    .ql-toolbar button:hover .ql-stroke,
    .ql-toolbar button.ql-active .ql-stroke { stroke: #89b4fa !important; }
    .ql-toolbar button:hover .ql-fill,
    .ql-toolbar button.ql-active .ql-fill   { fill: #89b4fa !important; }
    .ql-toolbar .ql-picker-label            { color: #6c7086 !important; }
    .ql-toolbar .ql-picker-label:hover      { color: #89b4fa !important; }
    .ql-picker-options {
      background: #0f1117 !important;
      border: 1px solid #1e2030 !important;
      border-radius: 8px !important;
    }
    .ql-picker-item { color: #cdd6f4 !important; }
    .ql-picker-item:hover { color: #89b4fa !important; }
    .ql-editor blockquote {
      border-left: 3px solid #89b4fa !important;
      color: #7f849c !important;
      background: #0f1117 !important;
      padding: 10px 18px !important;
      border-radius: 0 8px 8px 0 !important;
      margin: 12px 0 !important;
    }
    .ql-editor pre.ql-syntax {
      background: #181825 !important;
      color: #cba6f7 !important;
      border-radius: 8px !important;
      font-family: 'JetBrains Mono', monospace !important;
    }
    .ql-editor h1, .ql-editor h2, .ql-editor h3 {
      color: #cdd6f4 !important;
      font-family: 'Outfit', sans-serif !important;
      font-weight: 700 !important;
    }
    .ql-snow .ql-tooltip {
      background: #0f1117 !important;
      border: 1px solid #1e2030 !important;
      color: #cdd6f4 !important;
      border-radius: 8px !important;
    }
    .ql-snow .ql-tooltip input[type=text] {
      background: #0a0d14 !important;
      border: 1px solid #1e2030 !important;
      color: #cdd6f4 !important;
      border-radius: 6px !important;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(137,180,250,0.25); }
      50%       { box-shadow: 0 0 0 8px rgba(137,180,250,0); }
    }

    .anim-0 { animation: fadeUp .4s .00s ease both; }
    .anim-1 { animation: fadeUp .4s .06s ease both; }
    .anim-2 { animation: fadeUp .4s .12s ease both; }
    .anim-3 { animation: fadeUp .4s .18s ease both; }
    .anim-4 { animation: fadeUp .4s .24s ease both; }
    .anim-5 { animation: fadeUp .4s .30s ease both; }
    .anim-6 { animation: fadeUp .4s .36s ease both; }

    .editor-input:focus {
      outline: none !important;
      border-color: #89b4fa !important;
      box-shadow: 0 0 0 3px rgba(137,180,250,.12) !important;
    }
    .upload-zone:hover {
      border-color: #89b4fa !important;
      background: #0f1117 !important;
    }
    .btn-draft:hover  { border-color: #89b4fa !important; color: #89b4fa !important; }
    .btn-publish:hover { opacity: .88; transform: translateY(-1px); }
    .btn-publish:active { transform: translateY(0) !important; }
    .btn-publish-loading { animation: glow 1.5s infinite; }
    .spinner { animation: spin .7s linear infinite; }
  `}</style>
);

const CATEGORIES = [
  "Web Development", "Portfolio", "Mobile Development", "Frontend",
  "Backend", "Full Stack", "DevOps", "APIs & Integration",
  "Programming Languages", "Open Source",
];

const BlogEditor = () => {
  const navigate = useNavigate();
  const [title, setTitle]         = useState("");
  const [content, setContent]     = useState("");
  const [category, setCategory]   = useState("");
  const [image, setImage]         = useState("");
  const [tags, setTags]           = useState("");
  const [uploading, setUploading] = useState(false);

  const { mutate: submitBlog, isLoading } = UseCreateBlog();

  const Font = Quill.import("formats/font");
  Font.whitelist = ["sans-serif", "serif", "monospace"];
  Quill.register(Font, true);

  const quillModules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ direction: "rtl" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  }), []);

  const wordCount = useMemo(() => {
    const text = content.replace(/<[^>]*>/g, "").trim();
    return text ? text.split(/\s+/).length : 0;
  }, [content]);

  const parsedTags = useMemo(
    () => tags.split(",").map((t) => t.trim()).filter(Boolean),
    [tags]
  );

  const handleFinalPost = (e) => {
    e.preventDefault();
    if (!title.trim())   { toast.error("Please add a title."); return; }
    if (!content.trim()) { toast.error("Please write some content."); return; }
    if (!category)       { toast.error("Please select a category."); return; }

    submitBlog(
      { title, content, categories: category, image, tags: parsedTags },
      {
        onSuccess: () => {
          toast.success("Published successfully!");
          setTitle(""); setContent(""); setCategory(""); setTags(""); setImage("");
          navigate("/");
        },
        onError: (err) =>
          toast.error(err?.response?.data?.message || "Failed to publish."),
      }
    );
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "blogging");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dnpycgwch/image/upload", fd
      );
      setImage(res.data.secure_url);
      toast.success("Cover uploaded!");
    } catch {
      toast.error("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06080f] text-[#cdd6f4]">
      <QuillDarkStyles />

      <Seo
        title="DevThought | Write Blog"
        description="Share your thoughts with the DevThought community."
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 pb-24">

        {/* ── HEADER ── */}
        <div className="anim-0 flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-7 border-b border-[#1e2030]">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase font-['JetBrains_Mono',monospace] text-[#89b4fa] mb-2">
              New Article
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight bg-gradient-to-br from-[#cdd6f4] via-[#b4befe] to-[#89b4fa] bg-clip-text text-transparent">
              Write Something Great
            </h1>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono px-3 py-1.5 rounded-full bg-[#0f1117] border border-[#1e2030] text-[#585b70]">
              {wordCount} words
            </span>
            <span className={`text-[11px] font-mono px-3 py-1.5 rounded-full bg-[#0f1117] border border-[#1e2030] transition-colors ${title.length > 130 ? "text-[#f38ba8]" : "text-[#585b70]"}`}>
              {title.length}/150
            </span>
          </div>
        </div>

        {/* ── TITLE ── */}
        <div className="anim-1 mb-6">
          <label className="block text-[11px] tracking-[0.18em] uppercase font-mono text-[#585b70] mb-2.5">
            Post Title
          </label>
          <input
            type="text"
            placeholder="What's your article about?"
            className="editor-input w-full bg-[#0a0d14] border border-[#1e2030] rounded-xl px-4 py-3.5 text-[#cdd6f4] text-[15px] placeholder-[#2e3050] transition-all duration-200"
            value={title}
            maxLength={150}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* ── COVER IMAGE ── */}
        <div className="anim-2 mb-6">
          <label className="block text-[11px] tracking-[0.18em] uppercase font-mono text-[#585b70] mb-2.5">
            Cover Image
          </label>

          {!image ? (
            <label className="upload-zone relative flex flex-col items-center justify-center gap-3 border-2 border-dashed border-[#1e2030] rounded-xl p-10 cursor-pointer bg-[#0a0d14] transition-all duration-200">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="sr-only"
              />
              <div className="w-12 h-12 rounded-full bg-[#0f1117] border border-[#1e2030] flex items-center justify-center">
                {uploading ? (
                  <span className="spinner w-5 h-5 border-2 border-[#1e2030] border-t-[#89b4fa] rounded-full block" />
                ) : (
                  <svg className="w-5 h-5 text-[#89b4fa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                )}
              </div>
              <div className="text-center">
                <p className="text-[13px] text-[#6c7086]">
                  {uploading ? (
                    <span className="text-[#89b4fa]">Uploading…</span>
                  ) : (
                    <>
                      <span className="text-[#89b4fa] font-semibold">Click to upload</span>{" "}or drag & drop
                    </>
                  )}
                </p>
                <p className="text-[11px] text-[#3d4166] mt-1 font-mono">PNG · JPG · WebP · Max 10MB</p>
              </div>
            </label>
          ) : (
            <div className="relative rounded-xl overflow-hidden border border-[#1e2030] bg-[#0a0d14]">
              <img src={image} alt="Cover preview" className="w-full max-h-56 object-cover block" />
              <span className="absolute top-3 right-3 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-black/60 border border-[#1e2030] text-[#a6e3a1] backdrop-blur-sm">
                ✓ Uploaded
              </span>
              <div className="px-4 py-2.5">
                <button
                  onClick={() => setImage("")}
                  className="text-[11px] font-mono text-[#f38ba8] hover:text-[#ff6b6b] transition-colors"
                >
                  ✕ Remove image
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── RICH TEXT EDITOR ── */}
        <div className="anim-3 mb-6">
          <label className="block text-[11px] tracking-[0.18em] uppercase font-mono text-[#585b70] mb-2.5">
            Content
          </label>
          <ReactQuill
            theme="snow"
            value={content}
            modules={quillModules}
            onChange={setContent}
            placeholder="Start writing your masterpiece…"
          />
        </div>

        {/* ── DIVIDER ── */}
        <div className="anim-4 h-px bg-gradient-to-r from-transparent via-[#1e2030] to-transparent my-8" />

        {/* ── CATEGORY + TAGS ── */}
        <div className="anim-4 grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          {/* Category */}
          <div>
            <label className="block text-[11px] tracking-[0.18em] uppercase font-mono text-[#585b70] mb-2.5">
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="editor-input w-full appearance-none bg-[#0a0d14] border border-[#1e2030] rounded-xl px-4 py-3.5 text-[15px] text-[#cdd6f4] cursor-pointer transition-all duration-200 pr-10"
              >
                <option value="">Select category…</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-[#0f1117]">{c}</option>
                ))}
              </select>
              <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#585b70] pointer-events-none"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-[11px] tracking-[0.18em] uppercase font-mono text-[#585b70] mb-2.5">
              Tags
            </label>
            <input
              type="text"
              placeholder="react, nodejs, tutorial…"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="editor-input w-full bg-[#0a0d14] border border-[#1e2030] rounded-xl px-4 py-3.5 text-[#cdd6f4] text-[15px] placeholder-[#2e3050] transition-all duration-200"
            />
          </div>
        </div>

        {/* ── TAG PILLS ── */}
        {parsedTags.length > 0 && (
          <div className="anim-5 flex flex-wrap gap-2 mb-8">
            {parsedTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#0f1117] border border-[#1e2030] text-[12px] font-mono text-[#89b4fa]"
              >
                <span className="text-[#3d4166]">#</span>{tag}
              </span>
            ))}
          </div>
        )}

        {/* ── FOOTER ACTIONS ── */}
        <div className="anim-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">

          {/* Left */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => toast("Draft saved")}
              className="btn-draft px-5 py-3 rounded-xl border border-[#1e2030] text-[#585b70] text-[13px] font-semibold tracking-wide transition-all duration-200"
            >
              Save Draft
            </button>
            {category && (
              <span className="hidden sm:block text-[11px] font-mono text-[#3d4166]">
                in <span className="text-[#89b4fa]">{category}</span>
              </span>
            )}
          </div>

          {/* Publish */}
          <button
            type="button"
            onClick={handleFinalPost}
            disabled={isLoading}
            className={` btn-orange flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl
              bg-gradient-to-r from-[#1e66f5] to-[#89b4fa]
              text-white font-bold text-[14px] tracking-wide
              transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed
              ${isLoading ? "btn-publish-loading" : ""}
            `}
          >
            {isLoading ? (
              <>
                <span className="spinner w-4 h-4 border-2 border-white/30 border-t-white rounded-full block" />
                Publishing…
              </>
            ) : (
              <>
                Publish Post
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
};

export default BlogEditor;