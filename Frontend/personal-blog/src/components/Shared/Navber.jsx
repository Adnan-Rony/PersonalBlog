import { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { FaGithub, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Authcontext } from "../../context/AuthProvider";

const NAV = [
  { name: "Home",    to: "/" },
  { name: "Blogs",   to: "/allblogs" },
  { name: "Resume",  to: "/resume" },
  { name: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [open, setOpen]         = useState(false);
  const [scroll, setScroll]     = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dropRef = useRef(null);
  const { user, Firebaselogout } = useContext(Authcontext);

  // blur navbar on scroll
  useEffect(() => {
    const fn = () => setScroll(window.scrollY > 12);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    const fn = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropdown(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const linkCls = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-orange-400" : "text-[#9898a8] hover:text-[#e8e6e1]"
    }`;

  // dropdown items — always show Profile + Share Blog; Dashboard only for admin
  const dropItems = [
    { icon: "👤", label: "Profile",    to: "/profile" },
    { icon: "✍️", label: "Share Blog", to: "/blog" },
    ...(user?.role === "admin" ? [{ icon: "⚙️", label: "Dashboard", to: "/dashboard/admin" }] : []),
  ];

  return (
    <>
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: scroll ? "rgba(8,8,16,0.92)" : "transparent",
        backdropFilter: scroll ? "blur(18px)" : "none",
        borderBottom: scroll ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* ── Logo ── */}
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 2 }}>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#e8e6e1" }}>Dev</span>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.7rem", color: "#f97316", lineHeight: 1 }}>.</span>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#e8e6e1" }}>Blog</span>
          </Link>

          {/* ── Desktop nav links ── */}
          <nav className="hidden md:flex" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {NAV.map(item => (
              <NavLink key={item.name} to={item.to} className={linkCls}
                style={{ padding: "6px 14px", borderRadius: 8 }}>
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* ── Right side ── */}
          <div className="hidden md:flex" style={{ display: "flex", alignItems: "center", gap: 10 }}>

            {/* Social icons */}
            {[FaGithub, FaTwitter, FaLinkedinIn].map((Icon, i) => (
              <button key={i} style={{ background: "transparent", border: "none", color: "#6b6b80", cursor: "pointer", padding: 6, borderRadius: 8, transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#f97316"}
                onMouseLeave={e => e.currentTarget.style.color = "#6b6b80"}
              >
                <Icon size={16} />
              </button>
            ))}

            <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.1)" }} />

            {/* ── Logged in: avatar + dropdown ── */}
            {user ? (
              <div ref={dropRef} style={{ position: "relative" }}>
                {/* Trigger button */}
                <button
                  onClick={() => setDropdown(d => !d)}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 100,
                    padding: "4px 12px 4px 4px",
                    cursor: "pointer",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(249,115,22,0.45)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                >
                  {/* Profile picture or initial */}
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      style={{ width: 30, height: 30, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(249,115,22,0.4)" }}
                    />
                  ) : (
                    <div style={{
                      width: 30, height: 30, borderRadius: "50%",
                      background: "linear-gradient(135deg,#f97316,#ea580c)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'Syne',sans-serif", fontWeight: 700,
                      fontSize: "0.78rem", color: "#fff",
                    }}>
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span style={{ fontSize: "0.82rem", color: "#e8e6e1", maxWidth: 90, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {user.name}
                  </span>
                  <FiChevronDown
                    size={13} color="#6b6b80"
                    style={{ transform: dropdown ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.22s" }}
                  />
                </button>

                {/* ── Dropdown menu ── */}
                {dropdown && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 10px)", right: 0,
                    background: "#13131f",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 14, padding: 6,
                    minWidth: 196,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                    zIndex: 300,
                    animation: "fadeUp 0.18s ease both",
                  }}>
                    {/* User info header */}
                    <div style={{ padding: "10px 12px 10px", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: 4 }}>
                      <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#e8e6e1", fontFamily: "'Syne',sans-serif" }}>{user.name}</div>
                      <div style={{ fontSize: "0.72rem", color: "#6b6b80", marginTop: 2 }}>{user.email}</div>
                    </div>

                    {/* Menu items */}
                    {dropItems.map(item => (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setDropdown(false)}
                        style={{
                          display: "flex", alignItems: "center", gap: 10,
                          padding: "9px 12px", borderRadius: 9,
                          textDecoration: "none", color: "#9898a8",
                          fontSize: "0.85rem", transition: "background 0.15s, color 0.15s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(249,115,22,0.09)"; e.currentTarget.style.color = "#e8e6e1"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9898a8"; }}
                      >
                        <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}

                    <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "4px 6px" }} />

                    {/* Logout */}
                    <button
                      onClick={() => { Firebaselogout(); setDropdown(false); }}
                      style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "9px 12px", borderRadius: 9,
                        background: "transparent", border: "none",
                        color: "#f87171", fontSize: "0.85rem",
                        cursor: "pointer", width: "100%", transition: "background 0.15s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(248,113,113,0.09)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <span style={{ fontSize: "1rem" }}>🚪</span> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ── Not logged in ── */
              <div style={{ display: "flex", gap: 8 }}>
                <Link to="/login"
                  style={{ padding: "7px 16px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.12)", color: "#9898a8", fontSize: "0.85rem", textDecoration: "none", transition: "color 0.2s, border-color 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#e8e6e1"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#9898a8"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
                >
                  Login
                </Link>
                <Link to="/SignIn"
                  style={{ padding: "7px 16px", borderRadius: 100, background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", fontSize: "0.85rem", textDecoration: "none", fontWeight: 500 }}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* ── Mobile hamburger ── */}
          <button className="md:hidden" onClick={() => setOpen(true)}
            style={{ background: "transparent", border: "none", color: "#e8e6e1", cursor: "pointer" }}>
            <FiMenu size={22} />
          </button>
        </div>
      </header>

      {/* ── Mobile full-screen drawer ── */}
      {open && (
        <div style={{ position: "fixed", inset: 0, background: "#080810", zIndex: 200, padding: 24, overflowY: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#e8e6e1" }}>
              Dev<span style={{ color: "#f97316" }}>.</span>Blog
            </span>
            <button onClick={() => setOpen(false)} style={{ background: "transparent", border: "none", color: "#e8e6e1", cursor: "pointer" }}>
              <FiX size={24} />
            </button>
          </div>

          {/* User info in mobile */}
          {user && (
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, marginBottom: 20 }}>
              {user.profilePicture ? (
                <img src={user.profilePicture} alt="" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(249,115,22,0.4)" }} />
              ) : (
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#f97316,#ea580c)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 700, color: "#fff" }}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#e8e6e1" }}>{user.name}</div>
                <div style={{ fontSize: "0.72rem", color: "#6b6b80" }}>{user.email}</div>
              </div>
            </div>
          )}

          <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV.map(item => (
              <Link key={item.name} to={item.to} onClick={() => setOpen(false)}
                style={{ padding: "13px 16px", color: "#9898a8", textDecoration: "none", fontSize: "1rem", borderRadius: 10, transition: "background 0.2s, color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(249,115,22,0.08)"; e.currentTarget.style.color = "#f97316"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9898a8"; }}
              >
                {item.name}
              </Link>
            ))}

            {user && (
              <>
                {dropItems.map(item => (
                  <Link key={item.label} to={item.to} onClick={() => setOpen(false)}
                    style={{ padding: "13px 16px", color: "#9898a8", textDecoration: "none", fontSize: "1rem", borderRadius: 10, display: "flex", alignItems: "center", gap: 10, transition: "background 0.2s, color 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(249,115,22,0.08)"; e.currentTarget.style.color = "#f97316"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9898a8"; }}
                  >
                    <span>{item.icon}</span> {item.label}
                  </Link>
                ))}
                <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "8px 0" }} />
                <button
                  onClick={() => { Firebaselogout(); setOpen(false); }}
                  style={{ padding: "13px 16px", borderRadius: 10, background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: "0.95rem", marginTop: 4, display: "flex", alignItems: "center", gap: 10 }}
                >
                  🚪 Logout
                </button>
              </>
            )}

            {!user && (
              <Link to="/login" onClick={() => setOpen(false)}
                style={{ marginTop: 16, padding: "13px", borderRadius: 100, background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", textDecoration: "none", fontWeight: 500, textAlign: "center" }}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
