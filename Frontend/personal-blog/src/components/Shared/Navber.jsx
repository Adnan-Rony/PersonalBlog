import axios from "axios";
import React, { useContext, useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Authcontext } from "../../context/AuthProvider.jsx";
import { USER_API_END_POINT } from "../../utils/Constant.js";
import axiosInstance from "../../api/axiosInstance.js";
import { Search } from "lucide-react";
import img from "../../assets/user-profile-icon-free-vector.jpg";

const Navber = () => {
  const { Firebaseuser, Firebaselogout } = useContext(Authcontext);
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef();
  const currentUser = user || Firebaseuser;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${USER_API_END_POINT}/me`, {
          withCredentials: true,
        });
        if (response.data.success) setUser(response.data.user);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const logoutHandler = async () => {
    try {
      if (Firebaseuser) {
        await Firebaselogout();
      } else {
        await axios.get(`${USER_API_END_POINT}/logout`, {
          withCredentials: true,
        });
      }
      setUser(null);
      navigate("/login");
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query) return setSuggestions([]);
      try {
        const res = await axiosInstance.get(`/blogs/search?query=${query}`);
        setSuggestions(res.data);
        setShowDropdown(true);
      } catch {
        setSuggestions([]);
      }
    };
    const timeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (blogId) => {
    navigate(`/blogs/${blogId}`);
    setQuery("");
    setSuggestions([]);
    setShowDropdown(false);
  };

  // Close mobile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setMobileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-base-100 w-full px-4 py-2 sticky top-0 z-50">
      <div className=" mx-auto  flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Link to="/" className="text-xl  font-semibold whitespace-nowrap">
            DevThoughts
          </Link>
          {/* Desktop Search */}

          <div className="hidden md:block relative w-48 sm:w-64">
  <input
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    onFocus={() => query.length > 0 && setShowDropdown(true)}
    onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
    placeholder="    Search blogs..."
    className="input  w-full px-4 py-2 pr-10 rounded" // pr-10 for icon space
  />
  <Search className="absolute left-2  top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
  {showDropdown && suggestions.length > 0 && (
    <ul className="absolute left-0 right-0 mt-1 bg-white  rounded shadow z-50">
      {suggestions.map((blog) => (
        <li
          key={blog._id}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleSelect(blog._id)}
        >
          {blog.title}
        </li>
      ))}
    </ul>
  )}
</div>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Desktop Write Button */}
          <Link to="/blog" className="hidden md:inline-block">
            Write
          </Link>

          {/* Mobile Search Icon */}
          <button
            className="md:hidden btn btn-ghost btn-circle"
            onClick={() => setSearchVisible((prev) => !prev)}
          >
            <Search className="text-gray-500 w-4 h-4" />
          </button>

          {/* Profile or Get Started */}
          {currentUser ? (
            <div className="relative" ref={profileRef}>
              <img
                src={currentUser?.photoURL || img}
                onClick={() => setMobileDropdown((prev) => !prev)}
                alt="Profile"
                className="lg:w-10 lg:h-10 w-6 h-6 rounded-full object-cover cursor-pointer"
              />
              {mobileDropdown && (
                <ul className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md p-2 z-50 text-sm">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logoutHandler}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-outline text-white bg-black px-3 py-2 rounded md:hidden"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchVisible && (
        <div className="mt-2 md:hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 0 && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
            placeholder="Search blogs..."
            className="input input-bordered w-full px-4 py-2 rounded"
          />
          {showDropdown && suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-50">
              {suggestions.map((blog) => (
                <li
                  key={blog._id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(blog._id)}
                >
                  {blog.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Navber;
