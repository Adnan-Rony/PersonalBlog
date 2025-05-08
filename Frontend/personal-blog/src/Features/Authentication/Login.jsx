import React, { useState } from "react";
import axios from "./../../../node_modules/axios/lib/axios";
import { USER_API_END_POINT } from "../../utils/Constant.js";
import toast from "react-hot-toast";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import GoogleSignIn from "./GoogleSignIn.jsx";
import axiosInstance from "../../api/axiosInstance.js";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import img from "../../assets/7070629_3293465.jpg"
const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  // Handle input changes
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    // Validate fields before submitting
    if (!input.email || !input.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const res = await axiosInstance.post(
        `${USER_API_END_POINT}/login`,
        input
      );

      console.log("Response Data:", res.data); // Debugging

      if (res.status === 200 && res.data.success) {
        toast.success("Login successful!");
        navigate("/"); // Redirect to home or dashboard page
      } else {
        // If success: false or something went wrong
        toast.error(res.data.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      toast.error("Login failed");
    }
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-screen items-center ">
 
  
    {/* Left Side - Always visible */}
    <div className="w-full max-w-md mx-auto my-10 lg:p-0 p-6">
      <div className=" space-y-2">
        <p className="text-3xl font-semibold ">Welcome Back!</p>
        <p>Continue with Google or enter your details</p>
      </div>
  
      <div className="my-6">
        <GoogleSignIn />
      </div>
  
      <form onSubmit={handlesubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Username"
          />
        </div>
  
        <div className="mb-4 relative">
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 cursor-pointer text-sm text-blue-600"
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </span>
        </div>
  
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="hover:bg-black hover:text-white text-black border w-full p-2 rounded-full focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </form>
  
      <div className="mt-4">
        <p>
          Don't have an account?{" "}
          <Link className="link ml-2 text-blue-600" to="/SignIn">
            Sign up
          </Link>
        </p>
      </div>
    </div>

       {/*  Right Side - Hidden on small screens */}
       <div className="hidden lg:flex justify-center items-center p-8">
      <div className="text-center">
        <img className="max-w-xl" src={img} alt="" />
      </div>
    </div>
  </div>
  
  );
};

export default Login;
