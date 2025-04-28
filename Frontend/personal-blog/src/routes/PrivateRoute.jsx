import { useContext } from "react";
import { Authcontext } from "./../context/AuthProvider";
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(Authcontext);

  if (!user) {
    // If not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  return children; // If logged in, show the requested page
};

export default PrivateRoute;
