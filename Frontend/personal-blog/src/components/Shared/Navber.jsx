import axios from "axios";
import React, { use, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Authcontext } from "../../context/AuthProvider.jsx";
import { USER_API_END_POINT } from "../../utils/Constant.js";
import axiosInstance from "../../api/axiosInstance.js";

const Navber = () => {
  const { Firebaseuser, Firebaselogout } = useContext(Authcontext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
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

  //search bar functionality
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query) {
        
        setSuggestions([]);
        return;
      }
      try {
        
        const res = await axiosInstance.get(`/blogs/search?query=${query}`);
        setSuggestions(res.data);
        setShowDropdown(true);
      } catch (error) {
        console.error("Search error:", error);
        setSuggestions([]);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 300); // debounce
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (blogId) => {
    navigate(`/blogs/${blogId}`);
    setQuery("");
    setSuggestions([]);
    setShowDropdown(false);
  };
  return (
    <div>
     <div className="navbar bg-base-100 max-w-screen-xl mx-auto px-4">
      <div className="flex items-center justify-between w-full flex-nowrap">
        {/* Left Section: BlogSite, Search, Write */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="btn btn-ghost text-xl">
            BlogSite
          </Link>
          <div className="relative w-64">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                if (query.length > 0 && suggestions.length > 0) setShowDropdown(true);
              }}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              placeholder="Search blogs..."
              className="input input-bordered w-full px-4 py-2 rounded"
            />
            {showDropdown && suggestions.length > 0 && (
              <ul
                role="listbox"
                className="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-50"
              >
                {suggestions.map((blog) => (
                  <li
                    key={blog._id}
                    role="option"
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelect(blog._id)}
                  >
                    {blog.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link to="/blog" className="btn btn-ghost">
            Write
          </Link>
        </div>

        {/* Right Section: Profile or Get Started */}
        <div className="flex items-center gap-2">
          {currentUser ? (
            <>
              <small className="font-semibold hidden md:block">
                {currentUser.displayName || currentUser.name || currentUser.email}
              </small>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
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
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/profile">Profile</Link>
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
            </>
          ) : (
            <Link to="/login" className="btn btn-primary text-white px-4 py-2 rounded">
              Get Started
            </Link>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Navber;
