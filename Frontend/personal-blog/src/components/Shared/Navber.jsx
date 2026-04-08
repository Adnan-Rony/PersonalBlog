import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaGithub, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import SearchBar from "../SearchBar.jsx";
import { UseCurrentUser, Uselogout } from "../../Features/users/userQuery.js";

const NAV = [
  { name: "Home", to: "/" },
  { name: "Blogs", to: "/allblogs" },
  { name: "Resume", to: "/resume" },
  { name: "Contact", to: "/contact" },
];

const SOCIAL = [
  { icon: FaGithub, url: "https://github.com/Adnan-Rony" },
  { icon: FaTwitter, url: "https://twitter.com/your-username" },
  { icon: FaLinkedinIn, url: "https://linkedin.com/in/adnan-rony" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dropRef = useRef(null);
  const navigate = useNavigate();

  const { data } = UseCurrentUser();
  const { mutate: logout } = Uselogout();
  const user = data?.user;

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate("/login");
        setDropdown(false);
        setOpen(false);
      },
      onError: (err) => console.error(err),
    });
  };

  useEffect(() => {
    const fn = () => setScroll(window.scrollY > 12);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const linkCls = ({ isActive }) =>
    `text-sm font-medium px-3 py-2 rounded-md transition ${
      isActive ? "text-orange-400" : "text-gray-400 hover:text-white"
    }`;

  const dropItems = [
    { icon: "👤", label: "Profile", to: "/profile" },
    { icon: "✍️", label: "Share Blog", to: "/blog" },
    ...(user?.role === "admin"
      ? [{ icon: "⚙️", label: "Dashboard", to: "/dashboard/admin" }]
      : []),
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-white/10 transition ${
          scroll
            ? "bg-black/90 backdrop-blur-xl"
            : "bg-black/60 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* MAIN ROW */}
          <div className="h-16 flex items-center justify-between">

            {/* LOGO */}
            <Link to="/" className="flex items-center text-xl font-bold">
              <span className="text-white">Dev</span>
              <span className="text-orange-500">.</span>
              <span className="text-white">Blog</span>
            </Link>

            {/* SEARCH */}
            <div className="hidden md:block flex-1 max-w-md mx-6">
              <SearchBar />
            </div>

            {/* NAV */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV.map((item) => (
                <NavLink key={item.name} to={item.to} className={linkCls}>
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* RIGHT SIDE */}
            <div className="hidden md:flex items-center gap-3">

              {/* SOCIAL MEDIA LINKS */}
              <div className="flex items-center gap-2">
                {SOCIAL.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={i}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-orange-500 transition"
                    >
                      <Icon size={15} />
                    </a>
                  );
                })}
              </div>

              <div className="w-px h-5 bg-white/10" />

              {/* WRITE */}
              <button
                onClick={() => navigate(user ? "/blog" : "/login")}
                className="text-gray-400 hover:text-orange-500 transition"
              >
                <HiOutlinePencilSquare size={20} />
              </button>

              <div className="w-px h-5 bg-white/10" />

              {/* PROFILE */}
              {user ? (
                <div className="relative" ref={dropRef}>
                  <button
                    onClick={() => setDropdown(!dropdown)}
                    className="flex items-center gap-2 px-2 py-1 rounded-full bg-white/5 border border-white/10"
                  >
                    <img
                      src={user.profilePicture}
                      className="w-7 h-7 rounded-full object-cover border border-orange-500/40"
                    />
                    <span className="text-sm text-white max-w-[80px] truncate">
                      {user.name}
                    </span>
                    <FiChevronDown
                      className={`transition ${
                        dropdown ? "rotate-180" : ""
                      }`}
                      size={14}
                    />
                  </button>

                  {/* DROPDOWN */}
                  {dropdown && (
                    <div className="absolute right-0 top-12 w-52 bg-[#13131f] border border-white/10 rounded-xl shadow-xl p-2">
                      <div className="px-3 py-2 border-b border-white/10">
                        <p className="text-sm text-white">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>

                      {dropItems.map((item) => (
                        <Link
                          key={item.label}
                          to={item.to}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-orange-500/10 hover:text-white"
                          onClick={() => setDropdown(false)}
                        >
                          <span>{item.icon}</span>
                          {item.label}
                        </Link>
                      ))}

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                      >
                        🚪 Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-1.5 text-sm border border-white/10 rounded-full text-gray-400 hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/SignIn"
                    className="px-4 py-1.5 text-sm bg-orange-500 text-white rounded-full"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* MOBILE MENU */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden text-white"
            >
              <FiMenu size={22} />
            </button>
          </div>

          {/* MOBILE SEARCH */}
          <div className="md:hidden pb-3">
            <SearchBar />
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="fixed inset-0 bg-black z-50 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-white text-xl font-bold">
              Dev<span className="text-orange-500">.</span>Blog
            </h1>
            <button onClick={() => setOpen(false)}>
              <FiX size={24} className="text-white" />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {NAV.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-gray-400 hover:text-orange-500 hover:bg-orange-500/10 rounded-lg"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;