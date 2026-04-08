const BlogCardSkeleton = () => (
  <div style={{ background: "var(--bg2)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}
    className="animate-pulse">
    {/* image */}
    <div style={{ height: 200, background: "rgba(255,255,255,0.05)" }} />
    <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
      {/* tags */}
      <div style={{ display: "flex", gap: 6 }}>
        {[60, 48, 72].map(w => <span key={w} style={{ height: 20, width: w, background: "rgba(255,255,255,0.07)", borderRadius: 100 }} />)}
      </div>
      {/* title */}
      <div style={{ height: 16, width: "75%", background: "rgba(255,255,255,0.07)", borderRadius: 6 }} />
      <div style={{ height: 16, width: "55%", background: "rgba(255,255,255,0.05)", borderRadius: 6 }} />
      {/* excerpt */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[100, 90, 70].map(w => <div key={w} style={{ height: 12, width: `${w}%`, background: "rgba(255,255,255,0.05)", borderRadius: 4 }} />)}
      </div>
      {/* author row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
          <div style={{ width: 60, height: 12, background: "rgba(255,255,255,0.05)", borderRadius: 4 }} />
        </div>
        <div style={{ width: 40, height: 12, background: "rgba(255,255,255,0.05)", borderRadius: 4 }} />
      </div>
      {/* button */}
      <div style={{ height: 36, background: "rgba(249,115,22,0.08)", borderRadius: 10 }} />
    </div>
  </div>
);

export default BlogCardSkeleton;
