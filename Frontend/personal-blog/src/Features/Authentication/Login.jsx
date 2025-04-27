import React, { useState } from "react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("Login Input:", input);

    // Validate fields before submitting
    if (!input.email || !input.password) {
      console.error("Please fill in all fields."); 
      // You can replace this with a toast or UI error message
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-10">
      <form onSubmit={handlesubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
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
    </div>
  );
};

export default Login;
