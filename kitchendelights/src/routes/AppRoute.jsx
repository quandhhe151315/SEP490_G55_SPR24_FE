import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import CreateNews from "../containers/News/CreateNews";
import ViewListNews from "../containers/News/ViewListNews";
import ViewListRecipes from "../containers/Recipe/ViewListRecipe";
import ShoppingCart from "../containers/ShoppingCart/ShoppingCart";
import RecipeDetail from "../containers/Recipe/RecipeDetail";
import MyProfile from "../containers/Account/MyProfile";
import ChangeMyProfile from "../containers/Account/ChangeMyProfile";
import ChangePassword from "../containers/Authentication/ChangePassword";
import BookMark from "../containers/BookMark/BookMark";
import CreateCategory from "../containers/DashBoard/Category/CreateCategory";
import UpdateCategory from "../containers/DashBoard/Category/UpdateCategory";
import CreateAccount from "../containers/Account/CreateAccount";
import ListAccount from "../containers/Account/ListAccount";
import ListCategoryDashboard from "../containers/DashBoard/Category/ListCategory";
import BlogDetail from "../containers/Blog/BlogDetail";
import CreateBlog from "../containers/Blog/CreateBlog";
import BlogList from "../containers/Blog/BlogList";
import DashboardMenu from "../components/Dashboard/Menu/DashboardMenu";
import ViewDetailNews from "../containers/News/ViewDetailNews";
import AddRecipeToMenuDialog from "../containers/Menu/AddRecipeToMenu";
import ListRecipeDashBoard from "../containers/DashBoard/Recipe/ListRecipe";

import ListCommentDashboard from "../containers/Comment/CommentList";
import UpDateCommentItem from "../containers/Comment/UpdateComment/UpDateCommentItem";
import ListNews from "../containers/News/ListNews";
import MenuDetail from "../containers/Menu/MenuDetail";
import CreateRecipe from "../containers/Recipe/CreateRecipe";
import ListBlogDashboard from "../containers/DashBoard/BlogManagent/BlogList";
import { Login } from "../containers/Authentication/Login";
import { Register } from "../containers/Authentication/Register";
import HomePage from "../containers/Home/HomePage";
import ViewDetailMenu from "../containers/Menu/ViewDetailMenu";
import DashBoard from "../containers/DashBoard/DashBoard";
import ChangeRole from "../containers/Account/ChangeRole";
import { DenyAccess } from "../containers/Authentication/DenyAccess";
import BecomeChef from "../containers/Account/BecomeChef";
import MarketplaceManagement from "../containers/MarketPlace/MarketplaceManagement";
import BlogUser from "../containers/Blog/BlogUser";

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
      path: "/ViewDetailNews/:id",
      element: <ViewDetailNews />,
    },
    {
      path: "/ViewListRecipes",
      element: <ViewListRecipes />,
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
      path: "/RecipeDetail/",
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
      path: "/UpdateCategory/:CategoryId",
      element: <UpdateCategory />,
    },
    {
      path: "/CreateAccount",
      element: <CreateAccount />,
    },
    {
      path: "/BookMark/",
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
      path: "/Dashboard",
      element: <DashboardMenu />,
    },
    {
      path: "/Menu",
      element: <AddRecipeToMenuDialog />,
    },
    {
      path: "/RecipeDetail/:recipeId",
      element: <RecipeDetail />,
    },
    {
      path: "/ListRecipeDashBoard",
      element: <ListRecipeDashBoard />,
    },
    {
      path: "/ListNews",
      element: <ListNews />,
    },
    {
      path: "/comment/test",
      element: <UpDateCommentItem />,
    },
    {
      path: "/comment/list",
      element: <ListCommentDashboard />,
    },
    {
      path: "/DashBoardMenu",
      element: <DashBoard/>,
    },
     {
      path: "/ChangeRole/:userId",
      element: <ChangeRole />,
    },
    {
      path: "/blog/management",
      element: <ListBlogDashboard />,
    },
    {
      path: "/ViewDetailMenu/:menuId",
      element: <ViewDetailMenu />,
    },
    {
      path: "/DenyAccess",
      element: <DenyAccess />,
    },
    { path: "/CreateRecipe", element: <CreateRecipe /> },
    { path: "/Login", element: <Login />},
    { path: "/Register", element: <Register />},
    { path: "/BecomeChef", element: <BecomeChef />},
    { path: "/Marketplace", element: <MarketplaceManagement />},
    { path: "/", element: <Navigate to="/KitchenDelights" /> },
    {
      path: "/myblog",
      element: <BlogUser />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default AppRoute;
