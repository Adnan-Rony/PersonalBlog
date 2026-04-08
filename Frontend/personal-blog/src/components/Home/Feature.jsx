import { Link } from "react-router-dom";
import { UseFetchBlog } from "../../Features/blog/blogQuery.js";
import FeaturedPostSkeleton from "../FeaturedPostSkeleton.jsx";

const FeaturedPosts = () => {
  const { data: blogs = [], isLoading } = UseFetchBlog();
  const main = blogs[0];
  const side = blogs.slice(1, 7);

  if (isLoading) return <FeaturedPostSkeleton />;
  if (!blogs.length) return null;

  return (
    <section className="bg-[var(--bg)] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-5">

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex items-center gap-2">
            <span className="w-6 h-[2px] bg-orange-500 rounded" />
            <span className="uppercase tracking-[0.18em] text-[10px] md:text-xs text-orange-500 font-semibold">
              Featured Posts
            </span>
          </div>

          <div className="flex-1 h-px bg-white/10" />

          <span className="text-[11px] md:text-xs text-[#6b6b80]">
            {blogs.length} stories
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] border border-white/10 rounded-2xl overflow-hidden bg-white/5">

          {/* MAIN */}
          {main && (
            <Link
              to={`/blogs/${main._id}`}
              className="group block bg-[var(--bg2)]"
            >
              {/* Image */}
              <div className="relative h-[240px] sm:h-[300px] overflow-hidden">
                <img
                  src={main.image}
                  alt={main.title}
                  className="w-full h-full object-cover brightness-75 transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e1a]/90 to-transparent" />

                <span className="absolute top-4 left-5 text-[60px] md:text-[72px] font-extrabold text-white/10 select-none">
                  01
                </span>

                <div className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] px-2 py-1 rounded font-bold tracking-widest">
                  FEATURED
                </div>
              </div>

              {/* Content */}
              <div className="p-5 md:p-7">
                {/* Tags */}
                <div className="flex gap-2 flex-wrap mb-3">
                  {main.tags?.slice(0, 2).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] md:text-[11px] uppercase tracking-widest px-3 py-[2px] rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-[#e8e6e1] mb-2 leading-snug group-hover:text-orange-400 transition">
                  {main.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#6b6b80] leading-relaxed mb-5 line-clamp-2">
                  {main.content.replace(/<[^>]+>/g, "").slice(0, 200)}...
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-xs font-bold text-white">
                      {main.author?.name?.charAt(0) || "A"}
                    </div>
                    <span className="text-xs text-[#9898a8]">
                      {main.author?.name}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-orange-500 border-b border-orange-500 pb-[2px]">
                    Read story →
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* SIDEBAR */}
          <div className="bg-[var(--bg2)] flex flex-col">
            {side.map((post, i) => (
              <Link
                to={`/blogs/${post._id}`}
                key={post._id}
                className="flex gap-3 items-start px-4 py-4 border-b border-white/10 last:border-none hover:bg-orange-500/5 transition group"
              >
                {/* Number */}
                <span className="text-xl md:text-2xl font-extrabold text-white/10 w-6 flex-shrink-0">
                  {String(i + 2).padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-widest text-orange-500 mb-1">
                    {post.tags?.[0]}
                  </div>

                  <h4 className="text-xs md:text-sm text-[#9898a8] leading-snug line-clamp-2 group-hover:text-[#e8e6e1] transition">
                    {post.title}
                  </h4>

                  <span className="text-[10px] text-[#6b6b80] mt-1 block">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* Image */}
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover opacity-70 grayscale group-hover:opacity-100 transition"
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;