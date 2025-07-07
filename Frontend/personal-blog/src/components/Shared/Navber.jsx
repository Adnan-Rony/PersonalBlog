import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown, FiSearch } from "react-icons/fi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

const menuItems = [
  {
    name: "Home",
   
  },
  { name: "All Blogs" },
 
  
  { name: "Contact" },
];

const socialIcons = [
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaTiktok,
  FaYoutube,
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (name) => {
    setDropdownOpen(dropdownOpen === name ? null : name);
  };

  return (
    <>
      {/* Top Navbar */}
      <header className="bg-white shadow z-50 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-gray-800 flex items-center">
            Katen<span className="text-pink-500 text-4xl ml-1">.</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6 items-center">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                <button
                  className={`text-sm font-medium ${
                    item.name === "Home"
                      ? " text-white px-4 py-2 rounded-full"
                      : "text-gray-600 hover:text-black"
                  } flex items-center gap-1`}
                  onClick={() => toggleDropdown(item.name)}
                >
                  {item.name}
                  {item.subItems && <FiChevronDown />}
                </button>

                {item.subItems && (
                  <div className="absolute hidden group-hover:block bg-white shadow rounded mt-2 z-20 w-44">
                    {item.subItems.map((sub, index) => (
                      <Link
                        key={index}
                        to="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Social & Icons */}
          <div className="hidden md:flex items-center gap-3">
            {socialIcons.map((Icon, i) => (
              <Icon key={i} className="text-gray-800 hover:text-pink-500 text-lg" />
            ))}
            <button className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 flex justify-center items-center text-white">
              <FiSearch />
            </button>
            <button
              className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 flex justify-center items-center text-white"
              onClick={() => setMobileOpen(true)}
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-white z-50 p-6">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="text-3xl font-bold text-gray-800 flex items-center">
              Katen<span className="text-pink-500 text-4xl ml-1">.</span>
            </Link>
            <FiX className="text-2xl" onClick={() => setMobileOpen(false)} />
          </div>

          <ul className="space-y-4 text-gray-800 text-lg">
            {menuItems.map((item) => (
              <li key={item.name}>
                <div className="flex justify-between items-center border-b pb-2">
                  <span>{item.name}</span>
                  {item.subItems && <FiChevronDown />}
                </div>
                {item.subItems && (
                  <ul className="ml-4 mt-2 space-y-2">
                    {item.subItems.map((sub, i) => (
                      <li key={i} className="text-sm text-gray-600">
                        {sub}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="flex justify-center gap-5 mt-10">
            {socialIcons.map((Icon, i) => (
              <Icon key={i} className="text-xl text-gray-800 hover:text-pink-500" />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
