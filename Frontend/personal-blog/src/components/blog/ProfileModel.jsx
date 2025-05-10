import React, { useState } from "react";
import img from "../../assets/user-profile-icon-free-vector.jpg";
import { userprofileupdate } from "../../api/blogApi.js";
import { toast } from "react-hot-toast";

const ProfileModel = ({ closeModal, userId, initialData }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [bio, setBio] = useState(initialData?.bio || "");
  const [profilePicture, setProfilePicture] = useState(initialData?.profilePicture || "");
  const [showImageInput, setShowImageInput] = useState(false);

  const handleSubmit = async () => {
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

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Profile Information</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-xl">
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={profilePicture || img}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setShowImageInput(true)}
              >
                Update
              </button>
              <p className="text-gray-500 text-sm">
                Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side
              </p>
              {showImageInput && (
                <input
                  type="text"
                  placeholder="Paste image URL"
                  value={profilePicture}
                  onChange={(e) => setProfilePicture(e.target.value)}
                  className="mt-2 block w-full border border-gray-300 rounded-md p-2"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Name *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your name"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Your email"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Short Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none"
              rows="3"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={closeModal}
            className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-black text-white rounded-full hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModel;
