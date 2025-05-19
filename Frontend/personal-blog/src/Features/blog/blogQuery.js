import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBlog, createBlogComment, fetchBlogId, fetchBlogs, fetchMyBlog, mydeleteProduct } from './blogAPI.js';



export const UseFetchBlog = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
   
  });
};


export const UseCreateBlog=()=>{
  return useMutation({
    mutationFn:createBlog
  })
}


export const UseFetchBlogById = (id) => {
  return useQuery({
    queryKey: ["blogs", id],
    queryFn: () => fetchBlogId(id),
     enabled: !!id,
   
  });
};



export const UseCreateBlogComment = () => {
  return useMutation({
    mutationFn: createBlogComment,
  });
};


export const UseFetchMyBlog = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: fetchMyBlog,
   
  });
};


export const UseDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mydeleteProduct,
    onSuccess: () => queryClient.invalidateQueries(["myBlogs"]),
    onError: (err) => console.error("❌ Delete Error:", err),
  });
};



