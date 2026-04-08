const FeaturedPostSkeleton = () => (
  <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px" }} className="animate-pulse">
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
      <div style={{ width: 24, height: 2, background: "rgba(255,255,255,0.1)", borderRadius: 2 }} />
      <div style={{ width: 120, height: 12, background: "rgba(255,255,255,0.07)", borderRadius: 4 }} />
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 1, border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, overflow: "hidden" }} className="lg:grid-cols-[1fr_380px] grid-cols-1">
      {/* Main */}
      <div style={{ background: "var(--bg2)", padding: 0 }}>
        <div style={{ height: 300, background: "rgba(255,255,255,0.05)" }} />
        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ width: 60, height: 20, background: "rgba(249,115,22,0.1)", borderRadius: 100 }} />
            <div style={{ width: 48, height: 20, background: "rgba(255,255,255,0.05)", borderRadius: 100 }} />
          </div>
          <div style={{ height: 22, width: "80%", background: "rgba(255,255,255,0.07)", borderRadius: 6 }} />
          <div style={{ height: 22, width: "60%", background: "rgba(255,255,255,0.05)", borderRadius: 6 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
            {[100,95,85].map((w,i) => <div key={i} style={{ height: 12, width: `${w}%`, background: "rgba(255,255,255,0.04)", borderRadius: 4 }} />)}
          </div>
          <div style={{ width: 90, height: 16, background: "rgba(255,255,255,0.07)", borderRadius: 4, marginTop: 4 }} />
        </div>
      </div>
      {/* Sidebar */}
      <div style={{ background: "var(--bg2)", borderLeft: "1px solid rgba(255,255,255,0.07)" }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{ display: "flex", gap: 12, padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ width: 26, height: 22, background: "rgba(255,255,255,0.05)", borderRadius: 4, flexShrink: 0 }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
              <div style={{ width: 50, height: 10, background: "rgba(249,115,22,0.1)", borderRadius: 100 }} />
              <div style={{ width: "85%", height: 12, background: "rgba(255,255,255,0.06)", borderRadius: 4 }} />
              <div style={{ width: "65%", height: 11, background: "rgba(255,255,255,0.04)", borderRadius: 4 }} />
            </div>
            <div style={{ width: 50, height: 50, borderRadius: 8, background: "rgba(255,255,255,0.05)", flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default FeaturedPostSkeleton;
