import { createBrowserRouter } from "react-router-dom";
import Profile from "../components/Profile/Profile.jsx";
import Login from "../Features/Authentication/Login.jsx";
import SignIn from "../Features/Authentication/SignIn.jsx";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import Mainlayout from "../layout/Mainlayout.jsx";
import AdminDashboard from "../pages/Dashboard.jsx";
import Home from "../pages/Home.jsx";

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
        element: <Login></Login>,
      },
      {
        path: "/SignIn",
        element: <SignIn></SignIn>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard/admin",
        element: <AdminDashboard></AdminDashboard>,
      },
    ],
  },
]);
