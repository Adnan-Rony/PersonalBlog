import { useParams } from "react-router-dom";
import { UseFetchBlog } from "../Features/blog/blogQuery.js";
import Seo from "../components/Seo.jsx";
import BlogCard from "../components/BlogCard.jsx";


const CategoryPage = () => {
  const { categoryName } = useParams();
  const { data: blogs = [], isLoading, isError } = UseFetchBlog();

  const filteredBlogs = blogs.filter(blog => blog.categories === categoryName);

  return (
    <div className="container mx-auto py-8 px-4">
      <Seo
        title={`DevThought | Category: ${categoryName}`}
        description={`Read blogs categorized under ${categoryName}`}
      />

      <h1 className="text-3xl font-bold mb-6">Category: {categoryName}</h1>

      {isError && (
        <p className="text-red-500 text-center">Failed to load blogs.</p>
      )}

      {isLoading && (
        <p className="text-center">Loading...</p>
      )}

      {!isLoading && !isError && filteredBlogs.length === 0 && (
        <p className="text-center text-gray-600">No blogs found in this category.</p>
      )}

      {!isLoading && !isError && filteredBlogs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map(blog => (
            <Link key={blog._id} to={`/blogs/${blog._id}`} className="h-full block">
              <BlogCard blog={blog} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
