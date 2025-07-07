const BlogCard = ({ blog }) => {
  return (
    <div>
    <div className=" rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                 <img
                   src={blog.image}
                   alt={blog.title}
                    loading="lazy"
                   className="w-full lg:h-56 h-46 lg:object-cover rounded-xl"
                 />
   
                 <div className="p-4 space-y-3">
                   {/* Tags */}
                   <div className="flex flex-wrap gap-2">
                     {blog.tags?.slice(0, 3).map((tag, idx) => (
                       <span
                         key={idx}
                         className="text-xs bg-blue-100 text-blue-600 font-medium px-3 py-1 rounded-full"
                       >
                         {tag}
                       </span>
                     ))}
                   </div>
   
                   {/* Title */}
                   <h2 className="text-lg font-semibold text-gray-900 hover:text-blue-600 line-clamp-2">
                     {blog.title}
                   </h2>
   
                   {/* Author & Meta */}
                   <div className="text-sm text-gray-500 flex flex-wrap gap-4 items-center">
                     <p>{blog.author?.name || "Unknown Author"}</p>
                     <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                     <p>💬 {blog.comments?.length ?? 0}</p>
                   </div>
   
                   {/* Content Preview */}
                   <p className="text-sm text-gray-700 line-clamp-3">
                     {blog.content.replace(/<[^>]+>/g, "").slice(0, 120)}...
                   </p>
   
                   {/* Read More Button (Optional) */}
                   <div>
                     <button className="btn btn-outline border-blue-200  text-blue-500 rounded-3xl hover:text-white hover:bg-blue-600">
                       Read More
                     </button>
                   </div>
                 </div>
               </div>
    </div>
  );
};

export default BlogCard;
