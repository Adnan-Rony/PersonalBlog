import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/Constant.js";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import img from "../../assets//11785899_4826435.jpg";
import { useForm } from "react-hook-form";
import { UseRegister } from "../users/userQuery.js";
import { useState } from "react";
import toast from "react-hot-toast";

const SignIn = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: registerUser, isPending } = UseRegister();

  const onSubmit = (data) => {
    registerUser(data, {
      onSuccess: () => {
        reset(); // Reset form on success
        toast.success("registered successfully");
        navigate("/");
        console.log("User registered successfully");
      },
      onError: (err) => {
        toast.error("register failed!",err.message);
      },
    });
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-screen items-center">
      {/* Right Side */}
      <div className="w-full max-w-md mx-auto p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              User Name
            </label>
            <input
              {...register("name")}
              type="text"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              {...register("email")}
              type="text"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <label className="block mb-1 font-medium text-sm text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              required
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
              {isPending ? "Registering..." : "Register"}
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
        <img className="max-w-md" src={img} />
      </div>
    </div>
  );
};

export default SignIn;
