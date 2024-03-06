import React from "react";
import Appbar from "../../components/Homepage/Appbar";
import Typography from "@mui/material/Typography";
import image from "../../assets/images/news1.jpg";
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

function BookMark() {
  const data = [
    {
      image: image,
      title: "Cong thuc free",
      rating: 3,
      vote: 103,
    },
    {
      image: image,
      title: "Cong thuc free",
      rating: 3,
      vote: 103,
    },
    {
      image: image,
      title: "Cong thuc free",
      rating: 3,
      vote: 103,
    },
    {
      image: image,
      title: "Cong thuc free",
      rating: 3,
      vote: 103,
    },
  ];
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
        <Link to="/RecipeDetail">
          <Box>
            <Grid container spacing={3}>
              {data.map((item) => {
                return (
                  <Grid item lg={3} md={6} xs={12}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        component={"img"}
                        height={140}
                        image={item.image}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {item.title}
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
                            value={item.rating}
                            size="small"
                          />
                          <Typography component="legend" fontSize={11}>
                            {item.vote} votes
                          </Typography>
                        </Box>
                        <Typography marginTop={1} />
                        <Typography>
                          <Stack direction="row" spacing={2}>
                            <Avatar sx={{ width: 24, height: 24 }}></Avatar>
                            <Typography>Pham Minh Hieu</Typography>
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
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Link>
      </Typography>
    </div>
  );
}

export default BookMark;
