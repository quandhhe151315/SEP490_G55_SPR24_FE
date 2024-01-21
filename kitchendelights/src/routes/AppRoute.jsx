import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../containers/HomePage";

function AppRoute() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
  ]);
  return <RouterProvider router={router}/>;
}

export default AppRoute;
