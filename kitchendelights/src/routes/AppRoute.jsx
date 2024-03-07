import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import HomePage from "../containers/HomePage";
import CreateNews from "../containers/News/CreateNews";
import ViewListNews from "../containers/News/ViewListNews";
import ViewListRepice from "../containers/Recipe/ViewListRecipe";
import ShoppingCart from "../containers/ShoppingCart/ShoppingCart";
import RecipeDetail from "../containers/Recipe/RecipeDetail";
import MyProfile from "../containers/Account/MyProfile";
import ChangeMyProfile from "../containers/Account/ChangeMyProfile";
import ChangePassword from "../containers/Authentication/ChangePassword";
import BookMark from "../containers/BookMark/BookMark";
import CreateCategory from "../containers/Category/CreateCategory";
import UpdateCategory from "../containers/Category/UpdateCategory";
import CreateAccount from "../containers/Account/CreateAccount";
import ListAccount from "../containers/Account/ListAccount";
import ListCategoryDashboard from "../containers/Category/ListCategory";
import BlogDetail from "../containers/Blog/BlogDetail";
import CreateBlog from "../containers/Blog/CreateBlog";
import BlogList from "../containers/Blog/BlogList";
import DashboardMenu from "../components/Dashboard/Menu/DashboardMenu";
import ViewDetailNews from "../containers/News/ViewDetailNews";
import ListCommentDashboard from "../containers/Comment/CommentList";

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
      path: "/ViewDetailNews",
      element: <ViewDetailNews/>,
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
      path: "/RecipeDetail",
      element: <RecipeDetail />,
    },
    { path: "/", element: <Navigate to="/KitchenDelights" /> },
    {
      path: "/blog/:slug",
      element: <BlogDetail />,
    },
    {
      path: "/blog/create",
      element: <CreateBlog />,
    },

    {
      path: "/CreateCategory",
      element: <CreateCategory />,
    },
    {
      path: "/UpdateCategory/:categoryId",
      element: <UpdateCategory />,
    },
    {
      path: "/CreateAccount",
      element: <CreateAccount />,
    },
    {
      path: "/BookMark",
      element: <BookMark />,
    },
    {
      path: "/ListAccount",
      element: <ListAccount />,
    },
    {
      path: "/ViewListCategory",
      element: <ListCategoryDashboard />,
    },
    {
      path: "/DashboardMenu",
      element: <DashboardMenu />,
    },
    {
      path: "/comment/list",
      element: <ListCommentDashboard />,
    },
    

    { path: "/", element: <Navigate to="/KitchenDelights" /> },
  ]);
  return <RouterProvider router={router} />;
}

export default AppRoute;