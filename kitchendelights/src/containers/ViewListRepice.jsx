import React, { createContext, useContext, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Appbar from "../components/Homepage/Appbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import image1 from "../assets/images/news1.jpg";
import ForwardIcon from "@mui/icons-material/Forward";
import ShoingCartIconpp from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';

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

const DisplayItemNews = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginTop: "30px",
}));

function ViewListRepice() {
  const navigate = useNavigate();

  const SearchNews = () => {
    navigate("/KitchenDelights");
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
            <Grid item xs={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  img
                  src="/assets/images/news1.jpg'"
                  alt="Image news"
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Công thức nấu thịt bò
                  </Typography>
                </CardContent>
                <CardActions>
                <Button size="small" endIcon={<FavoriteIcon />}>Like</Button>
                  <Button size="small"endIcon={<VisibilityIcon  />}>Xem</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  img
                  src={image1}
                  alt="Image news"
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Công thức nấu thịt bò
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Like</Button>
                  <Button size="small">Xem</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  img
                  src={image1}
                  alt="Image news"
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Công thức nấu thịt bò
                  </Typography>
                </CardContent>
                <CardActions>
                <Button size="small" endIcon={<FavoriteIcon />}>Like</Button>
                  <Button size="small"endIcon={<VisibilityIcon  />}>Xem</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  img
                  src={image1}
                  alt="Image news"
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Công thức nấu thịt bò
                  </Typography>
                </CardContent>
                <CardActions>
                <Button size="small" endIcon={<FavoriteIcon />}>Like</Button>
                  <Button size="small"endIcon={<VisibilityIcon  />}>Xem</Button>
                </CardActions>
              </Card>
            </Grid>
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
            <Grid item xs={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  img
                  src="/assets/images/news1.jpg'"
                  alt="Image news"
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Công thức nấu thịt bò
                  </Typography>
                </CardContent>
                <CardActions>
                <Button size="small" endIcon={<FavoriteIcon />}>Like</Button>
                  <Button size="small"endIcon={<ShoingCartIconpp  />}>Mua</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  img
                  src={image1}
                  alt="Image news"
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Công thức nấu thịt bò
                  </Typography>
                </CardContent>
                <CardActions>
                <Button size="small" endIcon={<FavoriteIcon />}>Like</Button>
                  <Button size="small"endIcon={<ShoingCartIconpp  />}>Mua</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  img
                  src={image1}
                  alt="Image news"
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Công thức nấu thịt bò
                  </Typography>
                </CardContent>
                <CardActions>
                <Button size="small" endIcon={<FavoriteIcon />}>Like</Button>
                  <Button size="small"endIcon={<ShoingCartIconpp  />}>Mua</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  img
                  src={image1}
                  alt="Image news"
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Công thức nấu thịt bò
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" endIcon={<FavoriteIcon />}>Like</Button>
                  <Button size="small"endIcon={<ShoingCartIconpp  />}>Mua</Button>
                </CardActions>
              </Card>
            </Grid>
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
      
      
    </div>
  );
}

export default ViewListRepice;
