import React from "react";
import Appbar from "../../components/Homepage/Appbar";
import Box from "@mui/material/Box";
import image from "../../assets/images/news1.jpg";
import { Button, Card, Stack, Typography } from "@mui/material";
import Layoutspacing from "../../components/Layoutspacing";

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
      <Appbar />
      <Layoutspacing>
        {" "}
        <Box
          sx={{
            backgroundColor: "#ff5e00",
            borderRadius: 5,
            minWidth: "1350px",
            height: 800,
            padding: 2,
          }}
        >
          <Stack direction="row" spacing={2}>
            <Card
              sx={{
                // width: 800,
                // height: 800,
                borderRadius: 5,
              }}
              lg={8}
            >
              <Button>123</Button>
            </Card>
            <Card
              sx={{
                // width: 100,
                // height: 800,
                borderRadius: 5,
              }}
              lg={4}
            >
              <Button>456</Button>
            </Card>
          </Stack>
        </Box>
      </Layoutspacing>
    </div>
  );
}

export default ShoppingCart;
