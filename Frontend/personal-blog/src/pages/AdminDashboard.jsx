import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import {
  adminblogdatadelete,
  getAllUsers,
  getdataAdminDashboard,
  getdataAdminDashboardOverview,
  getLoginuser,
  makeadmin,
} from "../api/blogApi.js";
import Seo from "../components/Seo.jsx";

const AdminDashboard = () => {
  const [overview, setOverview] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      const [blogsRes, overviewRes, userRes, UsersRes] = await Promise.all([
        getdataAdminDashboard(),
        getdataAdminDashboardOverview(),
        getLoginuser(),
        getAllUsers(),
      ]);

      setBlogs(blogsRes.data);
      setOverview(overviewRes.data);
      setUser(userRes.data);
      setUsers(UsersRes.data);
      setLoading(false);
    } catch (error) {
      console.error(error.response?.data || "Error fetching dashboard data");
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        navigate("/login");
      } else {
        toast.error("Network error. Please try again.");
        setLoading(false);
      }
    }
  };

  const handleDeleteBlog = async (blogId) => {
    Swal.fire({
      title: "Do you want to delete this blog?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await adminblogdatadelete(blogId);
          Swal.fire("Blog Deleted!", "", "success");
          fetchDashboardData();
        } catch (error) {
          console.error("Error deleting blog:", error);
          Swal.fire("Failed to delete blog", "", "error");
        }
      }
    });
  };

  const handleMakeAdmin = async (id) => {
    try {
      const res = await makeadmin(id);
      toast.success(res.data.message);
      fetchDashboardData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to make admin");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
       <Seo
      title="DevThought | Admin Dashboard  "
      description="Explore all blog posts on various topics including tech, life, and tips. Stay informed with our latest posts."
    />
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white shadow-md p-4 md:p-6">
        <div className="mb-6">
          {user && <p className="text-gray-600">Welcome, {user.user.name}</p>}
        </div>
        <nav className="flex md:flex-col gap-2">
          <button
            className={`w-full text-left px-3 py-2 rounded ${
              activeTab === "overview"
                ? "bg-black text-white"
                : "hover:bg-blue-100"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`w-full text-left px-3 py-2 rounded ${
              activeTab === "blogs"
                ? "bg-black text-white"
                : "hover:bg-blue-100"
            }`}
            onClick={() => setActiveTab("blogs")}
          >
            All Blogs
          </button>
          <button
            className={`w-full text-left px-3 py-2 rounded ${
              activeTab === "users"
                ? "bg-black text-white"
                : "hover:bg-blue-100"
            }`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        {activeTab === "overview" && overview && (
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-4">
              Dashboard Overview
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-blue-100 p-4 rounded shadow">
                <h2 className="text-base font-semibold">Total Users</h2>
                <p className="text-xl">{overview.users}</p>
              </div>
              <div className="bg-green-100 p-4 rounded shadow">
                <h2 className="text-base font-semibold">Admins</h2>
                <p className="text-xl">{overview.admins}</p>
              </div>
              <div className="bg-red-100 p-4 rounded shadow">
                <h2 className="text-base font-semibold">Banned Users</h2>
                <p className="text-xl">{overview.bannedUsers}</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded shadow">
                <h2 className="text-base font-semibold">Total Blogs</h2>
                <p className="text-xl">{overview.blogs.total}</p>
              </div>
              <div className="bg-green-200 p-4 rounded shadow">
                <h2 className="text-base font-semibold">Published</h2>
                <p className="text-xl">{overview.blogs.published}</p>
              </div>
              <div className="bg-yellow-200 p-4 rounded shadow">
                <h2 className="text-base font-semibold">Pending</h2>
                <p className="text-xl">{overview.blogs.pending}</p>
              </div>
              <div className="bg-red-200 p-4 rounded shadow col-span-full sm:col-span-1">
                <h2 className="text-base font-semibold">Rejected</h2>
                <p className="text-xl">{overview.blogs.rejected}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "blogs" && (
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4">All Blogs</h2>
            {blogs.length > 0 ? (
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="p-4 rounded shadow bg-white flex flex-col sm:flex-row sm:justify-between sm:items-center"
                  >
                    <div>
                      <h3 className="text-lg font-semibold">{blog.title}</h3>
                      <p className="text-gray-700 mt-1">
                        Author: {blog.author?.name || "Unknown"}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Status: {blog.status}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteBlog(blog._id)}
                      className="mt-2 sm:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
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
        )}

        {activeTab === "users" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">All Users</h1>
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="p-4 bg-white rounded shadow flex justify-between items-center"
                >
                  <div>
                    <p className="text-lg font-medium">{user.name}</p>
                    <p className="text-gray-500">Email: {user.email}</p>
                    <p className="text-gray-500">Role: {user.role}</p>
                  </div>
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="bg-black hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Make Admin
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
