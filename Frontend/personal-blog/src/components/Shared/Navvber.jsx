import { FiPhoneCall } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

import img from "../../assets/user-1.jpg";
import { UseCurrentUser, Uselogout } from "../../Features/users/userQuery.js";
import SearchBar from "../SearchBar.jsx";
import { Link, useNavigate } from "react-router-dom";

const Navvber = () => {
  const { data } = UseCurrentUser();
  console.log(data);

  const { mutate: logout } = Uselogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate("/login"); // redirect after logout
      },
    });
  };

  return (
    <div className="bg-gray-100 text-white lg:p-2 px-2 rounded-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
        {/* Left Section: Logo */}
        <div className="flex items-center justify-between
         gap-4 ">
          <Link to="/" className="flex items-center gap-1 flex-shrink-0">
            <h1 className="font-bold lg:text-2xl whitespace-nowrap">
              <span className="text-blue-600">Dev</span>
              <span className="text-black">Thoughts</span>
            </h1>
          </Link>
          <div className=" lg:max-w-2xl ">
            <SearchBar />
          </div>
        </div>

        <div className="flex items-center gap-10 whitespace-nowrap ">
          {/* Profile Icon */}
          <div className="text-gray-700 cursor-pointer">
            <div className="dropdown dropdown-center">
              <div tabIndex={0} role="" className=" m-1">
                <img src={img} className="lg:w-10 w-8 rounded-full" alt="" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                {!data && (
                  <div>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/SingUp">SingUp</Link>
                    </li>
                  </div>
                )}
                {data && (
                  <>
                    <li className="px-4 py-2 border-b border-gray-200">
                      <button
                        className="w-full text-left font-semibold text-gray-800 hover:bg-gray-100 rounded"
                        disabled
                      >
                        {data.user?.name}
                      </button>
                    </li>

                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded transition"
                      >
                        Logout
                      </button>
                    </li>

                    {data.user?.role === "admin" && (
                      <li>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
                        >
                          Dashboard
                        </Link>
                      </li>
                    )}

                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
                      >
                        Profile
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/blog"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
                      >
                        Share Blog
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navvber;
