import { LoginUser, LogoutUser, RegisterUser } from "./userAPI.js"
import { useMutation, useQuery } from "@tanstack/react-query";
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