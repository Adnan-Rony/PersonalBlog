import img1 from "../../assets/download.png"
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { GoComment } from "react-icons/go";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance.js";
import { Link } from "react-router-dom";



const RecommndedBlogs = ({currentBlogId}) => {

    const [recommended, setRecommended] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
          try {
            const res = await axiosInstance.get("/blogs");
            const shuffled = res.data.sort(() => 0.5 - Math.random());
            setRecommended(shuffled.slice(0, 6)); // show 2 random blogs
          } catch (error) {
            console.error("Error fetching recommended blogs", error);
          }
        };
    
        fetchBlogs();
      }, [currentBlogId]);






  return (
    <div>
     
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 my-10">
      {recommended.map((blog) => (
        <Link to={`/blogs/${blog._id}`} key={blog._id} className="p-4  rounded hover:shadow-md transition">
          <img
            className="w-full object-cover h-32 mb-2"
            src={blog.thumbnail || img1}
            alt={blog.title}
          />
          <p className="font-semibold text-lg">{blog.title}</p>
          <p className="text-sm text-gray-600 line-clamp-2">
            {blog.content.replace(/<[^>]+>/g, '').slice(0, 40)}...
          </p>
          <div className="flex items-center mt-4 gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <MdOutlineTipsAndUpdates className="text-xl" />
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <GoComment className="text-xl" />
              <span>{blog.comments?.length || 0}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
      </div>
   
  );
};

export default RecommndedBlogs;
