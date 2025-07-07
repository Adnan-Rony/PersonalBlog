import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSearch, FiX } from "react-icons/fi";
import img from "../../assets/user-1.jpg";
import SearchBar from "../SearchBar.jsx";
import { UseCurrentUser, Uselogout } from "../../Features/users/userQuery.js";
import { CiMenuBurger } from "react-icons/ci";

const Navvber = () => {
  const { data } = UseCurrentUser();
  const { mutate: logout } = Uselogout();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => navigate("/login"),
      onError: (err) => console.error("Logout error", err),
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (

    <div className="bg-white sticky top-0 z-50">
      <header className=" container mx-auto sticky top-0 z-50 ">
      <div className=" flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-blue-700">
          Dev<span className="text-gray-800">Thoughts</span>
        </Link>

        {/* Center - Desktop Search */}
        <div className="hidden md:block w-96">
          <SearchBar />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Contact link */}
          <Link
            to="/contact"
            className="hidden md:block text-sm text-gray-700 hover:text-purple-600"
          >
            Contact
          </Link>

          {/* Write button */}
          <button
            onClick={() => navigate(data?.user ? "/blog" : "/login")}
            className="hidden md:flex items-center text-2xl text-gray-700 hover:text-blue-600"
            aria-label="Write blog"
          >
            <HiOutlinePencilSquare />
          </button>

          {/* Profile image (desktop) */}
          <div className="hidden md:block relative" ref={dropdownRef}>
            <img
              src={data?.user?.profilePicture || img}
              alt="Profile"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-10 h-10 rounded-full object-cover cursor-pointer border"
            />
            {dropdownOpen && (
              <ul className="absolute right-0 mt-3 w-56 bg-white rounded-md shadow-md ring-1 ring-black ring-opacity-5 z-50 text-sm animate-fade-in">
                {!data?.user ? (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/SignIn"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Sign Up
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="px-4 py-2 font-semibold border-b">
                      {data.user.name}
                    </li>
                    {data.user?.role === "admin" && (
                      <li>
                        <Link
                          to="/dashboard/admin"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Dashboard
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/blog"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Share Blog
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>

          {/* Mobile Three-dot Menu Button */}
          <button
            onClick={() => setMobileMenu(true)}
            className="block md:hidden w-10 h-10 rounded-full bg-gradient-to-r text-white  items-center justify-center"
          >
            <span className="text-white text-2xl">
              <CiMenuBurger />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="block md:hidden px-4 pb-3">
        <SearchBar />
      </div>

      {/* Mobile Fullscreen Menu */}
      {mobileMenu && (
        <div className="fixed inset-0 bg-white z-50 px-6 py-4">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Dev<span className="text-gray-800">Thoughts</span>
            </Link>
            <button
              onClick={() => setMobileMenu(false)}
              className="text-2xl text-gray-600"
            >
              <FiX />
            </button>
          </div>

          <ul className="space-y-4 text-lg">
            <li>
              <Link to="/" onClick={() => setMobileMenu(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setMobileMenu(false)}>
                Contact
              </Link>
            </li>
            {data?.user?.role === "admin" && (
              <li>
                <Link
                  to="/dashboard/admin"
                  onClick={() => setMobileMenu(false)}
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link to="/profile" onClick={() => setMobileMenu(false)}>
                Profile
              </Link>
            </li>
            <li>
              <Link to="/blog" onClick={() => setMobileMenu(false)}>
                Share Blog
              </Link>
            </li>
            {!data?.user ? (
              <>
                <li>
                  <Link to="/login" onClick={() => setMobileMenu(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/SignIn" onClick={() => setMobileMenu(false)}>
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenu(false);
                  }}
                  className="text-left text-red-600"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
    </div>


  );
};

export default Navvber;
