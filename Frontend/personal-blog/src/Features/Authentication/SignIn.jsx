import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { UseRegister } from "../users/userQuery.js";


const SignIn = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: registerUser, isPending } = UseRegister();

  const onSubmit = (data) => {
    registerUser(data, {
      onSuccess: () => {
        reset();
        toast.success("Registered successfully!");
        navigate("/");
      },
      onError: (err) => {
        toast.error("Registration failed: " + err?.message || "Unknown error");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Create an Account</h2>
          <p className="text-sm text-gray-500">Register to get started</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="name"
              {...register("name")}
              type="text"
              required
              placeholder="Your username"
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              {...register("email")}
              type="email"
              required
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password */}
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
            {isPending ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?
          <Link to="/login" className="text-blue-600 hover:underline ml-1">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
