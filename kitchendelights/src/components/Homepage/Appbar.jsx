import React, { createContext, useContext, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { Login } from '../Authentication/Login';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  border: '2px solid gray',
  marginRight: theme.spacing(-6),
  marginLeft: 0,
  marginTop: 10,
  marginBottom: 10,
  width: '100%',
  borderRadius: '15px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 280,
    height: 40,
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(0, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      marginTop: '1ch',
    },
  },
}));

const Overlay = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
  cursor: 'pointer',
}));


export default function PrimarySearchAppBar() {
  const [loginForm, setLoginForm] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [isOverlayOpen, setIsOverlayOpen] = useState(true);

  const loginSuccess = () => {
    setIsOverlayOpen(false);
    closeLoginForm();
  };

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
    navigate('/KitchenDelights');
  }

  const goToNews = () => {
    navigate('/ViewListNews');
  }
  const goToRepice = () => {
    navigate('/ViewListRepice');
  }

  const goToMyProfile = () => {
    navigate('/MyProfile');
  }

  const goToChangePassword = () => {
    navigate('/ChangePassword');
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      >
      <MenuItem onClick={openLoginForm}>Đăng nhập</MenuItem>
      <MenuItem onClick={goToMyProfile}>Thông tin cá nhân</MenuItem>
      <MenuItem onClick={goToChangePassword}>Đổi mật khẩu</MenuItem>
      <MenuItem onClick={handleMenuClose}>Công thức yêu thích</MenuItem>
      <MenuItem onClick={handleMenuClose}>Công thức của tôi</MenuItem>
      <MenuItem onClick={handleMenuClose}>Đánh giá</MenuItem>
      <MenuItem onClick={handleMenuClose}>Blog</MenuItem>
      <MenuItem onClick={handleMenuClose}>Trở thành đầu bếp</MenuItem>
      <MenuItem onClick={handleMenuClose}>Đăng xuất</MenuItem>
    </Menu>
    
  );

  return (
    <Box sx={{ flexGrow: 1, minWidth: '1350px' }} marginLeft={35} marginRight={35} color="primary" >
      
      <AppBar position="static" sx={{ bgcolor: "#ffffff", height: "120px", borderRadius: "5px" }}>
        <Toolbar  >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', color: "#000000", fontSize: "20px", } }}
            
          >
            Kitchen Delights
          </Typography>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button
              color="secondary"
              size="large"
              variant="text"
              sx={{color: "#000000", fontWeight: "bold", marginLeft: "50px"}}
              onClick={goToHomePage}
            >
            Trang chủ
            </Button>
            <Button
              color="secondary"
              size="large"
              variant="text"
              sx={{color: "#000000", fontWeight: "bold", }}
              onClick={goToRepice}
            >
            Công thức
            </Button>
            <Button
              color="secondary"
              size="large"
              variant="text"
              sx={{color: "#000000", fontWeight: "bold", }}
            >
            Blog
            </Button>
            <Button
              color="secondary"
              size="large"
              variant="text"
              sx={{color: "#000000", fontWeight: "bold"}}
              onClick={goToNews}
            >
            Tin tức
            </Button>
            <Button
              color="secondary"
              size="large"
              variant="text"
              sx={{color: "#000000", fontWeight: "bold"}}
            >
            Bán chạy nhất
            </Button>
            <Button
              color="secondary"
              size="large"
              variant="text"
              sx={{color: "#000000", fontWeight: "bold", marginRight: "50px" }}
            >
            Đánh giá cao
            </Button>
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
              sx={{ marginLeft: '10px'}}
            >
              <AccountCircleIcon fontSize="large" />
              
            </IconButton>
          </Box>
        </Toolbar>

        <Toolbar>
            <Button
              color="secondary"
              size="large"
              variant="text"
              sx={{color: "#000000", fontWeight: "bold", marginLeft: "100px" }}
            >
            Thịt Gà
            </Button>
            <Button
              color="secondary"
              size="large"
              variant="text"
              sx={{color: "#000000", fontWeight: "bold"}}
            >
            Thịt Bò
            </Button>
            <Button
              color="secondary"
              size="large"
              variant="text"
              sx={{color: "#000000", fontWeight: "bold"}}
            >
            Bánh ngọt
            </Button>
            <Button
              color="secondary"
              size="large"
              variant="text"
              sx={{color: "#000000", fontWeight: "bold"}}
            >
            Món ăn dinh dưỡng
            </Button>
            <Button
              color="secondary"
              size="large"
              variant="text"
              sx={{color: "#000000", fontWeight: "bold"}}
            >
            Món ăn chay
            </Button>
            <Button
              color="secondary"
              size="large"
              variant="text"
              sx={{color: "#000000", fontWeight: "bold"}}
            >
            Rau củ
            </Button>
            <Button
              color="secondary"
              size="large"
              variant="text"
              sx={{color: "#000000", fontWeight: "bold"}}
            >
            Món ăn truyền thống
            </Button>
            
        </Toolbar>

      </AppBar>
      {renderMenu}
      {loginForm && (
        <>
          {isOverlayOpen && <Overlay onClick={closeLoginForm} />}
          <Login loginSuccess={loginSuccess}/>
        </>
      )}
    </Box>
  );
}