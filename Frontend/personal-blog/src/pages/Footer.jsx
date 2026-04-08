import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";

const SOCIALS = [
  { Icon: FaGithub,    href: "https://github.com/" },
  { Icon: FaTwitter,   href: "https://twitter.com/" },
  { Icon: FaLinkedinIn,href: "https://linkedin.com/" },
  { Icon: FaInstagram, href: "https://instagram.com/" },
  { Icon: FaYoutube,   href: "https://youtube.com/" },
];

const LINKS = {
  "Topics": [
    { name: "Web Development", to: "/categories" },
    { name: "Frontend",        to: "/categories" },
    { name: "Backend & APIs",  to: "/categories" },
    { name: "DevOps",          to: "/categories" },
    { name: "Open Source",     to: "/categories" },
  ],
  "Pages": [
    { name: "All Blogs", to: "/allblogs" },
    { name: "Resume",    to: "/resume" },
    { name: "Contact",   to: "/contact" },
    { name: "Profile",   to: "/profile" },
  ],
};

const Footer = () => (
  <footer style={{ background: "#050509", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 60, paddingBottom: 28 }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 48, flexWrap: "wrap" }} className="lg:grid-cols-[2fr_1fr_1fr] grid-cols-1">

        {/* Brand */}
        <div>
          <Link to="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 2, marginBottom: 16 }}>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#e8e6e1" }}>Dev</span>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.7rem", color: "#f97316" }}>.</span>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#e8e6e1" }}>Blog</span>
          </Link>
          <p style={{ fontSize: "0.85rem", color: "#6b6b80", lineHeight: 1.75, maxWidth: 320, marginBottom: 24 }}>
            Deep-dives on full-stack development, system design, and developer tools. Written by a developer, for developers.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            {SOCIALS.map(({ Icon, href }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b6b80", transition: "background 0.2s, color 0.2s, border-color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(249,115,22,0.12)"; e.currentTarget.style.color = "#f97316"; e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#6b6b80"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([heading, items]) => (
          <div key={heading}>
            <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#f97316", fontWeight: 600, marginBottom: 18 }}>{heading}</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {items.map(item => (
                <li key={item.name}>
                  <Link to={item.to} style={{ fontSize: "0.85rem", color: "#6b6b80", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#e8e6e1"}
                    onMouseLeave={e => e.currentTarget.style.color = "#6b6b80"}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontSize: "0.78rem", color: "#6b6b80", margin: 0 }}>
          © {new Date().getFullYear()} Dev.Blog — Built with ❤️ by a developer
        </p>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy Policy", "Terms"].map(t => (
            <span key={t} style={{ fontSize: "0.78rem", color: "#6b6b80", cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#e8e6e1"}
              onMouseLeave={e => e.currentTarget.style.color = "#6b6b80"}
            >{t}</span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
