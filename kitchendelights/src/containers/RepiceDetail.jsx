import React from "react";
import Appbar from "../components/Homepage/Appbar";
import Typography from "@mui/material/Typography";
import image from "../assets/images/news1.jpg";
import { Box, Button, Icon } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Rating from "@mui/material/Rating";
import ClassicButton from "../components/Button/ClassicButton";
import BoxComment from "../components/BoxComment/BoxComent";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CommentBox from "../components/BoxComment/BoxComent";

function RepiceDetail() {
  const data = [
    {
      image: image,
      title:
        "Một điều tôi học được khi sống ở khu Canarsie ở Brooklyn, NY là nấu một bữa ăn Ý ngon. Đây là công thức tôi tạo ra sau khi ăn món này ở nhà hàng. Thưởng thức!",
      title1:
        "Một điều tôi học được khi sống ở khu Canarsie ở Brooklyn, NY là nấu một bữa ăn Ý ngon. Đây là công thức tôi tạo ra sau khi ăn món này ở nhà hàng. Thưởng thức,Một điều tôi học được khi sống ở khu Canarsie ở Brooklyn, NY là nấu một bữa ăn Ý ngon. Đây là công thức tôi tạo ra sau khi ăn món này ở nhà hàng. Thưởng thức,Một điều tôi học được khi sống ở khu Canarsie ở Brooklyn, NY là nấu một bữa ăn Ý ngon. Đây là công thức tôi tạo ra sau khi ăn món này ở nhà hàng. Thưởng thức,",
      time: "Cong thuc free",
      nguyenlieu: 3,
      cachlam: 103,
    },
  ];
  return (
    <div>
      <Appbar />
      <Typography
        sx={{ fontSize: "16px", marginRight: "255px", marginTop: "50px" }}
      ></Typography>
      <Typography
        color="#ff5e00"
        sx={{ marginLeft: 35, fontSize: "40px", fontWeight: "bold" }}
      >
        {" "}
        Bánh phô mai kem dâu{" "}
      </Typography>
      <Typography sx={{ marginLeft: 35 }}>
        <Stack direction="row" spacing={1}>
          <Avatar
            sx={{ width: 20, height: 20 }}
            alt="Remy Sharp"
            src="../assets/images/news1.jpg"
          />
          <Typography sx={{ fontSize: 14 }}>Pham Minh Hieu</Typography>
          <Button sx={{ height: 14 }} endIcon={<CalendarTodayIcon />}></Button>
          <Typography sx={{ fontSize: 14 }}>25/01/2024</Typography>
          <Rating
            name="half-rating"
            defaultValue={2.5}
            precision={0.5}
          ></Rating>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button
            size="small"
            variant="contained"
            sx={{
              bgcolor: "#ff5e00",
              borderRadius: "15px",
              width: "100px",
              height: "35px",
              color: "white",
            }}
            endIcon={<ThumbUpIcon />}
          >
            Thích
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{
              bgcolor: "#ff5e00",
              borderRadius: "15px",
              width: "100px",
              height: "35px",
              color: "white",
            }}
            endIcon={<FavoriteIcon />}
          >
            Lưu
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{
              bgcolor: "#ff5e00",
              borderRadius: "15px",
              width: "100px",
              height: "35px",
              color: "white",
            }}
            endIcon={<PrintIcon />}
          >
            In
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{
              bgcolor: "#ff5e00",
              borderRadius: "15px",
              width: "100px",
              height: "35px",
              color: "white",
            }}
            endIcon={<ShareIcon />}
          >
            Chia sẻ
          </Button>
        </Stack>
        <Typography sx={{ marginTop: 3 }} />
      </Typography>
      <Box sx={{ marginLeft: 35 }}>
        {data.map((item) => {
          return (
            <Card sx={{ width: 1000 }}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {item.title}
                </Typography>
              </CardContent>
              <CardMedia
                component={"img"}
                height={500}
                image={item.image}
                alt="green iguana"
              />
              <CardContent>
                <Stack direction="row" spacing={2}>
                  <Typography sx={{ color: "gray" }}>
                    Thời gian chuẩn bị{" "}
                  </Typography>
                  <Typography sx={{ color: "gray" }}>Thời gian nấu </Typography>
                  <Typography sx={{ color: "gray" }}>
                    Số người phục vụ{" "}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={12}>
                  <Typography>15 phút</Typography>
                  <Typography>15 phút </Typography>
                  <Typography>4 người</Typography>
                </Stack>
                <Typography sx={{ fontSize: 25, fontWeight: "bold" }}>
                  Nguyên liệu
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="400g graham cracker"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="150g únalted butters, melted"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="175g únalted butter, nelted"
                  />
                </FormGroup>
                <Typography sx={{ fontSize: 25, fontWeight: "bold" }}>
                  Cách làm
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {item.title1}
                </Typography>
                <CommentBox />
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </div>
  );
}

export default RepiceDetail;
