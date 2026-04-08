import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { UseLogin } from "../users/userQuery.js";

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
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a12] px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-[#11111c] border border-white/10 rounded-2xl p-8 shadow-xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome Back 
          </h2>
          <p className="text-gray-400 text-sm">
            Login to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              required
              placeholder="you@example.com"
              className="w-full bg-[#0f0f18] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm text-gray-400 mb-2">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              required
              placeholder="••••••••"
              className="w-full bg-[#0f0f18] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[42px] cursor-pointer text-gray-500 hover:text-orange-400"
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600 transition font-semibold text-white shadow-lg shadow-orange-500/20 disabled:opacity-50"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-gray-400">
          Don’t have an account?
          <Link
            to="/SignIn"
            className="text-orange-400 hover:text-orange-500 ml-1 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;