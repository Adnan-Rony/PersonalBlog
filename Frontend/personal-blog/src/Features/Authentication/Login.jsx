import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-hot-toast";

import { UseLogin } from "../users/userQuery.js";
// import GoogleSignIn from "./GoogleSignIn.jsx";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const { mutate: loginUser, isPending } = UseLogin();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    loginUser(data, {
      onSuccess: () => {
        reset();
        toast.success("Login successful!");
        navigate("/");
      },
      onError: (err) => {
        toast.error("Login failed: " + (err?.message || "Invalid credentials"));
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500">Login to your account</p>
        </div>

        {/* Optional Google Login */}
        {/* <div className="mb-6">
          <GoogleSignIn />
        </div> */}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              required
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              required
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[40px] cursor-pointer text-gray-500"
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?
          <Link to="/SignIn" className="text-blue-600 hover:underline ml-1">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
