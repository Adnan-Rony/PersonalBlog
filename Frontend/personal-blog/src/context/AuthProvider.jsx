import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
  } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";




export const Authcontext = createContext();
const auth = getAuth(app);


export const Authprovider = ({ children }) => {

  const [Firebaseuser, setFirebaseuser] = useState(null);
  const provider = new GoogleAuthProvider();

  // Logout

  const Firebaselogout = () => {
    return signOut(auth);
  };

  // SigninWithGoogle

  const googleSignIn=()=>{
    return signInWithPopup(auth,provider)
  }



  const Authinfo = {
    Firebaseuser,
    Firebaselogout,googleSignIn
  };

  // Observer Funtion
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setFirebaseuser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <Authcontext.Provider value={Authinfo}>{children}</Authcontext.Provider>
  );
};