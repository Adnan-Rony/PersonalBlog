import axios from 'axios/unsafe/axios.js';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '../../utils/Constant.js';

const SignIn = () => {

    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
      });

      const navigate = useNavigate();

      const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
      };
    
      

      const handlesubmit = async (e) => {
        e.preventDefault();
    
        // Validate fields before submitting
        if (!input.name || !input.email || !input.password) {
          toast.error("Please fill in all fields.");
          return;
        }
    
        try {
          const formData = new FormData();
          formData.append('name', input.name);
          formData.append('email', input.email);
          formData.append('password', input.password);
         
    
          const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });
    
          console.log("Response Data:", res.data); // Debugging
    
          if (res.status === 200 && res.data.success) {
            toast.success("Registration successful!");
            navigate("/login"); // Redirect to login page
          } else {
            // If success: false or something went wrong
            toast.error(res.data.message || "Registration failed.");
          }
    
        } catch (err) {
            console.error("Error:", err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Registration failed. Please try again.");
          }
      }





    return (
        <div className="w-full max-w-xs mx-auto mt-10">
      <form onSubmit={handlesubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            UserName
          </label>
          <input
            type="name"
            name="name"
            value={input.name}
            onChange={changeEventHandler}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Username"
          />
        </div>
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
            placeholder="Email"
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
            Register
          </button>
        </div>
      </form>
    </div>
    );
};

export default SignIn;