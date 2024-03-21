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
import { Avatar } from "@mui/material";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import { removeRecipeFromBookMark } from "../../services/ApiServices";

function BookMark() {
  const navigate = useNavigate();
  const onAddNew = () => {
    navigate("/ViewListRecipes");
  };
  const [currentRecipeId, setCurrentRecipeId] = useState(null);
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
  const uId = id;
  const type = 2;
  const rId = currentRecipeId;
  const handleDeleteBookMark = async () => {
    try {
      const response = await removeRecipeFromBookMark(uId, rId, type);
      console.log(uId, rId, type);

      if (response.status === 200) {
        toast.success("Xoá thành công ");

        getBookMarkOfUsers();
      } else {
        toast.error("Khoong load dc list");
      }
    } catch (error) {
      console.error("ko xoá dc", error);
    }
  };
  useEffect(() => {
    getBookMarkOfUsers(id);
  }, []);
  const getBookMarkOfUsers = async () => {
    try {
      const response = await getBookMarkOfUser(id);
      if (response.status === 200) {
        setdata(response.data.recipes);
        console.log("data", response);
        if (response.data.recipes.length > 0) {
          setCurrentRecipeId(response.data.recipes[0].recipeId);
        }
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
      <Typography
        marginTop={3}
        color="#ff5e00"
        sx={{ marginLeft: 35, fontSize: "40px", fontWeight: "bold" }}
      >
        Danh sách công thức yêu thích của tôi
      </Typography>
      <Typography marginTop={6} />
      <Box
        sx={{ marginLeft: "290px", marginRight: "255px", marginTop: "50px" }}
      >
        <Grid container spacing={3}>
          {/* Danh sách công thức */}
          {data.map((item, index) => (
            <Grid item lg={3} md={6} xs={12} key={index}>
              <Card sx={{ maxWidth: 345, position: "relative" }}>
                <CardMedia
                  component={"img"}
                  height={140}
                  image={item.featuredImage}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.recipeTitle}
                  </Typography>
                  <Rating
                    name="simple-controlled"
                    value={item.recipeRating}
                    size="small"
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexDirection: "column",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ marginTop: "8px" }}
                    >
                      <Avatar sx={{ width: 24, height: 24 }} />
                      <Typography>{item.userName}</Typography>
                    </Stack>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "8px",
                    }}
                  >
                    <Link to={`/RecipeDetail/${item.recipeId}`}>
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "#ff5e00",
                          color: "white",
                          borderRadius: 3,
                          width: 75,
                        }}
                      >
                        Xem
                      </Button>
                    </Link>
                    <Button
                      sx={{
                        bgcolor: "#ff5e00",
                        color: "white",
                        borderRadius: 3,
                        width: 75,
                      }}
                      variant="contained"
                      onClick={handleDeleteBookMark}
                    >
                      Xoá
                    </Button>
                  </Box>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: -2,
                    position: "absolute",
                    top: 0,
                    right: 0,
                  }}
                ></CardActions>
              </Card>
            </Grid>
          ))}
          {/* Card thêm mới công thức */}
          <Grid item lg={3} md={6} xs={12}>
            <Card
              sx={{
                textAlign: "center",
                backgroundColor: "#f0f0f0",
                cursor: "pointer",
              }}
              onClick={onAddNew}
            >
              <CardContent>
                <AddCircleIcon style={{ fontSize: 48, color: "#3f51b5" }} />
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
