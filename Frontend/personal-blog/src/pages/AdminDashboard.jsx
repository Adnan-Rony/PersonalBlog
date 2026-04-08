import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Seo from "../components/Seo.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import {
  adminblogdatadelete, getAllUsers, getdataAdminDashboard,
  getdataAdminDashboardOverview, getLoginuser, makeadmin,
} from "../Features/admin/adminAPI.js";

const TABS = [
  { id: "overview", label: "Overview",  icon: "📊" },
  { id: "blogs",    label: "All Blogs", icon: "📝" },
  { id: "users",    label: "Users",     icon: "👥" },
  { id: "resume",   label: "Resume",    icon: "📄" },
];

const StatCard = ({ label, value, color, icon }) => (
  <div style={{ background: "var(--bg2)", border: `1px solid ${color}25`, borderRadius: 14, padding: "20px 22px", position: "relative", overflow: "hidden", transition: "transform 0.2s, box-shadow 0.2s" }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 12px 36px ${color}18`; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
  >
    <div style={{ position: "absolute", top: 14, right: 16, fontSize: "1.4rem", opacity: 0.5 }}>{icon}</div>
    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "2rem", fontWeight: 800, color, lineHeight: 1 }}>{value ?? "—"}</div>
    <div style={{ fontSize: "0.78rem", color: "#6b6b80", marginTop: 6 }}>{label}</div>
  </div>
);

const AdminDashboard = () => {
  const [overview, setOverview] = useState(null);
  const [blogs,    setBlogs]    = useState([]);
  const [users,    setUsers]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [admin,    setAdmin]    = useState(null);
  const [tab,      setTab]      = useState("overview");
  const [search,   setSearch]   = useState("");
  const navigate = useNavigate();

  const load = async () => {
    try {
      const [bRes, oRes, uRes, usRes] = await Promise.all([
        getdataAdminDashboard(),
        getdataAdminDashboardOverview(),
        getLoginuser(),
        getAllUsers(),
      ]);
      setBlogs(bRes.data);
      setOverview(oRes.data);
      setAdmin(uRes.data);
      setUsers(usRes.data);
      setLoading(false);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) navigate("/login");
      else { toast.error("Network error."); setLoading(false); }
    }
  };

  useEffect(() => { load(); }, []);

  const deleteBlog = (id) => {
    Swal.fire({ title: "Delete this blog?", showDenyButton: true, confirmButtonText: "Yes, delete", denyButtonText: "Cancel", background: "#0e0e1a", color: "#e8e6e1", confirmButtonColor: "#ef4444", denyButtonColor: "#374151" })
      .then(async r => {
        if (r.isConfirmed) {
          try { await adminblogdatadelete(id); Swal.fire({ title: "Deleted!", icon: "success", background: "#0e0e1a", color: "#e8e6e1" }); load(); }
          catch { Swal.fire({ title: "Failed", icon: "error", background: "#0e0e1a", color: "#e8e6e1" }); }
        }
      });
  };

  const promoteUser = async (id) => {
    try { const r = await makeadmin(id); toast.success(r.data.message); load(); }
    catch (e) { toast.error(e.response?.data?.message || "Failed"); }
  };

  if (loading) return <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}><LoadingSpinner /></div>;

  const filteredBlogs = blogs.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));
  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <Seo title="DevThought | Admin Dashboard" />

      {/* ── Sidebar ──────────────────────────────────────────────────── */}
      <aside style={{ width: 240, background: "var(--bg2)", borderRight: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", padding: "28px 16px", position: "sticky", top: 0, height: "100vh", overflowY: "auto", flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#e8e6e1", marginBottom: 28, paddingLeft: 8 }}>
          Dev<span style={{ color: "#f97316" }}>.</span>Blog
          <span style={{ marginLeft: 8, fontSize: "0.6rem", background: "rgba(249,115,22,0.12)", color: "#f97316", padding: "2px 7px", borderRadius: 4, fontWeight: 600, letterSpacing: "0.1em", verticalAlign: "middle" }}>ADMIN</span>
        </div>

        {/* Admin info */}
        {admin?.user && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 8px", background: "rgba(255,255,255,0.04)", borderRadius: 10, marginBottom: 24 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#f97316,#ea580c)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#fff", flexShrink: 0 }}>
              {admin.user.name?.charAt(0)}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 500, color: "#e8e6e1", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{admin.user.name}</div>
              <div style={{ fontSize: "0.65rem", color: "#6b6b80" }}>Administrator</div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.15s, color 0.15s", background: tab === t.id ? "rgba(249,115,22,0.12)" : "transparent", color: tab === t.id ? "#f97316" : "#9898a8", fontFamily: "'DM Sans',sans-serif", fontSize: "0.875rem", fontWeight: tab === t.id ? 500 : 400 }}
              onMouseEnter={e => { if (tab !== t.id) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#e8e6e1"; } }}
              onMouseLeave={e => { if (tab !== t.id) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9898a8"; } }}
            >
              <span>{t.icon}</span>
              {t.label}
              {tab === t.id && <span style={{ marginLeft: "auto", width: 4, height: 16, background: "#f97316", borderRadius: 2 }} />}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 16, marginTop: 16 }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", color: "#6b6b80", textDecoration: "none", fontSize: "0.8rem", borderRadius: 8, transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#e8e6e1"}
            onMouseLeave={e => e.currentTarget.style.color = "#6b6b80"}
          >
            ← Back to site
          </a>
        </div>
      </aside>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <main style={{ flex: 1, padding: "32px 36px", overflowY: "auto" }}>

        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#e8e6e1", margin: 0 }}>
              {TABS.find(t => t.id === tab)?.label}
            </h1>
            <p style={{ color: "#6b6b80", fontSize: "0.82rem", margin: "4px 0 0" }}>
              {tab === "overview" ? "Site statistics at a glance" : tab === "blogs" ? `${blogs.length} total blogs` : tab === "users" ? `${users.length} registered users` : "Manage your public resume"}
            </p>
          </div>
          {(tab === "blogs" || tab === "users") && (
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${tab}...`}
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 16px", color: "#e8e6e1", fontSize: "0.85rem", outline: "none", width: 220, transition: "border-color 0.2s" }}
              onFocus={e => e.target.style.borderColor = "rgba(249,115,22,0.5)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
          )}
        </div>

        {/* ── OVERVIEW ── */}
        {tab === "overview" && overview && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 16, marginBottom: 36 }}>
              <StatCard label="Total Users"     value={overview.users}              color="#60a5fa" icon="👥" />
              <StatCard label="Admins"          value={overview.admins}             color="#a78bfa" icon="🛡️" />
              <StatCard label="Total Blogs"     value={overview.blogs?.total}       color="#f97316" icon="📝" />
              <StatCard label="Published"       value={overview.blogs?.published}   color="#4ade80" icon="✅" />
              <StatCard label="Pending"         value={overview.blogs?.pending}     color="#fbbf24" icon="⏳" />
              <StatCard label="Rejected"        value={overview.blogs?.rejected}    color="#f87171" icon="❌" />
            </div>

            {/* Recent blogs preview */}
            <div style={{ background: "var(--bg2)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ padding: "18px 22px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: "#e8e6e1", fontSize: "0.95rem" }}>Recent Blogs</span>
                <button onClick={() => setTab("blogs")} style={{ fontSize: "0.78rem", color: "#f97316", background: "transparent", border: "none", cursor: "pointer" }}>View all →</button>
              </div>
              {blogs.slice(0, 5).map((b, i) => (
                <div key={b._id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 22px", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  {b.image && <img src={b.image} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover", filter: "brightness(0.7)" }} />}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "0.85rem", color: "#e8e6e1", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.title}</div>
                    <div style={{ fontSize: "0.72rem", color: "#6b6b80", marginTop: 2 }}>{b.author?.name} · {new Date(b.createdAt).toLocaleDateString()}</div>
                  </div>
                  <span style={{ fontSize: "0.68rem", fontWeight: 600, padding: "3px 10px", borderRadius: 6, fontFamily: "'Syne',sans-serif", letterSpacing: "0.08em", ...(b.status === "published" ? { background: "rgba(74,222,128,0.1)", color: "#4ade80" } : b.status === "pending" ? { background: "rgba(251,191,36,0.1)", color: "#fbbf24" } : { background: "rgba(248,113,113,0.1)", color: "#f87171" }) }}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── BLOGS ── */}
        {tab === "blogs" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filteredBlogs.length === 0 && <p style={{ color: "#6b6b80", textAlign: "center", padding: "40px 0" }}>No blogs found.</p>}
            {filteredBlogs.map(blog => (
              <div key={blog._id} style={{ background: "var(--bg2)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
              >
                {blog.image && <img src={blog.image} alt="" style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover", flexShrink: 0, filter: "brightness(0.7)" }} />}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.92rem", fontWeight: 600, color: "#e8e6e1", margin: "0 0 4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{blog.title}</h3>
                  <div style={{ display: "flex", gap: 12, fontSize: "0.75rem", color: "#6b6b80" }}>
                    <span>By {blog.author?.name || "Unknown"}</span>
                    <span>💬 {blog.comments?.length ?? 0}</span>
                    <span>❤️ {blog.likes?.length ?? 0}</span>
                  </div>
                </div>
                <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "4px 10px", borderRadius: 6, fontFamily: "'Syne',sans-serif", letterSpacing: "0.08em", flexShrink: 0, ...(blog.status === "published" ? { background: "rgba(74,222,128,0.1)", color: "#4ade80" } : blog.status === "pending" ? { background: "rgba(251,191,36,0.1)", color: "#fbbf24" } : { background: "rgba(248,113,113,0.1)", color: "#f87171" }) }}>
                  {blog.status}
                </span>
                <button onClick={() => deleteBlog(blog._id)} style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontSize: "0.78rem", flexShrink: 0, transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(248,113,113,0.18)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(248,113,113,0.08)"}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ── USERS ── */}
        {tab === "users" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filteredUsers.map(u => (
              <div key={u._id} style={{ background: "var(--bg2)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
              >
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: u.role === "admin" ? "linear-gradient(135deg,#f97316,#ea580c)" : "linear-gradient(135deg,#60a5fa,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#fff", flexShrink: 0 }}>
                  {u.name?.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "0.88rem", fontWeight: 500, color: "#e8e6e1", marginBottom: 2 }}>{u.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#6b6b80", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.72rem", color: "#6b6b80" }}>
                  <span>👥 {u.followers?.length ?? 0} followers</span>
                </div>
                <span style={{ fontSize: "0.68rem", fontWeight: 600, padding: "3px 10px", borderRadius: 6, fontFamily: "'Syne',sans-serif", letterSpacing: "0.08em", flexShrink: 0, ...(u.role === "admin" ? { background: "rgba(249,115,22,0.1)", color: "#f97316" } : { background: "rgba(255,255,255,0.06)", color: "#9898a8" }) }}>
                  {u.role}
                </span>
                {u.role !== "admin" && (
                  <button onClick={() => promoteUser(u._id)} style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)", color: "#f97316", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontSize: "0.78rem", flexShrink: 0, transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(249,115,22,0.18)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(249,115,22,0.08)"}
                  >
                    Make Admin
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── RESUME ── */}
        {tab === "resume" && (
          <div style={{ background: "var(--bg2)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 32, textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>📄</div>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: "#e8e6e1", marginBottom: 8 }}>Resume Manager</h3>
            <p style={{ color: "#6b6b80", fontSize: "0.88rem", marginBottom: 24 }}>Use the API endpoints to update your public resume. View it live at <code style={{ color: "#f97316" }}>/resume</code></p>
            <a href="/resume" target="_blank" rel="noopener noreferrer" className="btn-orange" style={{ display: "inline-flex" }}>
              View Public Resume ↗
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
