import React, { useState, useEffect, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import Quill from "quill";

import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import axiosInstance from '../api/axiosInstance.js';
import { createBlog } from "../api/blogApi.js";

Quill.register("modules/imageUploader", ImageUploader);

const BlogEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();



  // Toolbar options for ReactQuill
  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    ["link", "image"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  // Memoize Quill modules to prevent re-creation
  const quillModules = useMemo(
    () => ({
      toolbar: toolbarOptions,
      imageUploader: {
        upload: async (file) => {
          const formData = new FormData();
          formData.append("image", file);
          const response = await axiosInstance.post("/uploads", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.url;
        },
      },
    }),
    []
  );

  const handleFinalPost = async (e) => {
    e.preventDefault();

    const blogData={
      title,
      content,
      categories: category,
      tags: tags.split(",").map((tag) => tag.trim()),
    }

    try {
      const response = await createBlog(blogData)

      if (response.status === 201 || response.status === 200) {
        toast.success("Blog posted successfully!");
        setTitle("");
        setContent("");
        setCategory("");
        setTags("");
        setShowModal(false);
        navigate("/");
      } else {
        toast.error("Server did not return success status.");
      }
    } catch (error) {
      console.error("Error posting blog:", error.response?.data || error.message);
      toast.error("Failed to post blog.");
    }
  };

  return (
    <div className="my-4 space-y-3 p-4 relative z-10">
      <input
        type="text"
        placeholder="Blog Title"
        className="w-full p-2 border border-gray-300 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <div className="quill-container">
        <ReactQuill
          theme="snow"
          value={content}
          modules={quillModules}
          onChange={(value) => setContent(value)}
          className="bg-white mb-10 "
          placeholder="Write your blog content here..."
        />
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="bg-black text-white btn btn-outline rounded-2xl"
      >
        Publish
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0   bg-opacity-30 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          onKeyDown={(e) => e.key === "Escape" && setShowModal(false)}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4 relative">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Add Category & Tags</h3>
              <button onClick={() => setShowModal(false)}>
                <RxCross1 />
              </button>
            </div>

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <p>Add or change tags (up to 5) so readers know what your story is about</p>
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleFinalPost}
                className="bg-black text-white btn btn-outline rounded-2xl"
              >
                Publish and send now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogEditor;