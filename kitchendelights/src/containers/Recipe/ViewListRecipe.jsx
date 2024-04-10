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
import { getRecipes, addToCart, getListCart } from "../../services/ApiServices";
import { toast } from "react-toastify";
import Footer from "../../components/Footer/Footer";
import { useCart } from "../../store";
import { searchRecipe } from "../../services/RecipeServices";
import AdBanner from "../../components/ADS/AdBanner";

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

function ViewListRecipes() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [freeRecipes, setFreeRecipes] = useState([]);
  const [paidRecipes, setPaidRecipes] = useState([]);
  const [currentPageFree, setCurrentPageFree] = useState(1);
  const [currentPagePaid, setCurrentPagePaid] = useState(1);
  const { setDataCart } = useCart();
  const recipesPerPage = 8;

  const isUserLoggedIn = () => {
    const cookies = document.cookie.split("; ");
    return cookies.some((cookie) => cookie.startsWith("userId="));
  };

  const searchRecipes = async () => {
    try {
      const response = await searchRecipe(searchText);
      if (response.status === 200) {
        const dataFree = response?.data.filter((x) => x.isFree === true);
        const dataPaid = response?.data.filter((x) => x.isFree === false);
        setFreeRecipes(dataFree);
        setPaidRecipes(dataPaid);
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (searchText === "") {
      getListRecipes();
    } else {
      searchRecipes(searchText);
    }
  }, []);
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
  // const recipeId = 8;
  const handleAddToCart = async (recipeId) => {
    if (!isUserLoggedIn()) {
      navigate("/Login"); // Chuyển hướng đến trang login nếu chưa đăng nhập
      return;
    }
    try {
      const response = await addToCart(userId, recipeId);

      if (response.status === 200) {
        toast.success("Thêm vào giỏ hàng thành công");
        getListCarts(userId);
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
  const getListRecipes = async () => {
    try {
      const response = await getRecipes();
      if (response.status === 200) {
        const dataFree = response?.data.filter((x) => x.isFree === true);
        const dataPaid = response?.data.filter((x) => x.isFree === false);

        setFreeRecipes(dataFree);
        setPaidRecipes(dataPaid);
      } else {
        toast.error("Không thể tải danh sách công thức.");
      }
    } catch (error) {
      toast.error("Không thể tải danh sách công thức.");
    }
  };

  const handleNextFree = () => {
    setCurrentPageFree((prevPage) => prevPage + 1);
  };

  const handleForwardFree = () => {
    setCurrentPageFree((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPaid = () => {
    setCurrentPagePaid((prevPage) => prevPage + 1);
  };

  const handleForwardPaid = () => {
    setCurrentPagePaid((prevPage) => Math.max(prevPage - 1, 1));
  };

  const indexOfLastFreeRecipe = currentPageFree * recipesPerPage;
  const indexOfFirstFreeRecipe = indexOfLastFreeRecipe - recipesPerPage;
  const currentFreeRecipes = freeRecipes.slice(
    indexOfFirstFreeRecipe,
    indexOfLastFreeRecipe
  );

  const indexOfLastPaidRecipe = currentPagePaid * recipesPerPage;
  const indexOfFirstPaidRecipe = indexOfLastPaidRecipe - recipesPerPage;
  const currentPaidRecipes = paidRecipes.slice(
    indexOfFirstPaidRecipe,
    indexOfLastPaidRecipe
  );

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
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
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
              onClick={searchRecipes}
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
            {freeRecipes
              .filter((item) => item.recipeStatus === 1)
              .map((item) => {
                return (
                  <Grid item lg={3} md={6} xs={12} key={item.recipeId}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        component={"img"}
                        height={140}
                        image={item.featuredImage}
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
                          <Typography component="legend" fontSize={11}>
                            Đánh giá:
                          </Typography>
                          <Rating
                            name="simple-controlled"
                            value={item.recipeRating}
                            size="small"
                          />
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
                        <Link to={`/RecipeDetail/${item.recipeId}`}>
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
                opacity: currentPageFree === 1 ? 0.5 : 1,
              }}
              startIcon={<ForwardIcon sx={{ transform: "rotate(180deg)" }} />}
              onClick={handleForwardFree}
              disabled={currentPageFree === 1}
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
                opacity: indexOfLastFreeRecipe >= freeRecipes.length ? 0.5 : 1,
              }}
              endIcon={<ForwardIcon />}
              onClick={handleNextFree}
              disabled={indexOfLastFreeRecipe >= freeRecipes.length}
            >
              Next
            </Button>
          </Typography>
        </Box>
        <Typography sx={{ marginTop: "50px" }} />
        <AdBanner />
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
            {paidRecipes
              .filter((item) => item.recipeStatus === 1)
              .map((item) => {
                return (
                  <Grid item lg={3} md={6} xs={12} key={item.recipeId}>
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
                          <Typography component="legend" fontSize={11}>
                            Đánh giá:
                          </Typography>
                          <Rating
                            name="simple-controlled"
                            value={item.recipeRating}
                            size="small"
                          />
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
                        <Button
                          size="small"
                          endIcon={<ShoingCartIconpp />}
                          onClick={() => handleAddToCart(item.recipeId)}
                        >
                          Mua
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
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
                opacity: currentPagePaid === 1 ? 0.5 : 1,
              }}
              startIcon={<ForwardIcon sx={{ transform: "rotate(180deg)" }} />}
              onClick={handleForwardPaid}
              disabled={currentPagePaid === 1}
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
                opacity: indexOfLastPaidRecipe >= paidRecipes.length ? 0.5 : 1,
              }}
              endIcon={<ForwardIcon />}
              onClick={handleNextPaid}
              disabled={indexOfLastPaidRecipe >= paidRecipes.length}
            >
              Next
            </Button>
          </Typography>
        </Box>
      </Typography>
      <Typography sx={{ marginTop: 3 }} />

      <Typography sx={{ height: 8 }} />
    </div>
  );
}

export default ViewListRecipes;
