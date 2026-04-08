const Bone = ({ w = "100%", h = 14, r = 6, opacity = 0.07 }) => (
  <div style={{ width: w, height: h, background: `rgba(255,255,255,${opacity})`, borderRadius: r, flexShrink: 0 }} />
);

const SingleBlogSkeleton = () => (
  <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px", display: "grid", gridTemplateColumns: "1fr 300px", gap: 28, alignItems: "start" }} className="lg:grid-cols-[1fr_300px] grid-cols-1 animate-pulse">

      {/* Main */}
      <div style={{ background: "var(--bg2)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "32px 36px", display: "flex", flexDirection: "column", gap: 18 }}>
        {/* category + meta */}
        <div style={{ display: "flex", gap: 10 }}>
          <Bone w={80} h={22} r={100} />
          <Bone w={60} h={22} r={100} opacity={0.05} />
        </div>
        {/* title */}
        <Bone h={36} w="80%" />
        <Bone h={28} w="60%" opacity={0.05} />
        {/* author bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.07)", flexShrink: 0 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
            <Bone w={120} h={13} />
            <Bone w={180} h={11} opacity={0.05} />
          </div>
        </div>
        {/* banner image */}
        <div style={{ height: 340, background: "rgba(255,255,255,0.05)", borderRadius: 16 }} />
        {/* content lines */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
          {[100,96,88,92,80,75,90,70].map((w,i) => <Bone key={i} w={`${w}%`} opacity={0.05} />)}
        </div>
        {/* section heading */}
        <Bone w="40%" h={22} opacity={0.07} style={{ marginTop: 16 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[100,94,86].map((w,i) => <Bone key={i} w={`${w}%`} opacity={0.05} />)}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", margin: "8px 0" }} />
        {/* comments header */}
        <Bone w="30%" h={20} />
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.07)", flexShrink: 0 }} />
          <Bone w={100} h={13} />
        </div>
        <div style={{ height: 80, background: "rgba(255,255,255,0.04)", borderRadius: 10 }} />
        {[1,2,3].map(i => (
          <div key={i} style={{ display: "flex", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.06)", flexShrink: 0 }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
              <Bone w="30%" h={12} />
              <Bone w="90%" h={11} opacity={0.04} />
              <Bone w="75%" h={11} opacity={0.04} />
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <div className="hidden lg:flex" style={{ flexDirection: "column", gap: 16 }}>
        <div style={{ background: "var(--bg2)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "20px 22px", display: "flex", flexDirection: "column", gap: 12 }}>
          <Bone w="50%" h={13} />
          {[70,85,60,78,65].map((w,i) => <Bone key={i} w={`${w}%`} h={11} opacity={0.05} />)}
        </div>
        <div style={{ background: "var(--bg2)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "20px 22px", display: "flex", flexDirection: "column", gap: 12 }}>
          <Bone w="55%" h={13} />
          {[100,100,100,100].map((w,i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
              <Bone w="45%" h={11} opacity={0.05} />
              <Bone w="25%" h={11} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default SingleBlogSkeleton;
