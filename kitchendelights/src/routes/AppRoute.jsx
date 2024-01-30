import React from "react";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "../containers/HomePage";
import CreateNews from "../containers/CreateNews";
import ViewListNews from "../containers/ViewListNews";

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


    {path: "/", element: <Navigate to="/KitchenDelights" /> },
  ]);
  return <RouterProvider router={router}/>;
}

export default AppRoute;
