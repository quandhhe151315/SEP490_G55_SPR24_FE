import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import Appbar from "../../components/Homepage/Appbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Unstable_Grid2";
import ForwardIcon from "@mui/icons-material/Forward";
import ShoingCartIconpp from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Rating from "@mui/material/Rating";
import { Stack } from "@mui/material";
import { getRecipes, addToCart } from "../../services/ApiServices";
import { toast } from "react-toastify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function RandomRecipes() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRandomRecipes();
  }, []);

  const getRandomRecipes = async () => {
    try {
      const response = await getRecipes();
      if (response.status === 200) {
        // Lấy ngẫu nhiên 8 công thức từ danh sách
        const randomRecipes = getRandomItems(response.data, 8);
        setRecipes(randomRecipes);
      } else {
        toast.error("Không thể tải danh sách công thức.");
      }
    } catch (error) {
      toast.error("Không thể tải danh sách công thức.");
    }
  };

  const getRandomItems = (items, count) => {
    const shuffled = items.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleViewRecipe = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const prevButton = <button className="slick-prev">«</button>;
  const nextButton = <button className="slick-next">»</button>;
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    prevArrow: prevButton,
    nextArrow: nextButton,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Typography
        sx={{
          marginLeft: "280px",
          fontSize: "16px",
          marginRight: "280px",
          marginTop: "30px",
        }}
      >
        <Typography
          color="#ff5e00"
          sx={{ fontSize: "35px", fontWeight: "bold" }}
        >
          Có thể bạn sẽ thích
        </Typography>
        <Box>
          <Slider {...settings}>
            {recipes.map((item) => {
              return (
                <Grid item lg={3} md={6} xs={12}>
                  <Card sx={{ maxWidth: 345, margin: 2 }}>
                    <CardMedia
                      component={"img"}
                      height={140}
                      image={item.featuredImage}
                      alt="green iguana"
                      key={item.recipeId}
                    />
                    <CardContent>
                      <Typography
                        sx={{
                          textWrap: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        gutterBottom
                        variant="h6"
                        component="div"
                      >
                        {item.recipeTitle}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Rating
                          name="simple-controlled"
                          value={item.recipeRating}
                          size="small"
                        />
                        <Typography component="legend" fontSize={11}>
                          {item.vote} votes
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: -2,
                      }}
                    >
                      <Button size="small" endIcon={<FavoriteIcon />}>
                        Like
                      </Button>
                      <Link to={`/RecipeDetail/${item.recipeId}`}>
                        <Button
                          size="small"
                          endIcon={<VisibilityIcon />}
                          onClick={handleViewRecipe}
                        >
                          Xem
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Slider>
        </Box>
      </Typography>
      <Typography sx={{ height: 50 }}></Typography>
    </div>
  );
}

export default RandomRecipes;
