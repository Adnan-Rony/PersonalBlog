import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const readTime = Math.max(
    1,
    Math.round(blog.content?.replace(/<[^>]+>/g, "").length / 1000)
  );

  return (
    <div
      className="bg-[var(--bg2)] border border-white/10 rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:border-orange-500/30 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-[200px]">
        <img
          src={blog.image}
          alt={blog.title}
          loading="lazy"
          className="w-full h-full object-cover brightness-75 saturate-75 transition-transform duration-500 hover:scale-105 hover:brightness-90 hover:saturate-100"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,14,26,0.8)] to-transparent pointer-events-none" />

        {/* Category */}
        {blog.categories?.[0] && (
          <span className="absolute top-3 left-3 bg-orange-500/90 text-white text-[10px] font-semibold tracking-widest uppercase px-2 py-[2px] rounded">
            {blog.categories[0]}
          </span>
        )}

        {/* Read time */}
        <span className="absolute top-3 right-3 bg-black/70 text-[#9898a8] text-[11px] px-2 py-[2px] rounded border border-white/10 backdrop-blur">
          {readTime} min
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {blog.tags?.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className="text-[10px] font-medium tracking-wider uppercase px-2 py-[2px] rounded-full bg-white/5 text-[#6b6b80] border border-white/10"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 className="font-[Syne] text-[15px] font-bold leading-snug text-[#e8e6e1] mb-3 line-clamp-2">
          {blog.title}
        </h2>

        {/* Excerpt */}
        <p className="text-xs text-[#6b6b80] leading-relaxed mb-4 line-clamp-2 flex-1">
          {blog.content?.replace(/<[^>]+>/g, "").slice(0, 120)}...
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mb-4">
          {/* Author */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white text-[10px] font-bold font-[Syne]">
              {blog.author?.name?.charAt(0) || "A"}
            </div>
            <span className="text-[11px] text-[#9898a8]">
              {blog.author?.name || "Unknown"}
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 text-[11px] text-[#6b6b80]">
            <span>💬 {blog.comments?.length ?? 0}</span>
            <span>❤️ {blog.likes?.length ?? 0}</span>
          </div>
        </div>

        {/* CTA */}
        <Link
          to={`/blogs/${blog._id}`}
          className="text-center py-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-semibold tracking-wide font-[Syne] transition-all hover:bg-orange-500/20 hover:-translate-y-[2px]"
        >
          Read Article →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;