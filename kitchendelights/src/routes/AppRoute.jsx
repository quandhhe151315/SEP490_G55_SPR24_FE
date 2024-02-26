import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import HomePage from "../containers/HomePage";
import CreateNews from "../containers/News/CreateNews";
import ViewListNews from "../containers/News/ViewListNews";
import ViewListRepice from "../containers/ViewListRepice";
import ShoppingCart from "../containers/ShoppingCart";
import RepiceDetail from "../containers/RepiceDetail";
import MyProfile from "../containers/Account/MyProfile";
import ChangeMyProfile from "../containers/Account/ChangeMyProfile";
import ChangePassword from "../containers/Authentication/ChangePassword";
import BlogList from "../containers/Blog/blogList";
import CreateCategory from "../containers/Category/CreateCategory";
import UpdateCategory from "../containers/Category/UpdateCategory";
import CreateAccount from "../containers/Account/CreateAccount";
import ListAccount from "../containers/Account/ListAccount";
import ListCategoryDashboard from "../containers/Category/ListCategory";
import BlogDetail from "../containers/Blog/blogDetail";

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
      element: <ViewListRepice />,
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
      path: "/ShoppingCart",
      element: <ShoppingCart />,
    },
    {
      path: "/RepiceDetail",
      element: <RepiceDetail />,
    },
    { path: "/", element: <Navigate to="/KitchenDelights" /> },
    { 
      path: "/blog/:slug",
      element: <BlogDetail />,
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
      path: "/ListAccount",
      element: <ListAccount />,
      path: "/ViewListCategory",
      element: <ListCategoryDashboard/>,
    },
    {path: "/", element: <Navigate to="/KitchenDelights" /> },
  ]);
  return <RouterProvider router={router} />;
}

export default AppRoute;
