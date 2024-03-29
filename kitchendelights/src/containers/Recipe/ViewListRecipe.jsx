import React, { createContext, useContext, useEffect, useState } from "react";
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
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import ForwardIcon from "@mui/icons-material/Forward";
import ShoingCartIconpp from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Rating from "@mui/material/Rating";
import { Stack } from "@mui/material";
import { getRecipes} from "../../services/ApiServices";
import { toast } from "react-toastify";
import image from "../../assets/images/news1.jpg";

const DisplaySearchNews = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  border: "2px solid gray",
  marginTop: 20,
  borderRadius: "15px",
  [theme.breakpoints.up("sm")]: {
    width: 650,
    height: 40,
  },
}));

const DisplayStyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "calc(100% - 48px)",
    [theme.breakpoints.up("md")]: {
      width: "61.5ch",
      marginTop: "2ch",
    },
  },
}));

const data3 = [
  {
    name1: "Thịt bò",
    name2: "Rau củ",
    name3: "Món ăn giàu dinh dưỡng ",
    name4: "Thịt gà",
    name5: "Thịt vịt",
    name6: "Đồ ăn tốt cho sức khoẻ",
  },
];

const DisplayItemNews = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginTop: "30px",
}));

function ViewListRecipes() {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [data2, setdata2] = useState([]);

  const SearchNews = () => {
    navigate("/KitchenDelights");
  };
  const GoToCart = () => {
    navigate("/ShoppingCart");
  };
  //

  useEffect(() => {
    getListRecipes();
  }, []);

  const getListRecipes = async () => {
    try {
      const response = await getRecipes();
      if (response.status === 200) {
        const dataFree = response?.data.filter((x) => x.isFree === true);
        const dataNotFree = response?.data.filter((x) => x.isFree === false);

        setdata(dataFree);
        setdata2(dataNotFree);
      } else {
      }
    } catch (error) {
      toast.error("Khoong load dc list");
    }
  };

  return (
    <div>
      <Appbar />

      <Typography
        sx={{
          marginLeft: "320px",
          fontSize: "16px",
          marginRight: "255px",
          marginTop: "50px",
        }}
      >
        <Typography
          color="#ff5e00"
          sx={{ fontSize: "30px", fontWeight: "bold" }}
        >
          Công thức nấu ăn
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <DisplaySearchNews>
            <DisplayStyledInputBase
              placeholder="Tìm công thức bạn muốn"
              inputProps={{ "aria-label": "search" }}
              sx={{ color: "rgba(0, 0, 0, 0.54)" }}
            />
            <SearchIcon
              sx={{
                bgcolor: "#ff5e00",
                borderRadius: "15px",
                marginLeft: "16px",
                width: "48px",
                height: "42px",
                color: "white",
              }}
              onClick={SearchNews}
            />
          </DisplaySearchNews>
        </Box>
        <Typography
          sx={{
            marginLeft: "320px",
            fontSize: "16px",
            marginRight: "255px",
            marginTop: "50px",
          }}
        ></Typography>
        <Typography
          color="#ff5e00"
          sx={{ fontSize: "20px", fontWeight: "bold" }}
        >
          Công thức miễn phí
        </Typography>
        <Box>
          <Grid container spacing={3}>
            {data.filter(item => item.recipeStatus === 1).map((item) => {
              return (
                <Grid item lg={3} md={6} xs={12}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component={"img"}
                      height={140}
                      image={item.featuredImage}
                      alt="green iguana"
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
                        {" "}
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
                        {" "}
                        <Button size="small" endIcon={<VisibilityIcon />}>
                          Xem
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <Typography
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "30px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "#ff5e00",
              borderRadius: "15px",
              width: "150px",
              height: "42px",
              color: "white",
            }}
            startIcon={<ForwardIcon sx={{ transform: "rotate(180deg)" }} />}
          >
            Forward
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#ff5e00",
              borderRadius: "15px",
              width: "150px",
              height: "42px",
              color: "white",
            }}
            endIcon={<ForwardIcon />}
          >
            {" "}
            Next
          </Button>
        </Typography>
      </Typography>

      <Typography
        sx={{
          marginLeft: "320px",
          fontSize: "16px",
          marginRight: "255px",
          marginTop: "50px",
        }}
      >
        <Typography
          sx={{
            marginLeft: "320px",
            fontSize: "16px",
            marginRight: "255px",
            marginTop: "50px",
          }}
        ></Typography>
        <Typography
          color="#ff5e00"
          sx={{ fontSize: "20px", fontWeight: "bold" }}
        >
          Công thức trả phí
        </Typography>
        <Box>
          <Grid container spacing={3}>
            {data2.filter(item => item.recipeStatus === 1).map((item) => {
              return (
                <Grid item lg={3} md={6} xs={12}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component={"img"}
                      height={140}
                      image={item.featuredImage}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography
                        sx={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                        noWrap
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
                        {" "}
                        <Rating
                          name="simple-controlled"
                          value={item.recipeRating}
                          size="small"
                        />
                        <Typography component="legend" fontSize={11}>
                          {item.vote} votes
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: 1,
                        }}
                      >
                        <Typography component="legend" fontSize={15}>
                          Giá:
                        </Typography>
                        <Typography component="legend" fontSize={15}>
                          {item.recipePrice}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: -2.5,
                      }}
                    >
                      <Button size="small" endIcon={<FavoriteIcon />}>
                        Like
                      </Button>
                      <Button
                        size="small"
                        endIcon={<ShoingCartIconpp />}
                        onClick={GoToCart}
                      >
                        Buy
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <Typography
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "30px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "#ff5e00",
              borderRadius: "15px",
              width: "150px",
              height: "42px",
              color: "white",
            }}
            startIcon={<ForwardIcon sx={{ transform: "rotate(180deg)" }} />}
          >
            Forward
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#ff5e00",
              borderRadius: "15px",
              width: "150px",
              height: "42px",
              color: "white",
            }}
            endIcon={<ForwardIcon />}
          >
            Next
          </Button>
        </Typography>
      </Typography>
      <Typography sx={{ marginTop: 3 }} />
      <Typography
        sx={{
          marginLeft: 40,
          color: "#ff5e00",
          fontSize: 15,
          fontWeight: "bold",
        }}
      >
        Có thể bạn sẽ thích
      </Typography>
      <Typography sx={{ marginTop: 2 }} />
      <Typography sx={{ marginLeft: 40 }}>
        <Stack direction="row" spacing={2}>
          <Button
            sx={{
              bgcolor: "#ff5e00",
              borderRadius: "15px",
              width: "150px",
              height: "42px",
              color: "white",
            }}
          >
            Thịt bò
          </Button>
          <Button
            sx={{
              bgcolor: "#ff5e00",
              borderRadius: "15px",
              width: "150px",
              height: "42px",
              color: "white",
            }}
          >
            Thịt gà
          </Button>
          <Button
            sx={{
              bgcolor: "#ff5e00",
              borderRadius: "15px",
              width: "200px",
              height: "42px",
              color: "white",
            }}
          >
            Món ăn dinh dưỡng
          </Button>
          <Button
            sx={{
              bgcolor: "#ff5e00",
              borderRadius: "15px",
              width: "150px",
              height: "42px",
              color: "white",
            }}
          >
            Thịt lợn
          </Button>
          <Button
            sx={{
              bgcolor: "#ff5e00",
              borderRadius: "15px",
              width: "150px",
              height: "42px",
              color: "white",
            }}
          >
            Rau sạch
          </Button>
        </Stack>
        <Typography sx={{ marginTop: 1 }} />
        <Stack direction="row" spacing={2}>
          <Button
            sx={{
              bgcolor: "#ff5e00",
              borderRadius: "15px",
              width: "150px",
              height: "42px",
              color: "white",
            }}
          >
            Bánh mì
          </Button>
          <Button
            sx={{
              bgcolor: "#ff5e00",
              borderRadius: "15px",
              width: "150px",
              height: "42px",
              color: "white",
            }}
          >
            Món ăn chay
          </Button>
          <Button
            sx={{
              bgcolor: "#ff5e00",
              borderRadius: "15px",
              width: "150px",
              height: "42px",
              color: "white",
            }}
          >
            Đồ ăn healthy
          </Button>
          <Button
            sx={{
              bgcolor: "#ff5e00",
              borderRadius: "15px",
              width: "150px",
              height: "42px",
              color: "white",
            }}
          >
            Phở
          </Button>
          <Button
            sx={{
              bgcolor: "#ff5e00",
              borderRadius: "15px",
              width: "150px",
              height: "42px",
              color: "white",
            }}
          >
            Bánh ngọt
          </Button>
        </Stack>
      </Typography>
    </div>
  );
}

export default ViewListRecipes;
