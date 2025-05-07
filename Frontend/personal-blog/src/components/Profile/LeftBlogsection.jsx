import React, { useEffect, useState } from "react";
import { getMyBlogs } from "../../api/blogApi.js";
import { Link } from 'react-router-dom';
import { BsThreeDots } from "react-icons/bs";
import img from "../../assets/download.png";
const LeftBlogsection = ({props}) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchmyBlogs = async () => {
      try {
        const [myblogresponse] = await Promise.all([getMyBlogs()]);

        setBlogs(myblogresponse.data);
      } catch (err) {
        console.log("error fatching", err);
      } finally {
        setLoading(false);
      }
    };
    fetchmyBlogs();
  }, [props]);

  if (loading) return <p>Loading your blogs...</p>;

  return (
    <div>
      {blogs.map((blog) => (
        <div className="bg-white rounded-lg shadow p-4 flex justify-between flex-col md:flex-row gap-4 space-y-2 my-2">
          <div key={blog._id} className="">
            <Link  to={`/blogs/${blog._id}`}>
              <div className="text-gray-600">
                <h2 className="text-xl font-bold text-gray-900">
                  {blog.title}
                </h2>
                {blog.content.replace(/<[^>]+>/g, "").slice(0, 100)}...
              </div>
            </Link>

            <div className="text-sm  text-gray-500 mt-2 flex items-center gap-4">
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              {/* <span>👁️ </span> */}
              <span>💬 {blog.comments.length}</span>
              <BsThreeDots className="text-2xl" />
            </div>
          </div>

          <div>
            <img
              src={img}
              alt="thumbnail"
              className="w-52   h-32 object-cover rounded "
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeftBlogsection;
