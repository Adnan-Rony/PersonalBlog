import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { UseSearchBlog } from "../Features/blog/blogQuery.js";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const { data, isLoading } = UseSearchBlog(input);
  const navigate = useNavigate();

  const handleSelect = (blogId) => {
    setInput("");
    navigate(`/blogs/${blogId}`);
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Input */}
      <div style={{ position: "relative" }}>
        <FiSearch size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#6b6b80", pointerEvents: "none" }} />
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Search articles..."
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 10,
            padding: "9px 14px 9px 34px",
            color: "#e8e6e1",
            fontSize: "0.85rem",
            fontFamily: "'DM Sans',sans-serif",
            outline: "none",
            transition: "border-color 0.2s, background 0.2s",
          }}
          onFocus={e => { e.target.style.borderColor = "rgba(249,115,22,0.45)"; e.target.style.background = "rgba(255,255,255,0.07)"; }}
          onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.background = "rgba(255,255,255,0.05)"; }}
        />
      </div>

      {/* Results dropdown */}
      {input.trim() && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
          background: "#13131f", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 12, zIndex: 400,
          maxHeight: 240, overflowY: "auto",
          boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
        }}>
          {isLoading ? (
            <div style={{ padding: "12px 16px", color: "#6b6b80", fontSize: "0.82rem" }}>Searching...</div>
          ) : Array.isArray(data) && data.length > 0 ? (
            data.map(blog => (
              <button
                key={blog._id}
                onClick={() => handleSelect(blog._id)}
                style={{
                  width: "100%", textAlign: "left",
                  padding: "10px 16px", background: "transparent",
                  border: "none", borderBottom: "1px solid rgba(255,255,255,0.05)",
                  color: "#9898a8", fontSize: "0.85rem",
                  fontFamily: "'DM Sans',sans-serif",
                  cursor: "pointer", transition: "background 0.15s, color 0.15s",
                  display: "flex", alignItems: "center", gap: 10,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(249,115,22,0.08)"; e.currentTarget.style.color = "#e8e6e1"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9898a8"; }}
              >
                <FiSearch size={12} style={{ color: "#f97316", flexShrink: 0 }} />
                {blog.title}
              </button>
            ))
          ) : (
            <div style={{ padding: "12px 16px", color: "#6b6b80", fontSize: "0.82rem" }}>No articles found for "{input}"</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
