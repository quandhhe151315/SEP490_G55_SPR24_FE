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
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";

function BookMark() {
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
      <Typography marginTop={3} />
      <Typography
        color="#ff5e00"
        sx={{ marginLeft: 35, fontSize: "40px", fontWeight: "bold" }}
      >
        Danh sách công thức của tôi
      </Typography>
      <Typography marginTop={6} />
      <Typography
        sx={{
          marginLeft: "290px",
          fontSize: "16px",
          marginRight: "255px",
          marginTop: "50px",
        }}
      >
       
          <Box>
            <Grid container spacing={3}>
              {data.map((item) => {
                return (
                  <Grid item lg={3} md={6} xs={12}>
                    <Link to={`/RecipeDetail/${item.recipeId}`}>
                    <Card sx={{ maxWidth: 345 }}>
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
                          item
                          lg={3}
                          md={12}
                          xs={12}
                        >
                          {" "}
                          <Rating
                            name="simple-controlled"
                            value={item.recipeRating}
                            size="small"
                          />
                          {/* <Typography component="legend" fontSize={11}>
                            {item.vote} votes
                          </Typography> */}
                        </Box>
                        <Typography marginTop={1} />
                        <Typography>
                          <Stack direction="row" spacing={2}>
                            <Avatar sx={{ width: 24, height: 24 }}></Avatar>
                            <Typography>{item.userName}</Typography>
                          </Stack>
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: -2,
                        }}
                      ></CardActions>
                    </Card>
                    </Link>
                   
                  </Grid>
                
                );
              })}
            </Grid>
          </Box>
       
      </Typography>
    </div>
  );
}

export default BookMark;
