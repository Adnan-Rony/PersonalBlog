import BlogCardSkeleton from "./BlogCardSkeleton.jsx";

const BlogSkeletonGrid = () => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
    {[...Array(8)].map((_, i) => <BlogCardSkeleton key={i} />)}
  </div>
);

export default BlogSkeletonGrid;
