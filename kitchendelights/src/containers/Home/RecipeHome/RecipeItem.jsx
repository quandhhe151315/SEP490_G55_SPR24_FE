import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "../../../assets/css/cardrecipe.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CommentIcon from "@mui/icons-material/Comment";
import { addToCart, getListCart } from "../../../services/ApiServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loadingflagstore, useCart } from "../../../store";
import Cookies from "js-cookie";

export default function RecipeItem({ item }) {
  const navigate = useNavigate();
  const { setDataCart } = useCart();

  const { loadingflag, setloadingflag } = loadingflagstore();
  const role = Cookies.get("role");
  const getUserIdFromCookie = () => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "userId") {
        return value;
      }
    }
    return null;
  };
  const userId = getUserIdFromCookie();
  const id = getUserIdFromCookie();

  const isUserLoggedIn = () => {
    const cookies = document.cookie.split("; ");
    return cookies.some((cookie) => cookie.startsWith("userId="));
  };
  const handleAddToCart = async (recipeId) => {
    if (!isUserLoggedIn()) {
      navigate("/Login");
      toast.error("Vui lòng đăng nhập để mua hàng"); // Chuyển hướng đến trang login nếu chưa đăng nhập
      return;
    }
    try {
      const response = await addToCart(userId, recipeId);

      if (response.status === 200) {
        toast.success("Thêm vào giỏ hàng thành công");
        getListCarts(userId);
        setloadingflag(!loadingflag);
      } else {
        console.log("lỗi khi thêm vào cart");
      }
    } catch (error) {
      console.error("lỗi khi thêmm vào cart", error);
    }
  };
  const getListCarts = async (id) => {
    try {
      const response = await getListCart(id);
      if (response.status === 200) {
        setDataCart(response.data);
      } else {
        console.error("Can not Load cart! ");
      }
    } catch (error) {
      toast.error("Khoong load dc cart");
    }
  };
  if (item?.recipePrice) {
    return (
      <Box>
        <Card sx={{ width: "100%" }}>
          <CardActionArea>
            <div style={{ position: "relative" }}>
              <img
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                src={item?.featuredImage}
                alt="recipe"
              />
            </div>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontWeight={"bold"}
              >
                {item?.recipeTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary"></Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" sx={{ height: "40px" }}>
                  {item?.recipePrice ? `${item?.recipePrice} đ` : ""}
                </Typography>
              </div>
              <Stack direction={"row"} justifyContent={"space-between"} mt={1}>
                <Rating
                  name="read-only"
                  value={item?.recipeRating}
                  readOnly
                  sx={{ color: "#ff5e00", mr: 2 }}
                />
                <Stack direction={"row"} columnGap={1.5}>
                  <Stack
                    direction={"row"}
                    gap={1}
                    onClick={() => handleAddToCart(item?.recipeId)}
                  >
                    <ShoppingCartIcon sx={{ color: "#ff5e00" }} width={16} />
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    );
  }
  return (
    <a
      href={`/RecipeDetail/${item?.recipeId}`}
      style={{ textDecoration: "none" }}
    >
      <Box>
        <Card sx={{ width: "100%" }}>
          <CardActionArea>
            <div style={{ position: "relative" }}>
              <img
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                src={item?.featuredImage}
                alt="recipe"
              />
            </div>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontWeight={"bold"}
              >
                {item?.recipeTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary"></Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" sx={{ height: "40px" }}>
                  {item?.recipePrice ? `${item?.recipePrice} đ` : ""}
                </Typography>
              </div>
              <Stack direction={"row"} justifyContent={"space-between"} mt={1}>
                <Rating
                  name="read-only"
                  value={item?.recipeRating}
                  readOnly
                  sx={{ color: "#ff5e00", mr: 2 }}
                />
                {/* <Stack direction={"row"} columnGap={1.5}>
                  <Stack direction={"row"} gap={1}>
                    <Typography>95</Typography>
                    <FavoriteBorderIcon width={16} />
                  </Stack>
                  <Stack direction={"row"} gap={1}>
                    <Typography>95</Typography>
                    <CommentIcon width={16} />
                  </Stack>
                  <Stack direction={"row"} gap={1}>
                    <Typography>20</Typography>
                    <ShoppingCartIcon sx={{ color: "#ff5e00" }} width={16} />
                  </Stack>
                </Stack> */}
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </a>
  );
}
