// src/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance.js';


const AdminDashboard = () => {
  const [overview, setOverview] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const [blogsRes, overviewRes] = await Promise.all([
        axiosInstance.get('/admin/dashboard'),
        axiosInstance.get('/admin/dashboard/overview')
      ]);

      setBlogs(blogsRes.data);
      setOverview(overviewRes.data);
      setLoading(false);
    } catch (error) {
      console.error(error.response?.data || "Error fetching dashboard data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl mt-2">{overview.users}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Admins</h2>
          <p className="text-2xl mt-2">{overview.admins}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Banned Users</h2>
          <p className="text-2xl mt-2">{overview.bannedUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Total Blogs</h2>
          <p className="text-2xl mt-2">{overview.blogs.total}</p>
        </div>
      </div>

      {/* Blogs Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Published Blogs</h2>
          <p className="text-2xl mt-2">{overview.blogs.published}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Pending Blogs</h2>
          <p className="text-2xl mt-2">{overview.blogs.pending}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Rejected Blogs</h2>
          <p className="text-2xl mt-2">{overview.blogs.rejected}</p>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">All Blogs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-gray-700">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Author</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="border-b">
                  <td className="py-2 px-4">{blog.title}</td>
                  <td className="py-2 px-4">{blog.author?.name || "Unknown"}</td>
                  <td className="py-2 px-4 capitalize">{blog.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {blogs.length === 0 && (
            <div className="text-center p-4">No blogs available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
