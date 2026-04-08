import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const TAGS = ["React", "Node.js", "MongoDB", "Tailwind CSS", "Express.js", "TypeScript"];

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  size: 4 + (i * 5) % 10,
  left: `${(i * 19 + 3) % 96}%`,
  top:  `${(i * 13 + 7) % 88}%`,
  color: i % 3 === 0 ? "rgba(249,115,22,0.35)" : i % 3 === 1 ? "rgba(251,191,36,0.2)" : "rgba(255,255,255,0.06)",
  delay: `${(i * 0.35).toFixed(1)}s`,
  duration: `${4 + (i % 4)}s`,
}));

export default function HeroBanner() {
  const [typed, setTyped] = useState("");
  const [idx, setIdx]     = useState(0);
  const [del, setDel]     = useState(false);
  const t = useRef(null);

  useEffect(() => {
    const cur = TAGS[idx];
    if (!del && typed.length < cur.length) {
      t.current = setTimeout(() => setTyped(cur.slice(0, typed.length + 1)), 85);
    } else if (!del && typed.length === cur.length) {
      t.current = setTimeout(() => setDel(true), 1500);
    } else if (del && typed.length > 0) {
      t.current = setTimeout(() => setTyped(cur.slice(0, typed.length - 1)), 42);
    } else if (del && typed.length === 0) {
      setDel(false);
      setIdx(i => (i + 1) % TAGS.length);
    }
    return () => clearTimeout(t.current);
  }, [typed, del, idx]);

  return (
    <section style={{ background: "var(--bg)", minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>

      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(249,115,22,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,0.035) 1px,transparent 1px)", backgroundSize: "52px 52px", zIndex: 0 }} />

      {/* Glow blobs */}
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(249,115,22,0.12) 0%,transparent 70%)", top: -160, left: -160, zIndex: 0, animation: "float 14s ease-in-out infinite alternate" }} />
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(251,191,36,0.07) 0%,transparent 70%)", bottom: -100, right: 0, zIndex: 0, animation: "float 18s ease-in-out infinite alternate-reverse" }} />

      {/* Particles */}
      {PARTICLES.map((p, i) => (
        <span key={i} style={{ position: "absolute", width: p.size, height: p.size, borderRadius: "50%", background: p.color, left: p.left, top: p.top, animation: `float ${p.duration} ease-in-out infinite`, animationDelay: p.delay, zIndex: 0 }} />
      ))}

      {/* Noise */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "180px 180px", zIndex: 0 }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 1280, margin: "0 auto", padding: "80px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="md:grid-cols-2 grid-cols-1">

        {/* LEFT */}
        <div>
          {/* Eyebrow */}
          <div className="animate-fade-up delay-100" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <span style={{ width: 28, height: 2, background: "#f97316", borderRadius: 2 }} />
            <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#f97316", fontWeight: 600 }}>Developer Blog · Since 2025</span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up delay-200 font-display" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2.6rem,5.5vw,4.8rem)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "#e8e6e1", margin: "0 0 24px" }}>
            Where <span style={{ background: "linear-gradient(90deg,#f97316,#fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Code</span><br />
            Meets Craft<br />
            <span style={{ color: "rgba(232,230,225,0.35)", fontWeight: 700 }}>& the Open Web.</span>
          </h1>

          {/* Typewriter */}
          <div className="animate-fade-up delay-300" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36, flexWrap: "wrap" }}>
            <span style={{ color: "#6b6b80", fontSize: "0.9rem" }}>Currently writing about</span>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1rem", color: "#fbbf24", minWidth: 130 }}>
              {typed}<span className="cursor-blink" />
            </span>
          </div>

          {/* CTAs */}
          <div className="animate-fade-up delay-300" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
            <Link to="/allblogs" className="btn-orange">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 6h16M4 12h16M4 18h10"/></svg>
              Explore Blogs
            </Link>
            <Link to="/resume" className="btn-ghost-dark">
              View Resume ↗
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-fade-up delay-400" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 40 }}>
            {[["50+","Articles"],["10K+","Monthly Readers"],["5+","Years Exp."]].map(([num, label]) => (
              <div key={label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "16px 18px", transition: "border-color 0.2s,transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(249,115,22,0.35)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.8rem", fontWeight: 800, color: "#e8e6e1", lineHeight: 1 }}>{num}</div>
                <div style={{ color: "#6b6b80", fontSize: "0.75rem", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Tag pills */}
          <div className="animate-fade-up delay-500" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {TAGS.map(tag => (
              <span key={tag} style={{ padding: "5px 13px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 100, fontSize: "0.75rem", color: "#6b6b80", display: "flex", alignItems: "center", gap: 5, transition: "color 0.2s, border-color 0.2s, background 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#f97316"; e.currentTarget.style.borderColor = "rgba(249,115,22,0.35)"; e.currentTarget.style.background = "rgba(249,115,22,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#6b6b80"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              >
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#f97316", display: "inline-block" }} />{tag}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — image */}
        <div className="animate-fade-up delay-400 hidden md:block" style={{ position: "relative" }}>
          {/* Decorative lines */}
          <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderTop: "1px solid rgba(249,115,22,0.3)", borderRight: "1px solid rgba(249,115,22,0.3)", borderRadius: "0 12px 0 0" }} />
          <div style={{ position: "absolute", bottom: -20, left: -20, width: 120, height: 120, borderBottom: "1px solid rgba(249,115,22,0.3)", borderLeft: "1px solid rgba(249,115,22,0.3)", borderRadius: "0 0 0 12px" }} />

          {/* Main image */}
          <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 40px 80px rgba(0,0,0,0.6)", position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&q=80&auto=format&fit=crop"
              alt="Developer workspace"
              loading="eager"
              decoding="async"
              style={{ width: "100%", height: 460, objectFit: "cover", filter: "saturate(0.7) brightness(0.65)", display: "block", transition: "transform 0.6s, filter 0.6s" }}
              onMouseEnter={e => { e.target.style.transform = "scale(1.03)"; e.target.style.filter = "saturate(1) brightness(0.75)"; }}
              onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.filter = "saturate(0.7) brightness(0.65)"; }}
            />
            {/* gradient overlay */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,transparent 40%,rgba(249,115,22,0.15) 100%)", pointerEvents: "none" }} />
            {/* corner accent */}
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 80, height: 80, background: "linear-gradient(135deg,transparent 50%,rgba(249,115,22,0.45) 100%)", pointerEvents: "none" }} />

            {/* live badge */}
            <div style={{ position: "absolute", bottom: 18, left: 18, background: "rgba(8,8,16,0.85)", border: "1px solid rgba(249,115,22,0.25)", backdropFilter: "blur(12px)", borderRadius: 10, padding: "9px 14px", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block", boxShadow: "0 0 8px #4ade80" }} />
              <span style={{ color: "#e8e6e1", fontSize: "0.78rem", fontFamily: "'DM Sans',sans-serif" }}>New article every week</span>
            </div>

            {/* top right badge */}
            <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(249,115,22,0.9)", borderRadius: 8, padding: "5px 11px", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.7rem", color: "#fff", letterSpacing: "0.08em" }}>
              DEV · BLOG
            </div>
          </div>

          {/* Floating mini card */}
          <div style={{ position: "absolute", bottom: -24, right: -24, background: "#13131f", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "14px 18px", boxShadow: "0 16px 40px rgba(0,0,0,0.5)", minWidth: 160 }}>
            <div style={{ fontSize: "0.7rem", color: "#6b6b80", marginBottom: 4, fontFamily: "'Syne',sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>Latest stack</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#f97316" }}>MERN + Next.js</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 2 }}>
        <span style={{ color: "#6b6b80", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'Syne',sans-serif" }}>Scroll</span>
        <div style={{ width: 22, height: 36, border: "1px solid rgba(255,255,255,0.15)", borderRadius: 11, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "4px 0" }}>
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#f97316", animation: "float 1.5s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}
