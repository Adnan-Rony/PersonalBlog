import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard.jsx";
import BlogSkeletonGrid from "../components/loader/BlogSkeletonGrid.jsx";
import Seo from "../components/Seo.jsx";
import { UseFetchBlog } from "../Features/blog/blogQuery.js";

const Blogs = () => {
  const { data: blogs = [], isLoading, isError } = UseFetchBlog();
  const featuredBlogs = blogs.slice(0, 6);
  return (
    <div>
      <div className="container mx-auto py-4">
        <Seo
          title="DevThought | Home Page"
          description="Explore all blog posts on various topics including tech, life, and tips. Stay informed with our latest posts."
        />

        {isError && (
          <p className="text-center text-red-500 text-lg">
            Failed to load blogs.
          </p>
        )}

        {isLoading && (
          <div className="px-4">
            <BlogSkeletonGrid />
          </div>
        )}

        {/* Featured Blogs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 mb-8">
          {featuredBlogs.map((blog, index) => (
            <Link
              key={index}
              to={`/blogs/${blog._id}`}
              className="h-full block"
            >
              <BlogCard blog={blog}  />
            </Link>
          ))}
        </div>

        <div className="flex justify-center px-4">
          <Link
            to="/allblogs"
            className="btn bg-gradient-to-r  from-[#4f49f3] to-[#af1ffe] text-white rounded-md hover:bg-blue-700"
          >
            See More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
