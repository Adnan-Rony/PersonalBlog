// src/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { adminblogdatadelete, getdataAdminDashboard, getdataAdminDashboardOverview } from '../api/blogApi.js';


const AdminDashboard = () => {
  const [overview, setOverview] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      const [blogsRes, overviewRes] = await Promise.all([
        getdataAdminDashboard(),
        getdataAdminDashboardOverview()
      ]);

      setBlogs(blogsRes.data);
      setOverview(overviewRes.data);
      setLoading(false);



    } catch (error) {
      console.error(error.response?.data || "Error fetching dashboard data");
      
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          // Unauthorized or forbidden, redirect to login
          navigate('/login');
        }
        else {
            toast.error('Network error. Please try again.');
          }
      
      setLoading(false);
    }
  };

  }








  const handleDeleteBlog = async (blogId) => {
    Swal.fire({
      title: "Do you want to delete this blog?",
      showDenyButton: true,
      
      confirmButtonText: "Yes",
      denyButtonText: "No"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await adminblogdatadelete(blogId); // Delete the blog
          Swal.fire('Blog Deleted!', '', 'success'); // Success message
          fetchDashboardData(); // Refresh blogs list
        } catch (error) {
          console.error('Error deleting blog:', error);
          Swal.fire('Failed to delete blog', '', 'error'); // Error message
        }
      
      }
    });
  };
  

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
       <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }
  
  return (
    <div className="p-6">
    <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

    {/* Overview Section */}
    {overview ? (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl">{overview.users}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Admins</h2>
          <p className="text-2xl">{overview.admins}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Banned Users</h2>
          <p className="text-2xl">{overview.bannedUsers}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Blogs</h2>
          <p className="text-2xl">{overview.blogs.total}</p>
        </div>
        <div className="bg-green-200 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Published</h2>
          <p className="text-2xl">{overview.blogs.published}</p>
        </div>
        <div className="bg-yellow-200 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Pending</h2>
          <p className="text-2xl">{overview.blogs.pending}</p>
        </div>
        <div className="bg-red-200 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Rejected</h2>
          <p className="text-2xl">{overview.blogs.rejected}</p>
        </div>
      </div>
    ) : (
      <p>Loading overview...</p>
    )}

    {/* Blogs Section */}
    <div>
      <h2 className="text-2xl font-bold mb-4">All Blogs</h2>
      {blogs.length > 0 ? (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="border p-4 rounded shadow-md flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{blog.title}</h3>
                <p className="text-gray-700 mt-2">Author: {blog.author?.name || 'Unknown'}</p>
                <p className="text-gray-500">Status: {blog.status}</p>
              </div>
              <button
                onClick={() => handleDeleteBlog(blog._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
  </div>
  );
};

export default AdminDashboard;
