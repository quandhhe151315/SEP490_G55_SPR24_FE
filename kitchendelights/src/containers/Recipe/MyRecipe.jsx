import React, { useEffect } from "react";
import Appbar from "../../components/Homepage/Appbar";
import Grid from "@mui/material/Grid";
import AvatarMenu from "../../components/Account/AvatarMenu";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { getRecipeByUserId } from "../../services/ApiServices";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";

function MyRecipe() {

  const [listRecipe, setListRecipe] = useState([]);


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

  const getMyRecipe = async () => {
    try {
      const response = await getRecipeByUserId(id);
      if (response.status === 200) {
        setListRecipe(response.data);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error("Error", error);
    }
  }

  useEffect(() => {
    getMyRecipe();
    console.log("listRecipe", listRecipe);
    console.log("id", id);
  }, []);


  return (
    <div>
      <Appbar />

      <Grid container spacing={2} sx={{ marginBottom: '2%' }}>
        <Grid item xs={2} sx={{ marginLeft: '10%' }}>
          <AvatarMenu />
        </Grid>
        <Grid item xs={7} sx={{ marginTop: '28px' }}>
          <Paper elevation={2} style={{ marginLeft: '20px', height: '800px', width: '1100px', overflow: 'auto' }}>
            <Typography
              marginTop={3}
              sx={{ marginLeft: 10, fontSize: "28px", fontWeight: "bold" }}
            >
              Danh sách công thức đã tạo của tôi
            </Typography>
            <Box
              sx={{ marginTop: "30px", marginLeft: '10px', marginRight: '10px' }}
            >
              <Grid container spacing={3}>
                {/* Danh sách công thức */}
                {listRecipe.length === 0 ? (
                  <Typography
                    sx={{
                      marginTop: "40px",
                      marginLeft: "300px",
                      fontSize: "20px",
                    }}
                  >
                    Bạn chưa tạo công thức nào
                  </Typography>
                ) : (

                  listRecipe.map((item, index) => (
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
                  ))
                )}
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )

}

export default MyRecipe;