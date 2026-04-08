import { Link } from "react-router-dom";
import { UseBlogRecommendations } from "../../Features/blog/blogQuery.js";

const RecommndedBlogs = ({ blogId }) => {
  const { data, isLoading, error } = UseBlogRecommendations(blogId);

  if (isLoading) return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16, marginTop: 32 }}>
      {[1,2].map(i => (
        <div key={i} style={{ height: 220, background: "rgba(255,255,255,0.04)", borderRadius: 14, animation: "pulse 1.5s ease-in-out infinite" }} />
      ))}
    </div>
  );

  if (error) return <p style={{ color: "#f87171", textAlign: "center" }}>Could not load recommendations.</p>;
  if (!data?.length) return <p style={{ color: "#6b6b80", textAlign: "center" }}>No recommended articles found.</p>;

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <span style={{ width: 20, height: 2, background: "#f97316", borderRadius: 2 }} />
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#e8e6e1", margin: 0 }}>
          Recommended Articles
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
        {data.map(blog => (
          <Link key={blog._id} to={`/blogs/${blog._id}`} style={{ textDecoration: "none" }} className="group">
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden", transition: "border-color 0.2s, transform 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ overflow: "hidden", height: 130 }}>
                <img src={blog.image} alt={blog.title} loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.75)", transition: "transform 0.5s" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"}
                />
              </div>
              <div style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                  {blog.tags?.slice(0,2).map((tag, i) => (
                    <span key={i} style={{ fontSize: "0.62rem", padding: "2px 8px", borderRadius: 100, background: "rgba(249,115,22,0.1)", color: "#f97316", border: "1px solid rgba(249,115,22,0.2)" }}>#{tag}</span>
                  ))}
                </div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: "0.88rem", color: "#e8e6e1", lineHeight: 1.4, margin: "0 0 8px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {blog.title}
                </h3>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#6b6b80" }}>
                  <span>{blog.author?.name}</span>
                  <span>💬 {blog.comments?.length ?? 0}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommndedBlogs;
