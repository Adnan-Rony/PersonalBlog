// src/pages/ProfileInfo.jsx
import React, { useEffect, useState } from "react";
import { getMyBlogs, getLoginuser } from "../api/blogApi.js";
import img from "../assets/user-profile-icon-free-vector.jpg";
import LeftBlogsection from "../components/Profile/LeftBlogsection.jsx";
import ProfileModel from "../components/blog/ProfileModel.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

const ProfileInfo = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [myBlogResponse, userResponse] = await Promise.all([
          getMyBlogs(),
          getLoginuser(),
        ]);
        setBlogs(myBlogResponse.data);
        setUser(userResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 h-screen">
       <Seo
      title="DevThought | Profile  "
      description="Explore all blog posts on various topics including tech, life, and tips. Stay informed with our latest posts."
    />
      
      
      
      {/* Left: Blog Section */}
      <div className="md:col-span-2 space-y-8">
        <LeftBlogsection blogs={blogs} setBlogs={setBlogs} />
      </div>

      {/* Right: Profile Sidebar */}
      <div className="md:col-span-1">
        {user && (
          <div>
            <img
              src={user.user.profilePicture || img}
              alt="Profile"
              className="w-10 h-10 rounded-full "
            />
            <h3 className="mt-4 text-xl font-semibold">{user.user.name}</h3>
            <p className="text-gray-500 text-sm">{user.user.email}</p>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              {user.user.bio}
            </p>
           <div className="flex items-center gap-2">
           <button
              onClick={openModal}
              className="text-green-600  font-medium text-sm mt-3 inline-block"
            >
              Edit profile
            </button>

            {/* ✅ Admin-only button */}
            {user.user.role === "admin" && (
              <Link to="/dashboard/admin">
                <button className="text-green-600 font-medium text-sm mt-3 inline-block">
                  Dashboard
                </button>
              </Link>
            )}
           </div>

            {isModalOpen && <ProfileModel closeModal={closeModal} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
