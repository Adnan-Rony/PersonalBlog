import React, { useEffect, useState } from "react";
import { getMyBlogs, getuser } from "../api/blogApi.js";

import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import LeftBlogsection from "../components/Profile/LeftBlogsection.jsx";
import AboutProfile from "../components/blog/AboutProfile.jsx";
import ProfileModel from '../components/blog/ProfileModel.jsx';


const ProfileInfo = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setuser] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchmyBlogs = async () => {
      try {
        const [myblogresponse, userResponse] = await Promise.all([
          getMyBlogs(),
          getuser(),
        ]);

        setBlogs(myblogresponse.data);
        setuser(userResponse.data);
      } catch (err) {
        console.log("error fatching", err);
      } finally {
        setLoading(false);
      }
    };
    fetchmyBlogs();
  }, []);

  if (loading) return <p>Loading your blogs...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Blog Section */}
      <div className="md:col-span-2 space-y-8 ">
        {/* Blog Post 1 */}

        {/* name of each tab group should be unique */}
        <div className="tabs tabs-lift">
          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="Home"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <LeftBlogsection props={blogs}></LeftBlogsection>
          </div>

          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="about"
            defaultChecked
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
           <AboutProfile></AboutProfile>
          </div>
        </div>
      </div>

      {/* Right: Profile Sidebar */}
      <div className="md:col-span-1 ">
        {user && (
          <div>
            <img
              src="https://source.unsplash.com/80x80/?person"
              alt="Profile"
              className="w-20 h-20 rounded-full mx-auto"
            />
            <h3 className="mt-4 text-xl font-semibold">{user.user.name}</h3>
            <p className="text-gray-500 text-sm">6 followers</p>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              Junior Web developer | NextJs | React | JavaScript | Node Js |
              MongoDB | Express Js | Tailwind CSS
            </p>


            <button onClick={openModal}
              
              className="text-green-600 font-medium text-sm mt-3 inline-block"
            >
              Edit profile
            </button>
            {isModalOpen && <ProfileModel closeModal={closeModal} />}





          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
