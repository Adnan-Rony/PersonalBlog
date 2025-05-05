import React, { useState } from "react";
import axios from "./../../../node_modules/axios/lib/axios";
import { USER_API_END_POINT } from "../../utils/Constant.js";
import toast from "react-hot-toast";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import GoogleSignIn from "./GoogleSignIn.jsx";
import axiosInstance from "../../api/axiosInstance.js";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
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
      const res = await axiosInstance.post(`${USER_API_END_POINT}/login`, input) 

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
        toast.error( "Login failed");
      }
  };
  

  return (
    <div className="w-full max-w-xs mx-auto mt-10">
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

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>




            







      </form>
      {/* Social Login Buttons */}
      <div className="flex justify-center space-x-4">
              {/* <button className="p-3 shadow-2xl rounded-lg hover:bg-gray-100 transition-all">
                <FaGoogle className="text-red-500" size={20} />
              </button> */}
              <GoogleSignIn></GoogleSignIn>
              <button className="p-3 shadow-2xl rounded-lg hover:bg-gray-100 transition-all">
                <FaFacebook className="text-blue-600" size={20} />
              </button>
              <button className="p-3 shadow-2xl rounded-lg hover:bg-gray-100 transition-all">
                <FaLinkedin className="text-blue-700" size={20} />
              </button>
            </div>
    </div>
  );
};

export default Login;
