import { createBrowserRouter } from "react-router-dom";

import Login from "../Features/Authentication/Login.jsx";
import SignIn from "../Features/Authentication/SignIn.jsx";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import Mainlayout from "../layout/Mainlayout.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import Home from "../pages/Home.jsx";

import AllBlogs from "../pages/AllBlogs.jsx";
import RichTextEditor from "./../components/blog/Blog";

import ExploreTags from "../components/blog/ExploreTags.jsx";
import SingleBlog from "./../pages/SingleBlog";
import ProfileInfo from "../pages/ProfileInfo.jsx";

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
        element: <Login/>
      },
      {
        path: "/SignIn",
        element: <SignIn/>
      },
     
      {
        path: "/blog",
        element: <RichTextEditor/>
      },
    
      {
        path: "/blogs/:id",
        element: <SingleBlog/>
      },
      // {
      //   path:"/blogs/:id",
      //   element: <SingleBlog></SingleBlog>,
      // },
      {
        path: "/alltags",
        element: <ExploreTags/>
      },
      {
        path: "/profile",
        element: <ProfileInfo/>
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout/>,
    children: [
      {
        path: "/dashboard/admin",
        element: <AdminDashboard/>
      },
    ],
  },
]);
