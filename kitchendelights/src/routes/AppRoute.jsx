import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  redirect,
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
import RecipeByFilter from "../components/RecipeByFilterList";
import DetailMarketplace from "../containers/MarketPlace/DetailMarketplace";
import ChefManagement from "../containers/Account/ChefManagement";
import ViewAdvertisement from "../containers/Advertisement/ViewAdvertisement";
import MyRecipe from "../containers/Recipe/MyRecipe";
import CreateAdvertisement from "../containers/Advertisement/CreateAdvertisement";
import UpdateAdvertisement from "../containers/Advertisement/UpdateAdvertisement";
import { ForgotPassword } from "../containers/Authentication/ForgotPassword";
import HistoryPayment from "../containers/ShoppingCart/HistoryPayment";
import RecipeBought from "../containers/Recipe/RecipeBought";
import Ticket from "../containers/ShoppingCart/Ticket";
import SearchItemAll from "../components/searchItemAll";
import { useGetProfile } from "../hook/useGetProfile";
import Cookies from "js-cookie";
import NotAuthorication from "../containers/403";
function AppRoute() {
  const userId = Cookies.get("userId");
  const { profile } = useGetProfile(userId);
  const roleId = profile?.role?.roleId;

  const router = createBrowserRouter([
    {
      path: "/KitchenDelights",
      element: <HomePage />,
    },
    {
      path: "/CreateNews",
      element: <CreateNews />,
      loader: async () => {
        if (Cookies.get("userIdExist") !== true) {
          return redirect("/403");
        }
        else if(Cookies.get("role") !== "Writer"){
          return redirect("/403");
        }
        return null;
      }
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
      path: "/DetailMarketplace/:id",
      element: <DetailMarketplace />,
      loader: async () => {
        if (Cookies.get("userIdExist") !== true) {
          return redirect("/403");
        }
        else if(Cookies.get("role") !== "Administrator" || Cookies.get("role") !== "Moderator"){
          return redirect("/403");
        }
        return null;
      }
    },
    {
      path: "/ViewListRecipes",
      element: <ViewListRecipes />,
    },

    {
      path: "/MyProfile",
      element: <MyProfile />,
      loader: async () => {
          if (Cookies.get("userIdExist") !== true) {
            return redirect("/403");
          }
          return null;
        }
    },
    {
      path: "/ChangeMyProfile",
      element: <ChangeMyProfile />,
      loader: async () => {
        if (Cookies.get("userIdExist") !== true) {
          return redirect("/403");
        }
        return null;
      }
    },
    {
      path: "/ChangePassword",
      element: <ChangePassword />,
      loader: async () => {
        if (Cookies.get("userIdExist") !== true) {
          return redirect("/403");
        }
        return null;
      }
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

    // ads
    {
      path: "/AdsManagement",
      element: <ViewAdvertisement />,
      loader: async () => {
        if (!!roleId) {
          if (roleId !== 1 && roleId !== 2) {
            return redirect("/403");
          }
          return null;
        }
        return null;
      },
    },

    {
      path: "/CreateAdvertisement",
      element: <CreateAdvertisement />,
    },

    {
      path: "/UpdateAdvertisement/:advertisementId",
      element: <UpdateAdvertisement />,
    },
    {
      path: "/CreateCategory",
      element: <CreateCategory />,
      loader: async () => {
        if (!!roleId) {
          if (roleId !== 1 && roleId !== 2) {
            return redirect("/403");
          }
          return null;
        }else{
          return redirect("/403");
        }
      },
    },
    {
      path: "/UpdateCategory/:CategoryId",
      element: <UpdateCategory />,
    },
    {
      path: "/CreateAccount",
      element: <CreateAccount />,
      loader: async () => {
        if (Cookies.get("userIdExist") !== true) {
          return redirect("/403");
        }
        else if(Cookies.get("role") !== "Administrator"){
          return redirect("/403");
        }
        return null;
      }
    },
    {
      path: "/BookMark/",
      element: <BookMark />,
    },
    {
      path: "/ListAccount",
      element: <ListAccount />,
      loader: async () => {
        if (Cookies.get("userIdExist") !== true) {
          return redirect("/403");
        }
        else if(Cookies.get("role") !== "Administrator" || Cookies.get("role") !== "Moderator"){
          return redirect("/403");
        }
        return null;
      }
    },
    {
      path: "/ViewListCategory",
      element: <ListCategoryDashboard />,
      loader: async () => {
        if (!!roleId) {
          if (roleId !== 1 && roleId !== 2) {
            return redirect("/403");
          }
          return null;
        }
        return null;
      },
    },

    {
      path: "/Dashboard",
      element: <DashboardMenu />,
      loader: async () => {
        if (Cookies.get("userIdExist") !== true) {
          return redirect("/403");
        }
        else if(Cookies.get("role") !== "Administrator" || Cookies.get("role") !== "Moderator"){
          return redirect("/403");
        }
        return null;
      }
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
      path: "/recipeListByFilter",
      element: <RecipeByFilter />,
    },
    {
      path: "/searchitem",
      element: <SearchItemAll />,
    },
    {
      path: "/ListRecipeDashBoard",
      element: <ListRecipeDashBoard />,
      loader: async () => {
        if (!!roleId) {
          if (roleId !== 1 && roleId !== 2) {
            return redirect("/403");
          }
          return null;
        }
        return null;
      },
    },
    {
      path: "/ListNews",
      element: <ListNews />,
      loader: async () => {
        if (Cookies.get("userIdExist") !== true) {
          return redirect("/403");
        }
        else if(Cookies.get("role") !== "Administrator" || Cookies.get("role") !== "Moderator"){
          return redirect("/403");
        }
        return null;
      }
    },
    {
      path: "/comment/test",
      element: <UpDateCommentItem />,
    },
    {
      path: "/comment/list",
      element: <ListCommentDashboard />,
      loader: async () => {
        if (Cookies.get("userIdExist") !== true) {
          return redirect("/403");
        }
        else if(Cookies.get("role") !== "Administrator" || Cookies.get("role") !== "Moderator"){
          return redirect("/403");
        }
        return null;
      }
    },
    {
      path: "/DashBoardMenu",
      element: <DashBoard />,
      loader: async () => {
        if (Cookies.get("userIdExist") !== true) {
          return redirect("/403");
        }
        else if(Cookies.get("role") !== "Administrator" || Cookies.get("role") !== "Moderator"){
          return redirect("/403");
        }
        return null;
      }
    },
    {
      path: "/ChangeRole/:userId",
      element: <ChangeRole />,
      loader: async () => {
        if (Cookies.get("userIdExist") !== true) {
          return redirect("/403");
        }
        else if(Cookies.get("role") !== "Administrator" || Cookies.get("role") !== "Moderator"){
          return redirect("/403");
        }
        return null;
      }
    },
    {
      path: "/blog/management",
      element: <ListBlogDashboard />,
      loader: async () => {
        if (!!roleId) {
          if (roleId !== 1 && roleId !== 2) {
            return redirect("/403");
          }
          return null;
        }
        return null;
      },
    },
    {
      path: "/ViewDetailMenu/:menuId",
      element: <ViewDetailMenu />,
    },
    {
      path: "/DenyAccess",
      element: <DenyAccess />,
    },
    {
      path: "/MyRecipe",
      element: <MyRecipe />,
    },
    {
      path: "/CreateRecipe",
      element: <CreateRecipe />,
      loader: async () => {
        if (Cookies.get("userIdExist") !== true) {
          return redirect("/403");
        }
        else if(Cookies.get("role") !== "Chef"){
          return redirect("/403");
        }
        return null;
      }
    },
    { path: "/Login", element: <Login /> },
    { path: "/Register", element: <Register /> },

    { path: "/BecomeChef", 
      element: <BecomeChef />,
      loader: async () => {
        if (Cookies.get("userIdExist") !== true) {
          return redirect("/403");
        }
        else if(Cookies.get("role") !== "users"){
          return redirect("/403");
        }
        return null;
      }
    },

    { path: "/ForgotPassword", element: <ForgotPassword/> },
    {
      path: "/Marketplace",
      element: <MarketplaceManagement />,
      loader: async () => {
        if (Cookies.get("userIdExist") !== true) {
          return redirect("/403");
        }
        else if(Cookies.get("role") !== "Administrator"){
          return redirect("/403");
        }
        return null;
      }
    },
    {
      path: "/ChefVerificationManagement",
      element: <ChefManagement />,
      loader: async () => {
        if (Cookies.get("userIdExist") !== true) {
          return redirect("/403");
        }
        else if(Cookies.get("role") !== "Administrator" || Cookies.get("role") !== "Moderator"){
          return redirect("/403");
        }
        return null;
      }
    },
    { path: "/", element: <Navigate to="/KitchenDelights" /> },
    {
      path: "/myblog",
      element: <BlogUser />,
    },
    {
      path: "/HistoryPayment",
      element: <HistoryPayment />,
    },
  

    {
      path: "/PurchasedRecipe",
      element: <RecipeBought />,
    },
    {
      path: "/ticket",
      element: <Ticket />,
    },
    {
      path: "/403",
      element: <NotAuthorication />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default AppRoute;