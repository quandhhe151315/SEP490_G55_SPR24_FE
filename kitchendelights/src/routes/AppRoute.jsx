import React from "react";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "../containers/HomePage";
import CreateNews from "../containers/News/CreateNews";
import ViewListNews from "../containers/News/ViewListNews";
import ViewListRepice from "../containers/ViewListRepice";
import MyProfile from "../containers/Account/MyProfile";
import ChangeMyProfile from "../containers/Account/ChangeMyProfile";
import ChangePassword from "../containers/Authentication/ChangePassword";
import BlogList from "../containers/blog/blogList";
import BlogListUser from "../containers/blog/blogListUser/BlogListUser";
import CreateCategory from "../containers/Category/CreateCategory";
import UpdateCategory from "../containers/Category/UpdateCategory";

import CreateAccount from "../containers/Account/CreateAccount";
import ListCategoryDashboard from "../containers/Category/ListCategory";

function AppRoute() {
  const router = createBrowserRouter([
    {
      path: "/KitchenDelights",
      element: <HomePage />,
    },
    {
      path: "/CreateNews",
      element: <CreateNews />,
    },
    {
      path: "/ViewListNews",
      element: <ViewListNews />,
    },
    {
      path: "/ViewListRepice",
      element: <ViewListRepice/>,
    },
    
    {
      path: "/MyProfile",
      element: <MyProfile />,
    },
    {
      path: "/ChangeMyProfile",
      element: <ChangeMyProfile />,
    },
    {
      path: "/ChangePassword",
      element: <ChangePassword />,
    },
    {
      path: "/blog",
      element: <BlogList />,
    },
    {
      path: "/myblog",
      element: <BlogListUser />,
    },
    {
      path: "/CreateCategory",
      element: <CreateCategory/>,
    },
    {
      path: "/UpdateCategory",
      element: <UpdateCategory/>,
    },
    {
      path: "/CreateAccount",
      element: <CreateAccount />,
    },
    {
      path: "/ViewListCategory",
      element: <ListCategoryDashboard/>,
    },
    {path: "/", element: <Navigate to="/KitchenDelights" /> },
  ]);
  return <RouterProvider router={router}/>;
}

export default AppRoute;
