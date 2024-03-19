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

function ShoppingCart() {
  const data = [
    {
      image: image,
      title: "Sườn xào chua ngọt",
      price: "100.000đ",
      delete: false,
    },
    {
      image: image,
      title: "Sườn xào chua ngọt",
      price: "100.000đ",
      delete: false,
    },
    {
      image: image,
      title: "Sườn xào chua ngọt",
      price: "100.000đ",
      delete: false,
    },
  ];
  return (
    <div>
      <Layoutspacing>
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
            Bạn có {data.length} sản phẩm trong giỏ hàng
          </Typography>
          <Divider
            sx={{
              height: 5,
              backgroundColor: "transparent",
              borderBottom: "3px solid black",
              width: 870,
              marginBottom: 5,
              marginTop: 2,
            }}
          />
          <Box sx={{ display: "flex", marginTop: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <CartDetail sx={{ height: "500px" }} />
              </Grid>
              <Grid item xs={4}>
                {/* <Box
                  sx={{
                    backgroundColor: "#ffffff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh",
                    borderRadius: 6,
                  }}
                >
                  <Box sx={{ position: "absolute", top: 16, right: 16 }}>
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>H</Avatar>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Button variant="contained" color="primary">
                      Thanh toán
                    </Button>
                  </Box>
                </Box> */}
                <Payment />
              </Grid>
            </Grid>
          </Box>
          <Divider
            sx={{
              height: 5,
              backgroundColor: "transparent",
              borderBottom: "3px solid black",
              width: 870,
              marginBottom: 5,
              marginTop: 5,
            }}
          />
        </Paper>
      </Layoutspacing>
    </div>
  );
}

export default ShoppingCart;
