import { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import LeftBlogsection from "../components/Profile/LeftBlogsection.jsx";
import ProfileModel from "../components/blog/ProfileModel.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { UseFetchMyBlog } from "../Features/blog/blogQuery.js";
import { UseCurrentUser } from "../Features/users/userQuery.js";
import defaultAvatar from "../assets/user-profile-icon-free-vector.jpg";

const StatPill = ({ label, value }) => (
  <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "12px 18px", textAlign: "center", transition: "border-color 0.2s" }}
    onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)"}
    onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
  >
    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#f97316", lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: "0.7rem", color: "#6b6b80", marginTop: 4 }}>{label}</div>
  </div>
);

const ProfileInfo = () => {
  const { data: blogs = [], isLoading, isError } = UseFetchMyBlog();
  const { data: userData } = UseCurrentUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("blogs");

  if (isLoading) return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <LoadingSpinner />
    </div>
  );
  if (isError) return <p style={{ color: "#f87171", textAlign: "center", paddingTop: 60 }}>Failed to load profile.</p>;

  const user = userData?.user;

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Seo title="DevThought | Profile" />

      {/* ── Profile header banner ──────────────────────────────────── */}
      <div style={{ background: "linear-gradient(135deg,#0e0e1a 0%,#13131f 100%)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "48px 0 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", gap: 28, alignItems: "flex-end", flexWrap: "wrap" }}>

            {/* Avatar */}
            <div style={{ position: "relative" }}>
              <div style={{ width: 100, height: 100, borderRadius: "50%", border: "3px solid rgba(249,115,22,0.4)", overflow: "hidden", background: "#13131f" }}>
                <img src={user?.profilePicture || defaultAvatar} alt={user?.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              {/* online dot */}
              <span style={{ position: "absolute", bottom: 4, right: 4, width: 14, height: 14, borderRadius: "50%", background: "#4ade80", border: "2px solid #080810", boxShadow: "0 0 8px #4ade80" }} />
            </div>

            {/* Name & meta */}
            <div style={{ flex: 1, paddingBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "#e8e6e1", margin: 0 }}>{user?.name || "Developer"}</h1>
                {user?.role === "admin" && (
                  <span style={{ background: "rgba(249,115,22,0.12)", color: "#f97316", fontSize: "0.62rem", fontFamily: "'Syne',sans-serif", fontWeight: 600, letterSpacing: "0.12em", padding: "3px 9px", borderRadius: 6, textTransform: "uppercase" }}>Admin</span>
                )}
              </div>
              <p style={{ color: "#6b6b80", fontSize: "0.85rem", margin: "0 0 12px" }}>{user?.email}</p>
              <p style={{ color: "#9898a8", fontSize: "0.88rem", maxWidth: 440, lineHeight: 1.6, margin: 0 }}>
                {user?.bio || "No bio yet. Tell the world what you're about!"}
              </p>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 10, paddingBottom: 20, flexWrap: "wrap" }}>
              <button onClick={() => setModalOpen(true)} style={{ padding: "9px 20px", borderRadius: 100, background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.3)", color: "#f97316", fontSize: "0.82rem", fontFamily: "'DM Sans',sans-serif", fontWeight: 500, cursor: "pointer", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(249,115,22,0.2)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(249,115,22,0.1)"}
              >
                ✏️ Edit Profile
              </button>
              <Link to="/blog" style={{ padding: "9px 20px", borderRadius: 100, background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", fontSize: "0.82rem", fontFamily: "'DM Sans',sans-serif", fontWeight: 500, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                + New Blog
              </Link>
              {user?.role === "admin" && (
                <Link to="/dashboard/admin" style={{ padding: "9px 20px", borderRadius: 100, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#9898a8", fontSize: "0.82rem", textDecoration: "none" }}>
                  ⚙️ Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, margin: "24px 0 0", paddingBottom: 28 }}>
            <StatPill label="Articles"   value={blogs.length} />
            <StatPill label="Followers"  value={user?.followers?.length ?? 0} />
            <StatPill label="Following"  value={user?.following?.length ?? 0} />
            <StatPill label="Total Likes" value={blogs.reduce((a, b) => a + (b.likes?.length ?? 0), 0)} />
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 0, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {[["blogs","📝 My Blogs"],["activity","📈 Activity"]].map(([id, label]) => (
              <button key={id} onClick={() => setActiveTab(id)} style={{ padding: "14px 22px", background: "transparent", border: "none", cursor: "pointer", fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: "0.82rem", color: activeTab === id ? "#f97316" : "#6b6b80", borderBottom: activeTab === id ? "2px solid #f97316" : "2px solid transparent", transition: "color 0.2s", marginBottom: -1 }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        {activeTab === "blogs" && <LeftBlogsection blogs={blogs} />}

        {activeTab === "activity" && (
          <div style={{ background: "var(--bg2)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 32, textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📈</div>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: "#e8e6e1", marginBottom: 8 }}>Activity feed</h3>
            <p style={{ color: "#6b6b80", fontSize: "0.88rem" }}>Coming soon — like history, comment threads, and more.</p>
          </div>
        )}
      </div>

      {modalOpen && <ProfileModel closeModal={() => setModalOpen(false)} />}
    </div>
  );
};

export default ProfileInfo;
