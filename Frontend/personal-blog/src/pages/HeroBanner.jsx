import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const TAGS = [
  "React",
  "Node.js",
  "MongoDB",
  "Tailwind CSS",
  "Express.js",
  "TypeScript",
];

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  size: 4 + (i * 5) % 10,
  left: `${(i * 19 + 3) % 96}%`,
  top: `${(i * 13 + 7) % 88}%`,
  color:
    i % 3 === 0
      ? "bg-orange-500/30"
      : i % 3 === 1
      ? "bg-yellow-400/20"
      : "bg-white/10",
  delay: `${(i * 0.35).toFixed(1)}s`,
  duration: `${4 + (i % 4)}s`,
}));

export default function HeroBanner() {
  const [typed, setTyped] = useState("");
  const [idx, setIdx] = useState(0);
  const [del, setDel] = useState(false);
  const t = useRef(null);

  useEffect(() => {
    const cur = TAGS[idx];
    if (!del && typed.length < cur.length) {
      t.current = setTimeout(
        () => setTyped(cur.slice(0, typed.length + 1)),
        85
      );
    } else if (!del && typed.length === cur.length) {
      t.current = setTimeout(() => setDel(true), 1500);
    } else if (del && typed.length > 0) {
      t.current = setTimeout(
        () => setTyped(cur.slice(0, typed.length - 1)),
        42
      );
    } else if (del && typed.length === 0) {
      setDel(false);
      setIdx((i) => (i + 1) % TAGS.length);
    }
    return () => clearTimeout(t.current);
  }, [typed, del, idx]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--bg)]">

      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.04)_1px,transparent_1px)] bg-[size:52px_52px]" />

      {/* GLOW */}
      <div className="absolute w-[600px] h-[600px] -top-40 -left-40 rounded-full bg-orange-500/10 blur-3xl animate-pulse" />
      <div className="absolute w-[400px] h-[400px] bottom-[-80px] right-0 rounded-full bg-yellow-400/10 blur-3xl animate-pulse" />

      {/* PARTICLES */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={`absolute rounded-full ${p.color} animate-float`}
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 py-16 grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div>

          {/* TOP TEXT */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-7 h-[2px] bg-orange-500" />
            <span className="uppercase text-xs tracking-widest text-orange-500 font-semibold">
              Developer Blog · Since 2025
            </span>
          </div>

          {/* TITLE */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5">
            Where{" "}
            <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
              Code
            </span>
            <br />
            Meets Craft <br />
            <span className="text-white/40">& the Open Web.</span>
          </h1>

          {/* TYPEWRITER */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-gray-400 text-sm">
              Currently writing about
            </span>
            <span className="text-yellow-400 font-semibold text-sm min-w-[120px]">
              {typed}
              <span className="ml-1 animate-pulse">|</span>
            </span>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 mb-8 flex-wrap">
            <Link
              to="/allblogs"
              className="px-6 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition"
            >
              Explore Blogs
            </Link>
            <Link
              to="/resume"
              className="px-6 py-2 rounded-full border border-white/20 text-gray-300 hover:text-white hover:border-white transition"
            >
              View Resume ↗
            </Link>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              ["50+", "Articles"],
              ["10K+", "Readers"],
              ["5+", "Years"],
            ].map(([num, label]) => (
              <div
                key={label}
                className="bg-white/5 border border-white/10 rounded-xl p-3 hover:border-orange-400/40 hover:-translate-y-1 transition"
              >
                <div className="text-lg font-bold text-white">{num}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            ))}
          </div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-orange-400 hover:border-orange-400/40 hover:bg-orange-500/10 transition flex items-center gap-1"
              >
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden md:block relative">
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&q=80&auto=format&fit=crop"
              className="w-full h-[420px] object-cover brightness-75 hover:brightness-100 hover:scale-105 transition duration-500"
            />
          </div>

          {/* BADGES */}
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur border border-orange-400/30 rounded-lg px-3 py-2 text-xs text-white flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            New article every week
          </div>

          <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-md font-bold">
            DEV · BLOG
          </div>

          <div className="absolute -bottom-6 -right-6 bg-[#13131f] border border-white/10 rounded-xl p-4 shadow-xl">
            <div className="text-xs text-gray-400">Latest stack</div>
            <div className="text-orange-500 font-bold">MERN + Next.js</div>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-xs text-gray-500">
        <span>Scroll</span>
        <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1">
          <div className="w-1 h-1 bg-orange-500 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}