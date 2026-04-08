import { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import LeftBlogsection from "../components/Profile/LeftBlogsection.jsx";
import ProfileModel from "../components/blog/ProfileModel.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { UseFetchMyBlog } from "../Features/blog/blogQuery.js";
import { UseCurrentUser } from "../Features/users/userQuery.js";
import defaultAvatar from "../assets/user-profile-icon-free-vector.jpg";

/* ─── Global styles: font + animations ─── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');

    .profile-page * { font-family: 'Syne', sans-serif; }
    .mono { font-family: 'DM Mono', monospace !important; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.92); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(251,146,60,0.4); }
      50%       { box-shadow: 0 0 0 10px rgba(251,146,60,0); }
    }
    @keyframes onlinePulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.6); }
      50%       { box-shadow: 0 0 0 6px rgba(74,222,128,0); }
    }
    @keyframes shimmer {
      0%   { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }

    .anim-0 { animation: fadeUp .45s .00s ease both; }
    .anim-1 { animation: fadeUp .45s .07s ease both; }
    .anim-2 { animation: fadeUp .45s .14s ease both; }
    .anim-3 { animation: fadeUp .45s .21s ease both; }
    .anim-4 { animation: fadeUp .45s .28s ease both; }
    .anim-5 { animation: scaleIn .4s .10s ease both; }

    .avatar-ring { animation: pulseGlow 2.8s infinite; }
    .online-dot  { animation: onlinePulse 2s infinite; }

    .stat-card:hover .stat-value { color: #fb923c; }
    .stat-card:hover { border-color: rgba(251,146,60,.25) !important; transform: translateY(-2px); }

    .tab-btn { position: relative; }
    .tab-btn::after {
      content: '';
      position: absolute;
      bottom: -1px; left: 50%; right: 50%;
      height: 2px;
      background: #fb923c;
      border-radius: 2px 2px 0 0;
      transition: left .25s ease, right .25s ease;
    }
    .tab-btn.active::after { left: 0; right: 0; }

    .cover-shimmer {
      background: linear-gradient(
        105deg,
        #0a0a12 0%,
        #0f0f1c 20%,
        #141428 40%,
        #0d0d1f 60%,
        #08080f 80%,
        #0a0a12 100%
      );
      background-size: 800px 100%;
    }

    .edit-btn:hover  { background: rgba(251,146,60,.18) !important; }
    .new-btn:hover   { opacity: .88; transform: translateY(-1px); }
    .dash-btn:hover  { border-color: rgba(251,146,60,.3) !important; color: #fb923c !important; }

    .blog-tab-content { animation: fadeUp .35s ease both; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #08080f; }
    ::-webkit-scrollbar-thumb { background: #1e1e2e; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #2a2a3e; }
  `}</style>
);

/* ─── Stat Card ─── */
const StatCard = ({ label, value, icon }) => (
  <div className="stat-card bg-[#0d0d1a] border border-[#1a1a2e] rounded-2xl px-4 py-4 text-center transition-all duration-200 cursor-default group">
    <div className="text-lg mb-1">{icon}</div>
    <div className="stat-value text-2xl font-extrabold text-[#cdd6f4] transition-colors duration-200 leading-none">
      {value}
    </div>
    <div className="mono text-[10px] text-[#4a4a6a] uppercase tracking-[0.15em] mt-1.5">
      {label}
    </div>
  </div>
);

/* ─── Main Component ─── */
const ProfileInfo = () => {
  const { data: blogs = [], isLoading, isError } = UseFetchMyBlog();
  const { data: userData } = UseCurrentUser();
  const [modalOpen, setModalOpen]   = useState(false);
  const [activeTab, setActiveTab]   = useState("blogs");

  if (isLoading)
    return (
      <div className="profile-page bg-[#06080f] min-h-screen flex items-center justify-center">
        <GlobalStyles />
        <LoadingSpinner />
      </div>
    );

  if (isError)
    return (
      <div className="profile-page bg-[#06080f] min-h-screen flex items-center justify-center">
        <GlobalStyles />
        <p className="mono text-[#f38ba8] text-sm">Failed to load profile.</p>
      </div>
    );

  const user       = userData?.user;
  const totalLikes = blogs.reduce((a, b) => a + (b.likes?.length ?? 0), 0);

  return (
    <div className="profile-page bg-[#06080f] min-h-screen text-[#cdd6f4]">
      <GlobalStyles />
      <Seo title="DevThought | Profile" />

      {/* ══════════════════════════════════════
          COVER BAND
      ══════════════════════════════════════ */}
      <div className="cover-shimmer relative overflow-hidden">

        {/* Decorative grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Orange glow blob */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />
        <div className="absolute -top-10 right-0 w-60 h-60 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-0">

          {/* ── Top row: avatar + info + actions ── */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 anim-0">

            {/* Avatar */}
            <div className="relative shrink-0 anim-5">
              <div className="avatar-ring w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-orange-500/40 overflow-hidden bg-[#0f0f1c] shadow-2xl">
                <img
                  src={user?.profilePicture || defaultAvatar}
                  alt={user?.name || "User"}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Online dot */}
              <span className="online-dot absolute -bottom-1 -right-1 w-4 h-4 bg-[#a6e3a1] rounded-full border-2 border-[#06080f]" />
              {/* Admin badge on avatar */}
              {user?.role === "admin" && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-[9px] shadow-lg shadow-orange-500/30">
                  ★
                </span>
              )}
            </div>

            {/* Name / email / bio */}
            <div className="flex-1 pb-5 anim-1">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#cdd6f4] leading-tight tracking-tight">
                  {user?.name || "Developer"}
                </h1>
                {user?.role === "admin" && (
                  <span className="mono text-[10px] uppercase tracking-[0.2em] font-semibold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-md">
                    Admin
                  </span>
                )}
              </div>

              <p className="mono text-[12px] text-[#4a4a6a] mb-2">
                {user?.email}
              </p>

              <p className="text-[13.5px] text-[#7f849c] max-w-lg leading-relaxed">
                {user?.bio || "No bio yet. Tell the world what you're about ✦"}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 pb-5 anim-2 shrink-0">
              <button
                onClick={() => setModalOpen(true)}
                className="edit-btn flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-orange-500/8 border border-orange-500/20 text-orange-400 text-[13px] font-semibold transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </button>

              <Link
                to="/blog"
                className="new-btn flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white text-[13px] font-bold shadow-lg shadow-orange-500/20 transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                New Post
              </Link>

              {user?.role === "admin" && (
                <Link
                  to="/dashboard/admin"
                  className="dash-btn flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#1a1a2e] text-[#6c7086] text-[13px] font-semibold transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* ── Stats Row ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 mb-6 anim-3">
            <StatCard icon="📝" label="Articles"    value={blogs.length} />
            <StatCard icon="👥" label="Followers"   value={user?.followers?.length ?? 0} />
            <StatCard icon="➕" label="Following"   value={user?.following?.length ?? 0} />
            <StatCard icon="❤️" label="Total Likes" value={totalLikes} />
          </div>

          {/* ── Tabs ── */}
          <div className="flex gap-0 border-t border-[#1a1a2e] anim-4">
            {[
              { id: "blogs",    icon: "📝", label: "My Blogs" },
              { id: "activity", icon: "📈", label: "Activity" },
            ].map(({ id, icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`tab-btn px-5 py-3.5 text-[13px] font-semibold transition-colors duration-200 ${
                  activeTab === id
                    ? "active text-orange-400"
                    : "text-[#4a4a6a] hover:text-[#7f849c]"
                }`}
              >
                <span className="mr-1.5">{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          CONTENT AREA
      ══════════════════════════════════════ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {activeTab === "blogs" && (
          <div className="blog-tab-content">
            {blogs.length === 0 ? (
              /* Empty state */
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#0d0d1a] border border-[#1a1a2e] flex items-center justify-center text-3xl mb-5">
                  📝
                </div>
                <h3 className="text-lg font-bold text-[#cdd6f4] mb-2">No articles yet</h3>
                <p className="mono text-[12px] text-[#4a4a6a] mb-6 max-w-xs">
                  You haven't published anything yet. Share your first thought with the world.
                </p>
                <Link
                  to="/blog"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white text-[13px] font-bold shadow-lg shadow-orange-500/20 hover:opacity-90 transition"
                >
                  Write your first post →
                </Link>
              </div>
            ) : (
              <LeftBlogsection blogs={blogs} />
            )}
          </div>
        )}

        {activeTab === "activity" && (
          <div className="blog-tab-content">
            {/* Coming soon card */}
            <div className="relative overflow-hidden bg-[#0d0d1a] border border-[#1a1a2e] rounded-2xl p-10 text-center">
              {/* bg decoration */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-[#13131f] border border-[#1a1a2e] flex items-center justify-center text-2xl mx-auto mb-4">
                  📈
                </div>
                <h3 className="text-lg font-bold text-[#cdd6f4] mb-2">Activity Feed</h3>
                <p className="mono text-[12px] text-[#4a4a6a] max-w-xs mx-auto leading-relaxed">
                  Like history, comment threads, and reading stats — coming soon.
                </p>

                {/* Placeholder bars */}
                <div className="mt-8 space-y-2.5 max-w-sm mx-auto">
                  {[70, 45, 85, 30, 60].map((w, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="mono text-[10px] text-[#2a2a3e] w-8 text-right shrink-0">
                        {["Mon","Tue","Wed","Thu","Fri"][i]}
                      </div>
                      <div className="flex-1 h-1.5 bg-[#13131f] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500/30 to-orange-500/10 rounded-full"
                          style={{ width: `${w}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Profile Modal ── */}
      {modalOpen && <ProfileModel closeModal={() => setModalOpen(false)} />}
    </div>
  );
};

export default ProfileInfo;