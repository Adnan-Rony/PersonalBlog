import axios from "axios/unsafe/axios.js";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/Constant.js";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import img from "../../assets//11785899_4826435.jpg"


const SignIn = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
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
      formData.append("name", input.name);
      formData.append("email", input.email);
      formData.append("password", input.password);

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
      toast.error(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-screen items-center">

        {/* Right Side */}
    <div className="w-full max-w-md mx-auto p-4">
      <form onSubmit={handlesubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">User Name</label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={changeEventHandler}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label className="block mb-1 font-medium text-sm text-gray-700">Password</label>
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
            Register
          </button>
        </div>
      </form>
      <div className="my-4">
        <p>
          Already have an account?
          <Link className="text-blue-600 ml-2" to="/login">
            Log In
          </Link>
        </p>
      </div>
    </div>
    {/* right Side - Hidden on small screens */}
    <div className="hidden lg:flex justify-center items-center p-8">
      <img className="max-w-md" src={img}  />
    </div>

  


  </div>
  );
};

export default SignIn;
