import axiosInstance from "../../api/axiosInstance.js";

export const getdataAdminDashboard=()=>axiosInstance.get("/admin/dashboard")
export const getdataAdminDashboardOverview=()=>axiosInstance.get("/admin/dashboard/overview")

export const adminblogdatadelete=(blogId)=>axiosInstance.delete(`/admin/blogs/${blogId}`)

export const makeadmin = (id) => axiosInstance.put(`/users/makeadmin/${id}`);

export const getAllUsers = () => axiosInstance.get('/users');

export const getLoginuser=()=>axiosInstance.get("/users/me")

