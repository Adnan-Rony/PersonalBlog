import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { userprofileupdate } from "../../Features/users/userAPI.js";
import axios from "axios";

const ProfileModel = ({ closeModal, userId, initialData }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [bio, setBio] = useState(initialData?.bio || "");
  const [profilePicture, setProfilePicture] = useState(initialData?.profilePicture || "");
  const [image, setImage] = useState("");

  const handleSubmit = async () => {
    if (!name || !profilePicture) {
      toast.error("Name and profile picture are required.");
      return;
    }

    const updatedData = { name, email, bio, profilePicture };

    try {
      const response = await userprofileupdate(userId, updatedData);
      toast.success(response.data.message || "Profile updated");
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "blogging"); // Replace with your actual preset

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dnpycgwch/image/upload", // Replace with your actual cloud name
        formData
      );
      const imageUrl = res.data.secure_url;
      setImage(imageUrl);
      setProfilePicture(imageUrl); // ✅ Important: set for saving
      toast.success("Image uploaded!");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Image upload failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            &times;
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Image Upload */}
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="file-input file-input-bordered w-full"
            />
            <div>
              {(image || profilePicture) && (
                <img
                  src={image || profilePicture}
                  alt="Profile preview"
                  className="w-20 h-20 object-cover rounded-full border"
                />
              )}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your name"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Your email"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Short Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself"
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            ></textarea>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={closeModal}
            className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name || !profilePicture}
            className="px-4 py-2 bg-black text-white rounded-full hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModel;
