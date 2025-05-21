import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/user-1.jpg";
import { UseCurrentUser, Uselogout } from "../../Features/users/userQuery.js";
import SearchBar from "../SearchBar.jsx";
import { HiOutlinePencilSquare } from "react-icons/hi2";

const Navvber = () => {
  const { data } = UseCurrentUser();
  const { mutate: logout, isLoading } = Uselogout();

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout clicked");
    logout(undefined, {
      onSuccess: () => {
        console.log("Logout successful, navigating...");
        navigate("/login");
      },
      onError: (error) => {
        console.error("Logout error:", error);
      },
    });
  };

  return (
    <header className="bg-white text-gray-900 sticky top-0 z-50 ">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between flex-nowrap px-4 py-2 lg:py-1">
        {/* Left: Logo */}
        <Link
          to="/"
          className="flex items-center flex-shrink-0 gap-1"
          aria-label="Go to homepage"
        >
          <h1 className="font-bold text- lg:text-3xl text-blue-600 whitespace-nowrap">
            <span>Dev</span>
            <span className="text-black">Thoughts</span>
          </h1>
        </Link>

        {/* Center: Search bar */}
        <div className="flex-grow min-w-0 mx-4">
          <SearchBar />
        </div>

        <div className="p-2 hidden md:block">
          <button
            onClick={() => {
              if (!data?.user) {
                navigate("/login");
              } else {
                navigate("/blog");
              }
            }}
            className="text-2xl text-gray-800 hover:text-blue-600"
            aria-label="Write Blog"
          >
            <HiOutlinePencilSquare />
          </button>
        </div>

        {/* Right: Profile */}
        <div className="flex-shrink-0">
          <div className="dropdown dropdown-center relative">
            <div
              tabIndex={0}
              className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-full"
            >
              <img
                src={img}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-white rounded-lg shadow-lg z-20 w-56 p-2 mt-2 right-0 absolute text-gray-800"
            >
              {!data ? (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="block px-4 py-2 hover:bg-gray-100 rounded"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/SignIn"
                      className="block px-4 py-2 hover:bg-gray-100 rounded"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              ) : (
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
                        to="/dashboard/admin"
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
    </header>
  );
};

export default Navvber;
