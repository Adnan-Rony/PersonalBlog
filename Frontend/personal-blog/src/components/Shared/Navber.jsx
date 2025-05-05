import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Authcontext } from "../../context/AuthProvider.jsx";
import { USER_API_END_POINT } from "../../utils/Constant.js";

const Navber = () => {
  const { Firebaseuser, Firebaselogout } = useContext(Authcontext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch manual login user from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${USER_API_END_POINT}/me`, {
          withCredentials: true,
        });

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(
          "Error fetching user:",
          error.response?.data || error.message
        );
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // Logout Handler
  const logoutHandler = async () => {
    try {
      if (Firebaseuser) {
        await Firebaselogout(); // Firebase logout
      } else {
        await axios.get(`${USER_API_END_POINT}/logout`, {
          withCredentials: true,
        });
      }
      setUser(null); // Clear manual login user
      navigate("/login"); // Redirect to login page
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error(
        "Error logging out:",
        error.response?.data || error.message
      );
      toast.error("Logout failed");
    }
  };

  // Combine both users into one variable
  const currentUser = user || Firebaseuser;

  return (
    <div>
      <div className="navbar bg-base-100  max-w-screen-xl mx-auto">
        <div className="flex-1 space-x-2">
          <Link to="/" className="btn btn-ghost text-xl">
            BlogSite
          </Link>
          <input
            type="text"
            placeholder="Search"
            className="input lg:w-2/6 w-28 border-none bg-gray-100"
          />
          <Link to="/blog">Write</Link>
          <Link to="/allblogs">AllBlogs</Link>
        </div>

        <div className="flex gap-2 items-center">
          {/* Show user name if logged in */}
          {currentUser && (
            <small className="font-semibold">
              {currentUser.displayName || currentUser.name || currentUser.email}
            </small>
          )}

          {/* If logged in */}
          {currentUser ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile"
                    src={
                      currentUser?.photoURL
                        ? currentUser.photoURL
                        : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    className="object-cover"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
                <li>
                  <button onClick={logoutHandler} className="text-left w-full">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            // If not logged in
            <Link
              to="/login"
              className="bg-black  text-white px-4 py-2 rounded"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navber;
