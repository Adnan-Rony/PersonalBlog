import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Login from "../Features/Authentication/Login.jsx";
import SignIn from "../Features/Authentication/SignIn.jsx";
import Mainlayout from "../layout/Mainlayout.jsx";



export const AppRouter = createBrowserRouter([
    {
      path: "/",
      element: <Mainlayout />,
      children: [
        {
          path: "/",
          element: <Home />,
  
        },
        {
          path: "/login",
          element: <Login></Login>
  
        },
        {
          path: "/SignIn",
          element: <SignIn></SignIn>
  
        }
      ]
        
    }])