import { Link } from "react-router-dom";
import { UseFetchBlog } from "../../Features/blog/blogQuery.js";
import FeaturedPostSkeleton from "../FeaturedPostSkeleton.jsx";

const FeaturedPosts = () => {
  const { data: blogs = [], isLoading } = UseFetchBlog();
  const main = blogs[0];
  const side = blogs.slice(1, 7);

  if (isLoading) return <FeaturedPostSkeleton />;
  if (!blogs.length) return null;

  return (
    <section style={{ background: "var(--bg)", padding: "80px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Section header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 24, height: 2, background: "#f97316", borderRadius: 2 }} />
            <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#f97316", fontWeight: 600 }}>Featured Posts</span>
          </div>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
          <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.75rem", color: "#6b6b80" }}>{blogs.length} stories</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 1, border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, overflow: "hidden", background: "rgba(255,255,255,0.07)" }} className="lg:grid-cols-[1fr_380px] grid-cols-1">

          {/* Main featured */}
          {main && (
            <Link to={`/blogs/${main._id}`} style={{ textDecoration: "none", display: "block", background: "var(--bg2)", position: "relative" }} className="group">
              <div style={{ position: "relative", height: 300, overflow: "hidden" }}>
                <img src={main.image} alt={main.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease", filter: "brightness(0.75)" }}
                  className="group-hover:scale-105"
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(14,14,26,0.9) 0%,transparent 60%)" }} />
                <span style={{ position: "absolute", top: 16, left: 20, fontFamily: "'Syne',sans-serif", fontSize: "72px", fontWeight: 800, color: "rgba(255,255,255,0.07)", lineHeight: 1, userSelect: "none" }}>01</span>
                <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(249,115,22,0.9)", borderRadius: 6, padding: "4px 10px", fontFamily: "'Syne',sans-serif", fontSize: "0.65rem", fontWeight: 700, color: "#fff", letterSpacing: "0.1em" }}>
                  FEATURED
                </div>
              </div>
              <div style={{ padding: "24px 28px" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                  {main.tags?.slice(0, 2).map((tag, i) => (
                    <span key={i} style={{ fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 100, background: "rgba(249,115,22,0.1)", color: "#f97316", border: "1px solid rgba(249,115,22,0.2)" }}>{tag}</span>
                  ))}
                </div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.35rem", fontWeight: 700, lineHeight: 1.3, color: "#e8e6e1", margin: "0 0 12px", transition: "color 0.2s" }} className="group-hover:text-orange-400">
                  {main.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#6b6b80", lineHeight: 1.7, margin: "0 0 20px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {main.content.replace(/<[^>]+>/g, "").slice(0, 200)}...
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#f97316,#ea580c)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.7rem", color: "#fff" }}>
                      {main.author?.name?.charAt(0) || "A"}
                    </div>
                    <span style={{ fontSize: "0.8rem", color: "#9898a8" }}>{main.author?.name}</span>
                  </div>
                  <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#f97316", fontFamily: "'Syne',sans-serif", letterSpacing: "0.05em", borderBottom: "1.5px solid #f97316", paddingBottom: 2 }}>Read story →</span>
                </div>
              </div>
            </Link>
          )}

          {/* Sidebar list */}
          <div style={{ background: "var(--bg2)", display: "flex", flexDirection: "column" }}>
            {side.map((post, i) => (
              <Link to={`/blogs/${post._id}`} key={post._id} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "16px 20px", textDecoration: "none", borderBottom: i < side.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(249,115,22,0.04)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                className="group"
              >
                <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.6rem", fontWeight: 800, color: "rgba(255,255,255,0.08)", lineHeight: 1, flexShrink: 0, width: 26, paddingTop: 2 }}>
                  {String(i + 2).padStart(2, "0")}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#f97316", marginBottom: 5 }}>{post.tags?.[0]}</div>
                  <h4 style={{ fontSize: "0.82rem", fontWeight: 500, lineHeight: 1.45, color: "#9898a8", margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", transition: "color 0.2s" }} className="group-hover:text-[#e8e6e1]">
                    {post.title}
                  </h4>
                  <span style={{ fontSize: "0.7rem", color: "#6b6b80", marginTop: 6, display: "block" }}>
                    {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
                {post.image && (
                  <img src={post.image} alt={post.title} loading="lazy" style={{ width: 50, height: 50, borderRadius: 8, objectFit: "cover", flexShrink: 0, opacity: 0.75, filter: "grayscale(30%)", transition: "opacity 0.2s" }} className="group-hover:opacity-100" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
