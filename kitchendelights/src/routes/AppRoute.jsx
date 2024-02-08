import React from "react";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "../containers/HomePage";
import CreateNews from "../containers/CreateNews";
import ViewListNews from "../containers/ViewListNews";
import MyProfile from "../containers/MyProfile";
import ChangeMyProfile from "../containers/ChangeMyProfile";
import ChangePassword from "../containers/ChangePassword";

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
    {path: "/", element: <Navigate to="/KitchenDelights" /> },
  ]);
  return <RouterProvider router={router}/>;
}

export default AppRoute;
