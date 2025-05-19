import React, { useState, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

import Seo from "../components/Seo.jsx";
import { UseCreateBlog } from "../Features/blog/blogQuery.js";

const BlogEditor = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");

  const { mutate: submitBlog, isLoading } = UseCreateBlog();

  // Whitelist fonts
  const Font = Quill.import("formats/font");
  Font.whitelist = ["sans-serif", "serif", "monospace"];
  Quill.register(Font, true);

  const quillModules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        ["bold", "italic", "underline"],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],

        [{ direction: "rtl" }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["clean"],
      ],
    }),
    []
  );

  const handleFinalPost = (e) => {
    e.preventDefault();

    const blogData = {
      title,
      content,
      categories: category,
      image,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    submitBlog(blogData, {
      onSuccess: () => {
        toast.success("Blog posted successfully!");
        setTitle("");
        setContent("");
        setCategory("");
        setTags("");
        setImage("");

        navigate("/");
      },
      onError: (error) => {
        console.error("Failed to post blog:", error);
        toast.error(error?.response?.data?.message || "Failed to post blog.");
      },
    });
  };

  return (
  <div className="my-4 space-y-5 p-4 max-w-screen-xl mx-auto">
  <Seo
    title="DevThought | Write Blog"
    description="Explore all blog posts on various topics including tech, life, and tips. Stay informed with our latest posts."
  />

  {/* Blog Title */}
  <input
    type="text"
    placeholder="Blog Title"
    className="w-full lg:p-3 p-2 border  border-gray-300 rounded-md text-base"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    required
  />

  {/* Image URL */}
  <input
    type="text"
    placeholder="Image URL"
    value={image}
    onChange={(e) => setImage(e.target.value)}
    className="w-full lg:p-3 p-2 border border-gray-300 rounded-md text-base"
  />

  {/* ReactQuill Editor */}
  <div className="relative">
    <ReactQuill
      theme="snow"
      value={content}
      modules={quillModules}
      onChange={(value) => setContent(value)}
      placeholder="Write your blog content here..."
      className="bg-white rounded-md lg:h-64 h-64 overflow-y-auto"
    />
  </div>

  {/* Category */}
  <input
    type="text"
    placeholder="Category"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full lg:p-3 p-2 border border-gray-300 rounded-md text-base"
  />

  {/* Tags */}
  <input
    type="text"
    placeholder="Tags (comma separated)"
    value={tags}
    onChange={(e) => setTags(e.target.value)}
    className="w-full lg:p-3 p-2 border border-gray-300 rounded-md text-base"
  />


  {/* Publish Button */}
  <div className="pt-3">
    <button
      onClick={handleFinalPost}
      disabled={isLoading}
      className="w-full md:w-auto bg-black text-white py-2 px-6 rounded-2xl hover:bg-gray-800 transition"
    >
      {isLoading ? "Publishing..." : "Publish"}
    </button>
  </div>
</div>

  );
};

export default BlogEditor;
