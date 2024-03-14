import React, { useState, useEffect } from "react";
import { getBookMarkOfUser } from "../../services/ApiServices";
import Appbar from "../../components/Homepage/Appbar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Rating from "@mui/material/Rating";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, IconButton } from "@mui/material";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";

function BookMark() {
  const navigate = useNavigate();
  const  onAddNew =()=>{
    navigate("/ViewListRecipes");
  }
  const [data, setdata] = useState([]);
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
    getBookMarkOfUsers(id);
  }, []);
  const getBookMarkOfUsers = async () => {
    try {
      const response = await getBookMarkOfUser(id);
      if (response.status === 200) {
        setdata(response.data.recipes);
        console.log("data", response);
        
      } else {
        console.error("Can not Load listbookmark! ");
      }
    } catch (error) {
      toast.error("Khoong load dc listbookmark");
    }
  };
  return (
    <div>
      <Appbar />
      <Typography marginTop={3} color="#ff5e00" sx={{ marginLeft: 35, fontSize: "40px", fontWeight: "bold" }}>
        Danh sách công thức của tôi
      </Typography>
      <Typography marginTop={6} />
      <Box sx={{ marginLeft: "290px", marginRight: "255px", marginTop: "50px" }}>
        <Grid container spacing={3}>
          {/* Danh sách công thức */}
          {data.map((item, index) => (
            <Grid item lg={3} md={6} xs={12} key={index}>
              <Link to={`/RecipeDetail/${item.recipeId}`}>
              <Card sx={{ maxWidth: 345, position: 'relative' }}>
      <CardMedia
        component={"img"}
        height={140}
        image={item.featuredImage}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div"
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
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
          <Stack direction="row" spacing={2}>
            <Avatar sx={{ width: 24, height: 24 }}></Avatar>
            <Typography>{item.userName}</Typography>
          </Stack>
          
        </Box>
        <Button variant="contained" color="primary" >
      Xem
    </Button>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: -2,
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      >
        <Box sx={{ position: 'absolute', top: 6, right: 0}}>
        <IconButton  color="error">
          <DeleteIcon />
        </IconButton>
      </Box>
      
      </CardActions>
    </Card>

              </Link>
            </Grid>
          ))}
          {/* Card thêm mới công thức */}
          <Grid item lg={3} md={6} xs={12}>
            <Card sx={{ textAlign: 'center', backgroundColor: '#f0f0f0', cursor: 'pointer' }} onClick={onAddNew}>
              <CardContent>
                <AddCircleIcon style={{ fontSize: 48, color: '#3f51b5' }} />
                <Typography variant="h6" color="textSecondary" component="div">
                 Thêm công thức
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default BookMark;
