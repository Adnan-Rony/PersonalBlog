import axiosInstance from "./axiosInstance.js";

//blogs api
export const getAllBlogs=()=> axiosInstance.get("/blogs")

export const getBlogById =(id)=> axiosInstance.get(`/blogs/${id}`)

export const createBlog =(blogData)=> axiosInstance.post("/blogs/create",blogData)

export const updateBlog =(id,updateData)=> axiosInstance.put(`/blogs/${id}`,updateData)



export const getMyBlogs = () => axiosInstance.get("/blogs/myblogs");
export const getMyBlogsbyid = (id) => axiosInstance.get(`/blogs/myblogs/${id}`);

export const postcomment=(blogId, content)=>axiosInstance.post(`/blogs/comments/${blogId}`,{content})

export const editblog = (id, updatedata) => axiosInstance.put(`/blogs/updateblogs/${id}`, updatedata);







//users api
export const getLoginuser=()=>axiosInstance.get("/users/me")

export const userprofileupdate=(id,updatedData)=>axiosInstance.put(`users/profile/${id}`,updatedData)



