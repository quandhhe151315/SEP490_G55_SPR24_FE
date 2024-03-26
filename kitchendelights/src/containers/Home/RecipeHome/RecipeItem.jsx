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
import CommentIcon from '@mui/icons-material/Comment';
export default function RecipeItem() {
  return (
    <Box>
      <Card sx={{ width: '100%' }}>
        <CardActionArea>
          <div style={{ position: "relative" }}>
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src="https://media.cooky.vn/recipe/g1/4014/s320x240/recipe4014-636009205974008541.jpg"
              alt="recipe"
            />
            <div class="favorite-container">
              <Typography>59</Typography>
              <FavoriteBorderIcon class="heart-icon" />
            </div>
          </div>

          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              fontWeight={"bold"}
            >
              Cơm chiên Dương Châu
            </Typography>
            <Typography variant="body2" color="text.secondary"></Typography>

            <div style={{ display: "flex", alignItems: "center" }}>
              <Rating
                name="read-only"
                value={5}
                readOnly
                sx={{ color: "#ff5e00", mr: 2 }}
              />
              <Typography variant="h8" sx={{mr:4}}>145 bình chọn</Typography>
              <Typography sx={{mr:2}}>95</Typography>
              <CommentIcon/>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6">50,000 VNĐ</Typography>
             
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                <Typography sx={{mr:1}}>20</Typography>
                <ShoppingCartIcon sx={{color:"#ff5e00"}}/>
              </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
