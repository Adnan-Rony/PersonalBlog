import axiosInstance from "./axiosInstance.js";

//blogs api
export const getAllBlogs=()=> axiosInstance.get("/blogs")

export const getBlogById =(id)=> axiosInstance.get(`/blogs/${id}`)

export const createBlog =(blogData)=> axiosInstance.post("/blogs",blogData)

export const updateBlog =(id,updateData)=> axiosInstance.put(`/blogs/${id}`,updateData)


export const getMyBlogs = () => axiosInstance.get("/blogs/myblogs");


//users api
export const getuser=()=>axiosInstance.get("/users/me")

export const userprofileupdate=(id,updatedData)=>axiosInstance.put(`/profile/${id}`,updatedData)

