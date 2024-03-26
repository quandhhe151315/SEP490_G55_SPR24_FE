import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import VNPAY from "../../assets/images/VNPAY.jpg";
import { useSum } from "../../store";

export default function ImgMediaCard() {
  const { priceSum } = useSum();
  return (
    <Card
      sx={{
        height: 600,

        borderRadius: 2,
      }}
    >
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          Hình thức thanh toán
        </Typography>
      </CardContent>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          style={{ maxWidth: "100%", objectFit: "contain" }}
        /> */}
        <img
          src={VNPAY}
          alt="Image VNPAY"
          style={{ width: "350px", height: "240px" }}
        />
      </div>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          size="large"
          sx={{
            border: "2px solid #000",
            borderRadius: "20px",
            "&:hover": {
              backgroundColor: "#000",
              color: "#fff",
            },
            color: "#000",
          }}
        >
          Thanh toán qua VNPAY
        </Button>
      </CardActions>
      <CardContent sx={{}}>
        <Typography gutterBottom variant="h7" component="div">
          Giá tạm tính :{priceSum}
        </Typography>
        <Typography
          gutterBottom
          variant="h7"
          component="div"
          sx={{ marginTop: 2 }}
        >
          Tổng tiền
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          gutterBottom
          variant="h7"
          component="div"
          sx={{ marginLeft: 1 }}
        >
          Mã giảm giá
        </Typography>
        <Button
          size="small"
          sx={{
            border: "2px solid #000",
            borderRadius: "20px",
            "&:hover": {
              backgroundColor: "#000",
              color: "#fff",
            },
            color: "#000",
            marginBottom: 2,
          }}
        >
          Chọn mã giảm giá
        </Button>
      </CardActions>
    </Card>
  );
}
