

import { CurrentUser, FetchAdminUser, loginOrRegisterGoogleUser, LoginUser, LogoutUser, MakeAdminUser, RegisterUser, updateUserFollow, updateUserUnFollow } from "./userAPI.js"
import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
//login
export const UseLogin=()=>useMutation({
    mutationFn:LoginUser
})

//registation
export const UseRegister=()=>useMutation({
    mutationFn:RegisterUser
})


//Logout
export const Uselogout = () => {
  return useMutation({
    mutationFn: LogoutUser,
  });
};

export const UseGoogleLogin=()=>{
  return useMutation({
    mutationFn:loginOrRegisterGoogleUser
    
  })
}



export const UseCurrentUser=()=>
    useQuery({
    queryKey:["currentUser"],
    queryFn:CurrentUser
    
})


export const useFetchUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: FetchAdminUser,
  });

// Admin: make admin
export const UseMakeAdmin = () =>
  useMutation({
    mutationFn: MakeAdminUser,
  });


  export const UseFollowUser = () =>
  useMutation({
    mutationFn: updateUserFollow,
  });


  export const UseUnfollowUser = () =>
  useMutation({
    mutationFn: updateUserUnFollow,
  });



// export const UseFollowUser = () => {
//   const queryClient = useQueryClient();
//   return useMutation(updateUserFollow, {
//     onMutate: (variables) => {
//       // Optional: optimistic update can be handled here
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['user'] });
//     },
//     onError: (error) => {
//       console.error('Follow failed', error);
//     },
//   });
// };

// export const UseUnfollowUser = () => {
//   const queryClient = useQueryClient();
//   return useMutation(updateUserUnFollow, {
//     onMutate: (variables) => {
//       // Optional: optimistic update can be handled here
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['user'] });
//     },
//     onError: (error) => {
//       console.error('Unfollow failed', error);
//     },
//   });
// };