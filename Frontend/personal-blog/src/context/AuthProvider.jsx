import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/Constant";

export const Authcontext = createContext();
const auth = getAuth(app);

export const Authprovider = ({ children }) => {
  const [Firebaseuser, setFirebaseuser] = useState(null);
  const [user, setUser] = useState(null); // ✅ Backend user
  const provider = new GoogleAuthProvider();

  // Logout
  const Firebaselogout = async () => {
    await signOut(auth);
    setFirebaseuser(null);
    setUser(null); // Clear backend user
  };

  // Sign in with Google
  const googleSignIn = () => {
    return signInWithPopup(auth, provider);
  };

  // ✅ Fetch backend user after login
  const fetchBackendUser = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/me`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch backend user:", error);
      setUser(null);
    }
  };

  // Observe Firebase user changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setFirebaseuser(currentUser);
      if (currentUser) {
        await fetchBackendUser(); // 🔄 Auto-fetch backend user when logged in
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const Authinfo = {
    Firebaseuser,
    user, // ✅ expose backend user
    Firebaselogout,
    googleSignIn,
    fetchBackendUser, // ✅ expose for manual refresh
  };

  return (
    <Authcontext.Provider value={Authinfo}>
      {children}
    </Authcontext.Provider>
  );
};
