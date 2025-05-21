// src/pages/ProfileInfo.jsx
import React, { useEffect, useState } from "react";
import { getMyBlogs, getLoginuser } from "../api/blogApi.js";
import img from "../assets/user-1.jpg";
import LeftBlogsection from "../components/Profile/LeftBlogsection.jsx";
import ProfileModel from "../components/blog/ProfileModel.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { UseFetchMyBlog } from "../Features/blog/blogQuery.js";
import { UseCurrentUser } from "../Features/users/userQuery.js";

const ProfileInfo = () => {

  const{data: blogs = [], isLoading, isError}=UseFetchMyBlog()
  const{data: user, }=UseCurrentUser()

  
  


  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);



  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if(isError) return <p>Error fetch...</p>

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 h-screen">
       <Seo
      title="DevThought | Profile  "
      description="Explore all blog posts on various topics including tech, life, and tips. Stay informed with our latest posts."
    />
      
      
      
      {/* Left: Blog Section */}
      <div className="md:col-span-2 space-y-8">
        <LeftBlogsection blogs={blogs}  />
      </div>

      {/* Right: Profile Sidebar */}
     <div className="md:col-span-1 mt-4 bg-white rounded-xl shadow p-6 w-full flex flex-col items-center text-center">
  {user && (
    <>
      {/* Profile Image */}
      <img
        src={user.user.profilePicture || img}
        alt="Profile"
        loading="lazy"
        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
      />

      {/* Name */}
      <h3 className="mt-4 text-xl font-semibold text-gray-900">
        {user.user.name}
      </h3>

      {/* Email */}
      <p className="text-gray-500 text-sm">{user.user.email}</p>

      {/* Bio */}
      <p className="text-gray-600 text-sm mt-2 leading-relaxed">
        {user.user.bio || "No bio available."}
      </p>

      {/* Edit Profile Button */}
      <div className="mt-4">
        <button
          onClick={openModal}
          className="text-sm px-4 py-2 bg-blue-100 text-blue-600 rounded-full font-medium hover:bg-blue-200 transition"
        >
          Edit Profile
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && <ProfileModel closeModal={closeModal} />}
    </>
  )}
</div>

    </div>
  );
};

export default ProfileInfo;
