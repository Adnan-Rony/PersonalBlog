import axiosInstance from "./axiosInstance.js";


export const getAllBlogs=()=> axiosInstance.get("/blogs")

export const getBlogById =(id)=> axiosInstance.get(`/blogs/${id}`)

export const createBlog =(blogData)=> axiosInstance.post("/blogs/create",blogData)

export const updateBlog =(id,updateData)=> axiosInstance.put(`/blogs/${id}`,updateData)



export const getMyBlogs = () => axiosInstance.get("/blogs/myblogs");
export const getMyBlogsbyid = (id) => axiosInstance.get(`/blogs/myblogs/${id}`);



export const editblog = (id, updatedata) => axiosInstance.put(`/blogs/updateblogs/${id}`, updatedata);

export const myblogdelete=(blogId)=>axiosInstance.delete(`/blogs/myblogs/${blogId}`)






export const getAllUsers = () => axiosInstance.get('/users');

export const getLoginuser=()=>axiosInstance.get("/users/me")





export const getdataAdminDashboard=()=>axiosInstance.get("/admin/dashboard")
export const getdataAdminDashboardOverview=()=>axiosInstance.get("/admin/dashboard/overview")

export const adminblogdatadelete=(blogId)=>axiosInstance.delete(`/admin/blogs/${blogId}`)

export const makeadmin = (id) => axiosInstance.put(`/users/makeadmin/${id}`);


