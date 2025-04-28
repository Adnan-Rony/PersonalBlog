import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { USER_API_END_POINT } from "../../utils/Constant.js";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Authcontext } from "../../context/AuthProvider.jsx";

const Navber = () => {
  const { Firebaseuser, Firebaselogout } = useContext(Authcontext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${USER_API_END_POINT}/me`, {
          withCredentials: true, // Send cookie
        });

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setUser(null); // No user or invalid token
        }
      } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
        setUser(null); // Clear user on error (e.g., invalid/expired token)
      }
    };

    fetchUser();
  }, []);

  const logoutHandler = async () => {
    try {
      await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      setUser(null); // Clear user from state
      navigate("/login"); // Redirect to login page
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
          <small className="flex justify-center items-center">
            {Firebaseuser?.displayName || Firebaseuser?.email}
            {user ? user.name : ""}
          </small>

          {/* Displaying Avatar if logged in (either via Firebase or Manual Login) */}
          {user || Firebaseuser ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                   
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>
                    <button onClick={logoutHandler}>Logout</button>
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <button className="bg-black text-white px-4 py-2 rounded">
              <NavLink to="/login">Login</NavLink>
            </button>
          )}

          {/* Firebase Logout Button */}
          {Firebaseuser && (
            <button
              onClick={Firebaselogout}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navber;
