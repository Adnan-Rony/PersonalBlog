import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBlog, createBlogComment, fetchBlogId, fetchBlogRecommendation, fetchBlogs, fetchMyBlog, mydeleteBlog, searchBlog,   } from './blogAPI.js';



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
    mutationFn: mydeleteBlog,
    onSuccess: () => queryClient.invalidateQueries(["myBlogs"]),
    onError: (err) => console.error(" Delete Error:", err),
  });
};



export const UseSearchBlog = (searchTerm) => {
  return useQuery({
    queryKey: ["searchBlog", searchTerm],
    queryFn: () => searchBlog(searchTerm),
    enabled: !!searchTerm?.trim(), // prevents unnecessary queries
  });
};

export const UseBlogRecommendations = (blogId) => {
  return useQuery({
    queryKey: ['blogRecommendations', blogId],
    queryFn: () => fetchBlogRecommendation(blogId),
    enabled: !!blogId, // only run query if blogId is truthy
  });
};
