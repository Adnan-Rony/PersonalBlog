import { createBrowserRouter } from "react-router-dom";

import Login from "../Features/Authentication/Login.jsx";
import SignIn from "../Features/Authentication/SignIn.jsx";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import Mainlayout from "../layout/Mainlayout.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import Home from "../pages/Home.jsx";




import ExploreTags from "../components/blog/ExploreTags.jsx";
import SingleBlog from "./../pages/SingleBlog";
import ProfileInfo from "../pages/ProfileInfo.jsx";

import BlogEditorUpdate from "../pages/BlogEditorUpdate.jsx";
import BlogEditor from "../pages/BlogEditor.jsx";
import CategoryPage from "../pages/CategoryPage.jsx";
import AllBlogs from "../pages/AllBlogs.jsx";
import ContactSection from './../pages/ContactUs';

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
        element: <BlogEditor></BlogEditor>
      },
      {
        path: "/allblogs",
        element: <AllBlogs/>
      },
      {
        path: "/contact",
        element: <ContactSection/>
      },
    
      {
        path: "/blogs/:id",
        element: <SingleBlog/>
      },

      {
        path: "/alltags",
        element: <ExploreTags/>
      },
      {
        path: "/profile",
        element: <ProfileInfo/>
      },
      {
        path: "/categories",
        element: <CategoryPage/>
      },
      {
        path: "/blogs/update/:blogId",
        element: <BlogEditorUpdate></BlogEditorUpdate>
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
