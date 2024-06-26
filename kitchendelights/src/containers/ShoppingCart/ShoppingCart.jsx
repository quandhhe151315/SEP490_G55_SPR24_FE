import React from "react";
import Appbar from "../../components/Homepage/Appbar";
import Box from "@mui/material/Box";
import { Button, Card, Stack, Typography } from "@mui/material";
import Layoutspacing from "../../components/Layoutspacing";
import CartDetail from "./CartDetail";
import Payment from "./Payment";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Footer from "../../components/Footer/Footer";
import { useCount, useName } from "../../store";
import { useNavigate } from "react-router-dom";
function ShoppingCart() {
  const navigate = useNavigate();
  const { recipeCountNumber } = useCount();

  const { userName } = useName();
  const goToListRecipe = () => {
    navigate("/ViewListRecipes");
  };

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
          Giỏ hàng của {userName}
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
      <Grid container spacing={2} sx={{ marginTop: 0, marginBottom: 1 }}>
        <Grid item xs={12} md={8}>
          <CartDetail />
        </Grid>
        <Grid item xs={12} md={4}>
          <Payment />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#ff5e00",
          color: "white",
          borderRadius: "15px",
          width: "200px",
          height: "50px",
          marginBottom: 2,
        }}
        onClick={goToListRecipe}
      >
        Tiếp tục mua sắm!
      </Button>
    </div>
  );
}

export default ShoppingCart;
