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
import { Login } from "../Authentication/Login";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import GetInformationJWT from '../JWT/GetInformationJWT';
import Cookies from 'js-cookie';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  border: "2px solid gray",
  marginRight: theme.spacing(-6),
  marginLeft: 0,
  marginTop: 10,
  marginBottom: 10,
  width: "100%",
  borderRadius: "15px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: 280,
    height: 40,
  },
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

const CategoryButton = ({goToPage, text, left}) => {
  return (
    <Button
              color="secondary"
              size="large"
              variant="text"
              sx={{color: "#000000", fontWeight: "bold", marginLeft: left}}
              onClick={goToPage}
            >
            {text}
            </Button>
  );
};


export default function PrimarySearchAppBar() {
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
    if(userId != -1){
      setUserIdExist(true);
    }
    else{
      setUserIdExist(false);
    }
  }, [userId]);

  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const openLoginForm = () => {
    handleMenuClose();
    setLoginForm(true);
    setIsOverlayOpen(true);
  }

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
    navigate("/ViewListRepice");
  };

  const goToMyProfile = () => {
    navigate("/UserProfile");
  };

  const goToChangePassword = () => {
    navigate("/ChangePassword");
  };

  const goToBlog = () => {
    navigate('/blog');
  }

  const handleLogout = () => {
    Cookies.remove('jwt');
    setUserIdExist(false);
    navigate('/KitchenDelights');
  }

  const menuId = 'primary-search-account-menu';
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
        <MenuItem onClick={openLoginForm}>Đăng nhập</MenuItem>
      </>
    )}
          {userIdExist == true && (
      <>
        <MenuItem onClick={goToMyProfile}>Thông tin cá nhân</MenuItem>
        <MenuItem onClick={handleMenuClose}>Công thức yêu thích</MenuItem>
        <MenuItem onClick={handleMenuClose}>Công thức của tôi</MenuItem>
        <MenuItem onClick={handleMenuClose}>Đánh giá</MenuItem>
        <MenuItem onClick={handleMenuClose}>Blog</MenuItem>
        <MenuItem onClick={handleMenuClose}>Trở thành đầu bếp</MenuItem>
        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
      </>
    )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, minWidth: '70%',  marginLeft: { xs: '3%', sm: '6%', md: '10%', lg: '15%' }, marginRight: { xs: '3%', sm: '6%', md: '10%', lg: '15%' }}}  color="primary" >
      <GetInformationJWT setId={setUserId}/>
      <AppBar position="static" sx={{ bgcolor: "#ffffff", height: "120px", borderRadius: "5px" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', color: "#000000", fontSize: "20px"}, marginRight: { xs: '1%', sm: '2%', md: '3%', lg: '5%' } }}
          >
            Kitchen Delights
          </Typography>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <CategoryButton goToPage={goToHomePage} text={"Trang chủ"}/>
            <CategoryButton goToPage={goToRepice} text={"Công thức"}/>
            <CategoryButton goToPage={goToBlog} text={"Blog"}/>
            <CategoryButton goToPage={goToNews} text={"Tin tức"}/>
            <CategoryButton text={"Bán chạy nhất"}/>
            <CategoryButton text={"Đánh giá cao"}/>

            <Search>
            <StyledInputBase
              placeholder="Tìm những gì bạn thích"
              inputProps={{ 'aria-label': 'search' }}
              sx={{ color: "rgba(0, 0, 0, 0.54)" }}
            />
            </Search>
            <Box sx={{ flexGrow: 1 }}>
            <SearchIcon 
              sx={{bgcolor: "#ff5e00", borderRadius: '15px', width: '48px', height: '42px', marginTop: '10px'}}
              />
            </Box>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              sx={{ marginLeft: '20px'}}
            >
              <AccountCircleIcon fontSize="large" />
            </IconButton>
            
          </Box>
        </Toolbar>

        <Toolbar>
          <CategoryButton text={"Thịt"} left="12%"/>
          <CategoryButton text={"Đồ ăn chay"}/>
          <CategoryButton text={"Dinh dưỡng"}/>
          <CategoryButton text={"Truyền thống"}/>
          <CategoryButton text={"Quốc gia"}/>
          <CategoryButton text={"Rau & Salad"}/>
          <CategoryButton text={"Tráng miệng"}/>
          <CategoryButton text={"Đồ uống"}/>
        </Toolbar>
      </AppBar>
      {(userIdExist != null ) && renderMenu}
      {loginForm && (
        <>
          {isOverlayOpen && <Overlay onClick={closeLoginForm} />}
          <Login loginSuccess={loginSuccess}/>
        </>
      )}
    </Box>
  );
}
