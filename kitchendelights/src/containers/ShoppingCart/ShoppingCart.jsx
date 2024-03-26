import React from "react";
import Appbar from "../../components/Homepage/Appbar";
import Box from "@mui/material/Box";
import image from "../../assets/images/news1.jpg";
import { Button, Card, Stack, Typography } from "@mui/material";
import Layoutspacing from "../../components/Layoutspacing";
import CartDetail from "./CartDetail";
import Payment from "./Payment";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Footer from "../../components/Footer/Footer";
import { useCount } from "../../store";

function ShoppingCart() {
  const { recipeCountNumber } = useCount();

  return (
    <div>
      <Appbar />{" "}
      {/* <Box
          sx={{
            backgroundColor: "#ff5e00",
            borderRadius: 5,
            minWidth: "1300px",
            height: 650,
            padding: 2,
            marginTop: 2,
            display: "flex",
          }}
        >
          <Stack direction="row" spacing={2} sx={{ flex: "2" }}>
            <Card sx={{ borderRadius: 5 }}>
              <Button></Button>
            </Card>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ flex: "1" }}>
            <Card sx={{ borderRadius: 5 }}>
              <Button>456</Button>
            </Card>
          </Stack>
        </Box> */}
      <Paper
        sx={{
          backgroundColor: "#ff5e00",
          padding: 2,
          marginTop: 3,
          borderRadius: 3,
          width: "64%",
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: "white" }}>
          Giỏ hàng của bạn
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          gutterBottom
          sx={{ color: "white" }}
        >
          Bạn có {recipeCountNumber} sản phẩm trong giỏ hàng
        </Typography>
      </Paper>
      <Grid container spacing={2} sx={{ marginTop: 0, marginBottom: 0 }}>
        <Grid item xs={8}>
          <Paper
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CartDetail />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper style={{}}>
            <Payment />
          </Paper>
        </Grid>
      </Grid>
      <Paper
        sx={{
          backgroundColor: "#ff5e00",
          padding: 2,
          marginTop: 1,
          marginBottom: 2,
          borderRadius: 3,
          width: "64%",
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: "white" }}>
          Giỏ hàng của bạn
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          gutterBottom
          sx={{ color: "white" }}
        >
          {/* Bạn có {data.length} sản phẩm trong giỏ hàng */}
        </Typography>
      </Paper>
      <Footer />
    </div>
  );
}

export default ShoppingCart;
