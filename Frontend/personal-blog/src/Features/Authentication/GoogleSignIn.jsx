import React, { useContext } from "react";
import { Authcontext } from "../../context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { UseGoogleLogin } from "../users/userQuery.js";



const GoogleSignIn = () => {
  const navigate = useNavigate();
  const { googleSignIn } = useContext(Authcontext);
  const { mutate: googleLoginMutation } = UseGoogleLogin();

  const handleGoogleSignin = () => {
    googleSignIn()
      .then((result) => {
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
        };

        // Call your mutation here:
        googleLoginMutation(userInfo, {
          onSuccess: (data) => {
            console.log("Backend login/register success:", data);
            navigate("/"); // Redirect on success
          },
          onError: (error) => {
            console.error("Backend login/register error:", error);
          },
        });
      })
      .catch((err) => {
        console.error("Firebase Google sign-in error:", err);
      });
  };

  return (
    <div className="w-full">
      <button
        onClick={handleGoogleSignin}
        className="p-2 w-full flex items-center justify-center gap-2 rounded-2xl border hover:bg-gray-300 transition-all"
      >
        <FcGoogle size={20} />
        Login with Google
      </button>
    </div>
  );
};

export default GoogleSignIn;
