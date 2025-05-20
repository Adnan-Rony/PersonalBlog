

import { CurrentUser, FetchAdminUser, LoginUser, LogoutUser, MakeAdminUser, RegisterUser } from "./userAPI.js"
import { useMutation, useQuery, } from "@tanstack/react-query";
//login
export const UseLogin=()=>useMutation({
    mutationFn:LoginUser
})

//registation
export const UseRegister=()=>useMutation({
    mutationFn:RegisterUser
})


//Logout
export const Uselogout=()=>useMutation({
    mutationFn:LogoutUser
})


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



