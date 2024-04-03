import React, { useEffect, useContext, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import GetInformationJWT from "../JWT/GetInformationJWT";
import Cookies from "js-cookie";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useCart, useCount } from "../../store/store";
import { getListCart } from "../../services/ApiServices";
import TextField from "@mui/material/TextField";
import { Stack, Grid } from "@mui/material";
import BtnHandleHoverItem from "./BtnHandleHoverItem";
import IngredientHoverBtn from "./IngredientHoverBtn";

const Overlay = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10,
  cursor: "pointer",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
      marginTop: "1ch",
    },
  },
}));

const CategoryButton = ({
  goToPage,
  text,
  leftLG,
  leftMD,
  leftSM,
  leftXS,
  rightLG,
  onMouseOver,
  onMouseOut,
}) => {
  return (
    <Button
      color="secondary"
      size="large"
      variant="text"
      sx={{
        color: "#000000",
        fontWeight: "bold",
        marginLeft: { xs: leftXS, sm: leftSM, md: leftMD, lg: leftLG },
        marginRight: { lg: rightLG },
      }}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={goToPage}
    >
      {text}
    </Button>
  );
};

export default function PrimarySearchAppBar() {
  const { recipeCountNumber } = useCount();
  const [loginForm, setLoginForm] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);

  const [userIdExist, setUserIdExist] = useState(false);
  const [userId, setUserId] = useState(-1);

  const loginSuccess = () => {
    setIsOverlayOpen(false);
    closeLoginForm();
    setUserIdExist(true);
  };

  useEffect(() => {
    if (userId != -1) {
      setUserIdExist(true);
    } else {
      setUserIdExist(false);
    }
  }, [userId]);

  // giỏ hàng
  const { dataCart, setDataCart } = useCart();
  const { countRecipe } = useCount();

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
  const id = getUserIdFromCookie();
  useEffect(() => {
    getListCarts(id);
  }, []);

  const getListCarts = async (id) => {
    try {
      const response = await getListCart(id);
      if (response.status === 200) {
        setDataCart(response.data);
        countRecipe(response.data.count);
        console.log("Load cart successful! ");
      } else {
        console.error("Can not Load cart! ");
      }
    } catch (error) {}
  };

  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const goToLogin = () => {
    navigate("/Login");
  };

  const closeLoginForm = () => {
    setLoginForm(false);
  };

  const goToHomePage = () => {
    navigate("/KitchenDelights");
  };

  const goToNews = () => {
    navigate("/ViewListNews");
  };

  const goToRepice = () => {
    navigate("/ViewListRecipes");
  };

  const goToMyProfile = () => {
    navigate("/MyProfile");
    // navigate("/UserProfile");
  };

  const goToBlog = () => {
    navigate("/blog");
  };
  const GoToShopCart = () => {
    navigate("/ShoppingCart");
  };

  const handleLogout = () => {
    Cookies.remove("jwt");
    Cookies.remove("userId");
    Cookies.remove("role");
    setUserIdExist(false);
    navigate("/KitchenDelights");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {userIdExist == false && (
        <>
          <MenuItem onClick={goToLogin}>Đăng nhập</MenuItem>
        </>
      )}
      {userIdExist == true && (
        <>
          <MenuItem onClick={goToMyProfile}>Thông tin cá nhân</MenuItem>
          <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
        </>
      )}
    </Menu>
  );

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  return (
    <Box sx={{ flexGrow: 1, minWidth: "70%", height: "180px" }} color="primary">
      <GetInformationJWT setId={setUserId} />
      <AppBar sx={{ bgcolor: "#ffffff", height: "146px" }}>
        <Toolbar>
          <Box>
            <Grid sx={{ display: "flex", ml: 10, mt: 5 }}>
              <Grid item xs={6} sx={{ mr: 10 }}>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ color: "#ff5e00", textTransform: "uppercase", mb: 2 }}
                >
                  KitchenDelights
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <input
                  style={{
                    height: "36px",
                    borderRadius: "5px",
                    outline: "none",
                    border: "1px",
                    borderStyle: "solid",
                    borderColor: "#ccc",
                    paddingLeft: "16px",
                    minWidth: "400px",
                  }}
                  placeholder="Tìm kiếm"
                />
                <Button
                  sx={{
                    backgroundColor: "#ff5e00",
                    "&:hover": {
                      backgroundColor: "#ff7e30",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "white",
                    },
                    "& .MuiButton-label": {
                      display: "flex",
                    },
                    padding: "8px 8px 7px 8px",
                    minWidth: "6px",
                    ml: -5.1,
                  }}
                >
                  <SearchIcon />
                </Button>
              </Grid>
              <Grid item xs={2}>
                <IconButton aria-label="cart">
                  <StyledBadge
                    badgeContent={recipeCountNumber}
                    color="secondary"
                    onClick={GoToShopCart}
                  >
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  sx={{ ml: 10, mt: -2, color: "#ff5e00" }}
                >
                  <AccountCircleIcon sx={{ fontSize: "46px" }} />
                </IconButton>
              </Grid>
            </Grid>

            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                ml: 8.6,
                mb: 1,
              }}
            >
              <CategoryButton goToPage={goToHomePage} text={"Trang chủ"} />
              <CategoryButton goToPage={goToRepice} text={"Công thức nấu ăn"} />
              <IngredientHoverBtn />
              <CategoryButton goToPage={goToRepice} text={"Bữa ăn"} />
              <CategoryButton goToPage={goToRepice} text={"Ngày lễ"} />
              <BtnHandleHoverItem />
              <CategoryButton goToPage={goToNews} text={"Tin tức"} />
              <CategoryButton goToPage={goToBlog} text={"Blog"} />
            </Stack>
          </Box>

          <SearchIcon
            sx={{
              width: "24px",
              height: "24px",
              zIndex: 1,
              cursor: "pointer",
            }}
          />
        </Toolbar>
      </AppBar>
      {userIdExist != null && renderMenu}
    </Box>
  );
}
