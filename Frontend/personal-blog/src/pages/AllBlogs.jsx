import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { UseFetchBlog } from "../Features/blog/blogQuery.js";
import BlogSkeletonGrid from "../components/loader/BlogSkeletonGrid.jsx";
import BlogCard from "../components/BlogCard.jsx";

const AllBlogs = () => {
  const { data: blogs = [], isLoading, isError } = UseFetchBlog();

  return (
    <div className="container mx-auto py-4">
      {/* SEO */}
      <Seo
        title="DevThought | All Blogs"
        description="Explore all blog posts on various topics including tech, life, and tips."
      />

      {/* Error */}
      {isError && (
        <p className="text-center text-red-500 text-lg">
          Failed to load blogs.
        </p>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="px-4">
          <BlogSkeletonGrid />
        </div>
      )}

      {/* Blog Grid */}
      {!isLoading && !isError && blogs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
          {blogs.map((blog) => (
            <Link key={blog._id} to={`/blogs/${blog._id}`} className="h-full">
              <BlogCard blog={blog} />
            </Link>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && blogs.length === 0 && (
        <p className="text-center text-gray-600 mt-8">
          No blogs found.
        </p>
      )}
    </div>
  );
};

export default AllBlogs;