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
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "../../../assets/css/cardrecipe.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CommentIcon from "@mui/icons-material/Comment";
export default function RecipeItem({ item }) {
  return (
    <a
      href={`/RecipeDetail/${item?.recipeId}`}
      style={{ textDecoration: "none"}}
    >
      <Box>
        <Card sx={{ width: "100%" }}>
          <CardActionArea>
            <div style={{ position: "relative" }}>
              <img
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
                <Typography variant="h6" sx={{height:'40px'}}>
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
