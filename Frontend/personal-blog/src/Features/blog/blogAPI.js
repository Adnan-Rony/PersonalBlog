import axiosInstance from "../../api/axiosInstance.js"

export const fetchBlogs=async()=>{
    const res=await axiosInstance.get('/blogs')
    console.log(res.data)
    return res.data
}

export const fetchBlogId = async (id) => {
  const res = await axiosInstance.get(`/blogs/${id}`);
  return res.data;
};

export const createBlog=async(productData)=>{
    const res=await axiosInstance.post('/blogs/create',productData)
    return res.data
}

export const updateBlog=async({id,updatedData})=>{
    const res=await axiosInstance.put(`/blogs/${id}`,updatedData)
    return res.data
}

export const fetchMyBlog=async()=>{
    const res=await axiosInstance.get('/blogs/myblogs')
    return res.data
}

//personal
export const fetchmyBlogId = async (id) => {
  const res = await axiosInstance.get(`/blogs/myblogs/${id}`);
  return res.data;
};



export const createBlogComment = async ({ id, comment }) => {
  const res = await axiosInstance.post(`/blogs/comments/${id}`, { comment });
  return res.data;
};



export const updateMyBlog=async({id,updatedData})=>{
    const res=await axiosInstance.put(`/blogs/updateblogs/${id}`,updatedData)
    return res.data
}


export const mydeleteProduct=async(id)=>{
    const res=await axiosInstance.delete(`/blogs/myblogs/${id}`)
    return res.data
}

export const postcomment=(blogId, content)=>axiosInstance.post(`/blogs/comments/${blogId}`,{content})