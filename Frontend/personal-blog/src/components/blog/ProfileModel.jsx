import React, { useState } from "react";

import { userprofileupdate } from "../../api/blogApi.js";
import { toast } from 'react-hot-toast';

const ProfileModel = ({ closeModal,userId, initialData}) =>{


    const [name, setName] = useState("Adnanory");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [profilePicture, setProfilePicture] = useState(""); // Optio

    const handleSubmit = async () => {
        const updatedData = { name, email, bio,profilePicture };
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
    <div>
      <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Profile information</h2>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/50"
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <button className="text-blue-600 hover:underline">
                  Update
                </button>
                <button className="text-red-600 hover:underline ml-2">
                  Remove
                </button>
                <p className="text-gray-500 text-sm">
                  Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels
                  per side
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name *
              </label>
              <input
              value={name}
              onChange={(e)=>setName(e.target.value)}
                type="text"
                defaultValue="Adnanory"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none "
              />
              <p className="text-gray-500 text-sm mt-1">9/60</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                email
              </label>
              <input
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
                type="email"
                placeholder="Add..."
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none "
              />
              <p className="text-gray-500 text-sm mt-1">0/14</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Short bio
              </label>
              <textarea
              value={bio}
              onChange={(e)=>setBio(e.target.value)}
                defaultValue=""
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none "
                rows="3"
              />
              <p className="text-gray-500 text-sm mt-1">98/160</p>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              onClick={closeModal}
              className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModel;
