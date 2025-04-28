import React, { useContext } from "react";
import { Authcontext } from "../../context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/Constant.js";
import { FaGoogle } from "react-icons/fa";

const GoogleSignIn = () => {
  const navigate = useNavigate();
  const { Firebaseuser, Firebaselogout, googleSignIn } = useContext(Authcontext);

  const handleGoogleSignin = () => {
    googleSignIn().then((result) => {
      console.log(result.user);

      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        //   profilePicture: result.user?.photoURL,
      };

      console.log("Sending to backend:", `${USER_API_END_POINT}/register`);

      axios
        .post(`${USER_API_END_POINT}/register`, userInfo)
        .then((response) => {
          console.log(response.data);
          navigate("/");
        })
        .catch((error) => {
          console.error(
            "Error while storing user info:",
            error.response || error
          );
        });
    });
  };
    
  return (
    <div>
      <button
        onClick={handleGoogleSignin}
        className="p-3 shadow-2xl rounded-lg hover:bg-gray-100 transition-all"
      >
        <FaGoogle className="text-red-500" size={20} />
      </button>
    </div>
  );
};

export default GoogleSignIn;
