import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { UseRegister } from "../users/userQuery.js";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
        const message =
          err?.response?.data?.message || err?.message || "Unknown error";
        toast.error(message);
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
            Create Account 
          </h2>
          <p className="text-gray-400 text-sm">
            Start your journey with us
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Username */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Username
            </label>
            <input
              {...register("name", { required: "Username is required" })}
              type="text"
              placeholder="Your username"
              className="w-full bg-[#0f0f18] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="you@example.com"
              className="w-full bg-[#0f0f18] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm text-gray-400 mb-2">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "At least 8 characters",
                },
                validate: {
                  hasUpperCase: (value) =>
                    /[A-Z]/.test(value) || "1 uppercase required",
                  hasLowerCase: (value) =>
                    /[a-z]/.test(value) || "1 lowercase required",
                  hasNumber: (value) =>
                    /\d/.test(value) || "1 number required",
                  hasSpecialChar: (value) =>
                    /[!@#$%^&*]/.test(value) || "1 special character required",
                },
              })}
              placeholder="••••••••"
              className="w-full bg-[#0f0f18] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[42px] cursor-pointer text-gray-500 hover:text-orange-400"
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </span>

            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600 transition font-semibold text-white shadow-lg shadow-orange-500/20 disabled:opacity-50"
          >
            {isPending ? "Registering..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-gray-400">
          Already have an account?
          <Link
            to="/login"
            className="text-orange-400 hover:text-orange-500 ml-1 font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;