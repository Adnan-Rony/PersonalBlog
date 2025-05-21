
import axiosInstance from './../../api/axiosInstance';

export const LoginUser=async(user)=>{
    const res=await axiosInstance.post('/users/login',user)
    return res.data
}


export const RegisterUser=async(userId)=>{
    const res=await axiosInstance.post('/users/register',userId)
    return res.data
}

export const loginOrRegisterGoogleUser = async (userData) => {
  const response = await axiosInstance.post('/auth/google', userData);
  return response.data;
};



export const LogoutUser = async () => {
  try {
    console.log("Sending logout request...");
    const res = await axiosInstance.post('/users/logout');
    console.log("Logout API response:", res);


  } catch (error) {
    console.error("Logout error in API:", error);
    throw new Error(error.response?.data?.message || 'Logout failed');
  }
};




export const CurrentUser = async () => {
  const res = await axiosInstance.get('/users/me');
  return res.data;
};


export const MakeAdminUser=async({id,Updateduser})=>{
    const res=await axiosInstance.put(`/users/makeadmin/${id}`,Updateduser)
    return res.data
}

export const FetchAdminUser=async(userId)=>{
    const res=await axiosInstance.get('/users',userId)
    return res.data
}


export const userprofileupdate=(id,updatedData)=>axiosInstance.put(`users/profile/${id}`,updatedData)