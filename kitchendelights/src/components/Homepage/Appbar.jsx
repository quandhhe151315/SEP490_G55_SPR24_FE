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

const CategoryButton = ({goToPage, text, leftLG, leftMD, leftSM, leftXS, rightLG}) => {
  return (
    <Button
              color="secondary"
              size="large"
              variant="text"
              sx={{color: "#000000", fontWeight: "bold", marginLeft: {xs: leftXS, sm: leftSM, md: leftMD, lg: leftLG}, marginRight: {lg: rightLG}}}
              onClick={goToPage}
            >
            {text}
            </Button>
  );
};

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
    console.log(userId);
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

  const goToLogin = () => {
    navigate("/Login");
  }

  const closeLoginForm = () => {
    setLoginForm(false);
  };

  const goToHomePage = () => {
    navigate("/KitchenDelights");
  };

  const goToBookMark = () => {
    navigate("/BookMark");
  };

  const goToNews = () => {
    navigate("/ViewListNews");
  };
  const goToRepice = () => {
    navigate("/ViewListRecipes");
  };

  const goToMyProfile = () => {
    navigate("/UserProfile");
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

  return (
    <Box sx={{ flexGrow: 1, minWidth: '70%'}}  color="primary" >
      <GetInformationJWT setId={setUserId}/>
      <AppBar position="static" sx={{ bgcolor: "#ffffff", height: "120px", borderRadius: "5px" }}>
          <Toolbar>
            <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ marginTop: '20px' ,display: { xs: 'none', sm: 'block', color: "#000000", fontSize: "20px"}, marginRight: { xs: '1%', sm: '2%', md: '5%', lg: '10%' } }}
          >
            Kitchen Delights
          </Typography>
          <CategoryButton goToPage={goToHomePage} text={"Trang chủ"} leftLG="10%" leftMD="5%" leftSM="2%" leftXS="1%"/>
          <CategoryButton goToPage={goToRepice} text={"Công thức nấu ăn"}/>
          <CategoryButton goToPage={goToNews} text={"Tin tức"}/>
          <CategoryButton goToPage={goToBlog} text={"Blog"} />
            <Search>
            <StyledInputBase placeholder="Tìm những gì bạn thích" inputProps={{ 'aria-label': 'search' }} sx={{ color: "rgba(0, 0, 0, 0.54)" }}/>
            </Search>
            <SearchIcon sx={{bgcolor: "#ff5e00", borderRadius: '15px', width: '48px', height: '42px'}}/>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              sx={{ marginLeft: '20px', marginRight: '15%'}}
            >
              <AccountCircleIcon fontSize="large"/>
            </IconButton>
        </Toolbar>

        <Toolbar>
          {/* Load category ... Thêm menu subcategory */}
          <CategoryButton text={"Thịt"} leftLG="25%"/>
          <CategoryButton text={"Đồ ăn chay"}/>
          <CategoryButton text={"Dinh dưỡng"}/>
          <CategoryButton text={"Truyền thống"}/>
          <CategoryButton text={"Quốc gia"}/>
          <CategoryButton text={"Rau & Salad"}/>
          <CategoryButton text={"Tráng miệng"}/>
          <CategoryButton text={"Đồ uống"}/>
          {/* Load category ... Thêm menu subcategory */}
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
