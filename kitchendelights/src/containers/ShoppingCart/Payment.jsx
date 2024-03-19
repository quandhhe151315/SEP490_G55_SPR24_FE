import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ImgMediaCard() {
  return (
    <Card sx={{ maxWidth: "100%", borderRadius: 4 }}>
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
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          style={{ maxWidth: "100%", objectFit: "contain" }}
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
          Giá tạm tính
        </Typography>
        <Typography gutterBottom variant="h7" component="div">
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
        <Typography gutterBottom variant="h7" component="div">
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
          }}
        >
          Chọn mã giảm giá
        </Button>
      </CardActions>
    </Card>
  );
}
