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
  const [newImageFile, setNewImageFile] = useState(null); // Track if new image is selected

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getMyBlogsbyid(blogId);
        const blog = response.data;
        setTitle(blog.title);
        setContent(blog.content);
        setImage(blog.image);
        setCategory(blog.categories.join(", "));
        setTags(blog.tags.join(", "));
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to load blog data.");
      }
    };
    fetchBlog();
  }, [blogId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      setImage(URL.createObjectURL(file)); // Preview the new image
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "blogging"); // Your preset
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dnpycgwch/image/upload", // Replace with your Cloud name
        formData
      );
      return res.data.secure_url;
    } catch (err) {
      toast.error("Image upload failed");
      throw err;
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImage = image;

      // If a new image is selected, upload it
      if (newImageFile) {
        finalImage = await uploadToCloudinary(newImageFile);
      }

      const updatedBlog = {
        title,
        content,
        image: finalImage,
        categories: category.split(",").map((cat) => cat.trim()),
        tags: tags.split(",").map((tag) => tag.trim()),
      };

      const res = await editblog(blogId, updatedBlog);

      if (res.status === 200) {
        toast.success("Blog updated successfully!");
        navigate(`/blogs/${blogId}`);
      } else {
        toast.error("Failed to update blog.");
      }
    } catch (err) {
      console.error("Error updating blog:", err);
      toast.error("Error updating blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 space-y-5 p-4 max-w-screen-xl mx-auto h-screen">
      <Seo
        title="DevThought | Update Blog"
        description="Edit your blog post and update its content, image, and more."
      />

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Blog Title"
      />

      {/* Image Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full file-input file-input-primary"
      />

      {/* Show Uploaded Image Preview */}
      {image && (
        <img
          src={image}
          alt="Preview"
          className="w-full max-w-md h-auto rounded-md border object-cover sm:max-w-xs"
        />
      )}

      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        className="bg-white mb-10"
        placeholder="Update your blog content..."
      />

      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Category"
      />

      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Tags (comma separated)"
      />

      <button
        onClick={handleUpdate}
        className="bg-black text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Saving..." : "Update Blog"}
      </button>
    </div>
  );
};

export default BlogEditorUpdate;
