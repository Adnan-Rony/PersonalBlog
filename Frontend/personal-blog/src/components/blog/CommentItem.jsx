const CommentItem = ({ comment }) => (
  <div style={{ display: "flex", gap: 12, padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#6b6b80,#4a4a5a)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#e8e6e1", flexShrink: 0 }}>
      {comment.author?.name?.charAt(0).toUpperCase() || "?"}
    </div>
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
        <span style={{ fontWeight: 600, color: "#e8e6e1", fontSize: "0.88rem" }}>
          {comment.author?.name || "Anonymous"}
        </span>
        <span style={{ fontSize: "0.72rem", color: "#6b6b80" }}>
          {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
        </span>
      </div>
      <p style={{ color: "#c8c6c0", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>
        {comment.content}
      </p>
    </div>
  </div>
);

export default CommentItem;
