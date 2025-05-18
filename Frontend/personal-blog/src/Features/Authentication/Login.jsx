import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import GoogleSignIn from "./GoogleSignIn.jsx";

import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import img from "../../assets/7070629_3293465.jpg";
import { UseLogin } from "../users/userQuery.js";
import { toast } from "react-hot-toast";

const Login = () => {
  const { mutate: loginUser, isPending } = UseLogin();
  const { register, handleSubmit, reset } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    loginUser(data, {
      onSuccess: () => {
        reset();
        toast.success("Login SuccessFul!");
        navigate("/");
        console.log("User logged in successfully", data);
      },
      onError: () => {
        toast.error("Login Failed !");
      },
    });
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              required
              {...register("email")}
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder=" your email"
            />
          </div>

          <div className="mb-4 relative">
            <label className="block mb-1 font-medium text-sm text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              required
              {...register("password")}
              placeholder=" your password"
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
              disabled={isPending}
              className="hover:bg-black hover:text-white text-black border w-full p-2 rounded-full focus:outline-none focus:shadow-outline"
            >
              {isPending ? "Logging in..." : "Login"}
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
