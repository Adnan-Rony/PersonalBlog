import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import axios from "axios";

import { editblog, getMyBlogsbyid } from "../api/blogApi.js";
import Seo from "../components/Seo.jsx";

const BlogEditorUpdate = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [newImageFile, setNewImageFile] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getMyBlogsbyid(blogId);
        const blog = res.data;

        setTitle(blog.title);
        setContent(blog.content);
        setImage(blog.image);
        setCategory(blog.categories.join(", "));
        setTags(blog.tags.join(", "));
      } catch {
        toast.error("Failed to load blog data.");
      }
    };
    fetchBlog();
  }, [blogId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "blogging");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dnpycgwch/image/upload",
      formData
    );

    return res.data.secure_url;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImage = image;

      if (newImageFile) {
        finalImage = await uploadToCloudinary(newImageFile);
      }

      const updatedBlog = {
        title,
        content,
        image: finalImage,
        categories: category.split(",").map((c) => c.trim()),
        tags: tags.split(",").map((t) => t.trim()),
      };

      const res = await editblog(blogId, updatedBlog);

      if (res.status === 200) {
        toast.success("Blog updated!");
        navigate(`/blogs/${blogId}`);
      }
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a12] text-white px-4 py-10">
      <Seo title="Update Blog" />

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">
            ✏️ Edit Blog
          </h1>
          <p className="text-gray-400 text-sm">
            Update your content professionally
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleUpdate}
          className="bg-[#11111c] border border-white/10 rounded-2xl p-5 md:p-8 space-y-6 shadow-xl"
        >

          {/* Title */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#0f0f18] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Cover Image
            </label>

            <label className="flex items-center justify-center h-40 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-orange-500 transition">
              <span className="text-gray-500 text-sm">
                Click to upload new image
              </span>
              <input
                type="file"
                hidden
                onChange={handleImageChange}
              />
            </label>

            {image && (
              <img
                src={image}
                alt="preview"
                className="mt-4 w-full h-52 object-cover rounded-lg border border-white/10"
              />
            )}
          </div>

          {/* Editor */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Content
            </label>

            <div className="bg-white rounded-xl overflow-hidden">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                className="h-60 md:h-80 text-black"
              />
            </div>
          </div>

          {/* Category + Tags */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Categories (comma separated)"
              className="w-full bg-[#0f0f18] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
            />

            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Tags (comma separated)"
              className="w-full bg-[#0f0f18] border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 transition font-semibold shadow-lg shadow-orange-500/20 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Blog 🚀"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default BlogEditorUpdate;