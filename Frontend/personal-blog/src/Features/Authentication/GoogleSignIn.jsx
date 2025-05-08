import React, { useContext } from "react";
import { Authcontext } from "../../context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/Constant.js";
import { FcGoogle } from "react-icons/fc";

const GoogleSignIn = () => {
  const navigate = useNavigate();
  const { Firebaseuser, Firebaselogout, googleSignIn } =
    useContext(Authcontext);

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
    <div className=" w-full  ">
<button
  onClick={handleGoogleSignin}
  className="p-2 w-full  flex items-center justify-center gap-2 rounded-2xl border  hover:bg-gray-300 transition-all"
>
  <FcGoogle  size={20} />
  Login with Google
</button>

    </div>
  );
};

export default GoogleSignIn;
