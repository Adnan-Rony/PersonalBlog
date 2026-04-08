import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard.jsx";
import BlogSkeletonGrid from "../components/loader/BlogSkeletonGrid.jsx";
import Seo from "../components/Seo.jsx";
import { UseFetchBlog } from "../Features/blog/blogQuery.js";

const Blogs = () => {
  const { data: blogs = [], isLoading, isError } = UseFetchBlog();
  const featured = blogs.slice(0, 8);

  return (
    <section style={{ background: "var(--bg)", padding: "80px 0" }}>
      <Seo title="DevThought | Latest Articles" />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ width: 24, height: 2, background: "#f97316", borderRadius: 2 }} />
              <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#f97316", fontWeight: 600 }}>Latest Articles</span>
            </div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "#e8e6e1", margin: 0 }}>
              Fresh from the blog
            </h2>
          </div>
          <Link to="/allblogs" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.12)", color: "#9898a8", textDecoration: "none", fontSize: "0.85rem", fontFamily: "'DM Sans',sans-serif", transition: "color 0.2s, border-color 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#e8e6e1"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#9898a8"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
          >
            View all articles →
          </Link>
        </div>

        {isError && <p style={{ color: "#f87171", textAlign: "center" }}>Failed to load blogs.</p>}
        {isLoading && <BlogSkeletonGrid />}

        {!isLoading && blogs.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: 12 }}>📭</div>
            <p style={{ color: "#6b6b80" }}>No articles yet. Check back soon!</p>
          </div>
        )}

        {!isLoading && featured.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
            {featured.map(blog => <BlogCard key={blog._id} blog={blog} />)}
          </div>
        )}

        {!isLoading && blogs.length > 8 && (
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link to="/allblogs" className="btn-orange">
              Explore All {blogs.length} Articles →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
