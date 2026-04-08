import { useState } from "react";

const SubscribeNewsletter = () => {
  const [email, setEmail] = useState("");
  const [name, setName]   = useState("");
  const [done, setDone]   = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail(""); setName("");
  };

  return (
    <section style={{ background: "var(--bg)", padding: "80px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", background: "var(--bg2)", border: "1px solid rgba(255,255,255,0.08)" }}>

          {/* Glow */}
          <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(249,115,22,0.1) 0%,transparent 70%)", top: -200, left: -100, pointerEvents: "none" }} />
          <div style={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle,rgba(251,191,36,0.06) 0%,transparent 70%)", bottom: -100, right: -50, pointerEvents: "none" }} />

          {/* Grid pattern */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(249,115,22,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,0.03) 1px,transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", padding: "60px 56px" }} className="lg:grid-cols-2 grid-cols-1">

            {/* Left */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 100, padding: "5px 14px", marginBottom: 24 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f97316", display: "inline-block" }} />
                <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#f97316", fontWeight: 600 }}>Newsletter</span>
              </div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,3vw,2.6rem)", lineHeight: 1.15, color: "#e8e6e1", margin: "0 0 16px" }}>
                Stay ahead of the<br /><span style={{ color: "#f97316" }}>developer curve.</span>
              </h2>
              <p style={{ color: "#6b6b80", fontSize: "0.92rem", lineHeight: 1.7, margin: "0 0 28px", maxWidth: 380 }}>
                Get weekly deep-dives on full-stack development, architecture patterns, and tools straight to your inbox — no spam, ever.
              </p>
              <div style={{ display: "flex", gap: 24 }}>
                {[["2K+", "Subscribers"],["98%", "Open rate"],["Weekly", "Delivery"]].map(([num, label]) => (
                  <div key={label}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#f97316" }}>{num}</div>
                    <div style={{ fontSize: "0.72rem", color: "#6b6b80" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "32px 28px" }}>
              {done ? (
                <div style={{ textAlign: "center", padding: "24px 0" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🎉</div>
                  <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: "#e8e6e1", marginBottom: 8 }}>You're in!</h3>
                  <p style={{ color: "#6b6b80", fontSize: "0.88rem" }}>Welcome aboard. First issue drops next week.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", color: "#9898a8", marginBottom: 6, fontFamily: "'Syne',sans-serif", letterSpacing: "0.05em" }}>Your name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Adnan Rony" style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "11px 14px", color: "#e8e6e1", fontSize: "0.9rem", outline: "none", transition: "border-color 0.2s" }}
                      onFocus={e => e.target.style.borderColor = "rgba(249,115,22,0.5)"}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", color: "#9898a8", marginBottom: 6, fontFamily: "'Syne',sans-serif", letterSpacing: "0.05em" }}>Email address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "11px 14px", color: "#e8e6e1", fontSize: "0.9rem", outline: "none", transition: "border-color 0.2s" }}
                      onFocus={e => e.target.style.borderColor = "rgba(249,115,22,0.5)"}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                    />
                  </div>
                  <button type="submit" className="btn-orange" style={{ width: "100%", justifyContent: "center", marginTop: 4 }}>
                    Subscribe — it's free ✦
                  </button>
                  <p style={{ fontSize: "0.72rem", color: "#6b6b80", textAlign: "center" }}>No spam. Unsubscribe anytime.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeNewsletter;
