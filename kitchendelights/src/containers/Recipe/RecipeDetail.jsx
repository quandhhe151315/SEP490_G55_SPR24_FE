import React, { useState, useEffect, useRef } from "react";
import Appbar from "../../components/Homepage/Appbar";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useNavigate, useParams } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Rating from "@mui/material/Rating";
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
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AddRecipeToMenuDialog from "../Menu/AddRecipeToMenu";
import { toast } from "react-toastify";

import { RichTextReadOnly } from "mui-tiptap";
import useExtensions from "../../components/Richtext/useExtension.ts";
import {
  createRecipe,
  listAllIngredient,
  listAllCountry,
} from "../../services/ApiServices.jsx";
import {
  getRecipeById,
  getMenuByUserIdAndCheckExistRecipe,
} from "../../services/ApiServices";
import moment from "moment";
import CreateNewMenuDialog from "../Menu/CreateNewMenu";
import GetInformationJWT from "../../components/JWT/GetInformationJWT";
import { getMenus } from "../../services/ApiServices";
import { addRecipeToBookMark } from "../../services/ApiServices";
import CommentSection from "../../containers/BoxComment/CommentSection";
import Cookies from "js-cookie";
import Footer from "../../components/Footer/Footer.jsx";
import RandomRecipes from "./RandomRecipe";
function RecipeDetail() {
  const navigate = useNavigate();
  const [data, setdata] = useState();
  const [data1, setdata1] = useState([]);
  const { recipeId } = useParams();

  const commentRef = useRef(null);
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

  const uId = getUserIdFromCookie();

  const rId = recipeId;
  const type = 1;
  console.log("idRID: ", rId);
  console.log("userId", uId);
  const GoToBookMark = () => {
    navigate("/BookMark");
  };

  const [selectMenuDialog, setSelectMenuDialog] = useState(false);
  const [createMenuDialog, setCreateMenuDialog] = useState(false);

  const [id, setId] = useState("");
  const [listMenu, setListMenu] = useState([]);
  const [printMode, setPrintMode] = useState(false);
  const shareToFacebook = () => {
    window.open(
      "https://www.facebook.com/sharer/sharer.php?u=https://your-website-url.com",
      "_blank"
    );
  };

  // const getListMenu = async () => {
  //   try {
  //     const response = await getMenus(id);
  //     if (response.status === 200) {
  //       setListMenu(response.data);
  //     } else {
  //       console.error("lỗi khi tải danh sách menu");
  //     }
  //   } catch (error) {
  //     console.error("lỗi API getMenu", error);
  //   }
  // };

  const videoTopPosition = 400;
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const getListMenu = async () => {
    try {
      const response = await getMenuByUserIdAndCheckExistRecipe(id, rId);
      if (response.status === 200) {
        setListMenu(response.data);
      } else {
        console.log("lỗi API menu", response);
      }
    } catch (error) {
      console.log("lỗi khi tải danh sách menu", error);
    }
  };
  // thêm vào danh sách yêu thích
  const handleAddBookMark = async () => {
    try {
      const response = await addRecipeToBookMark(uId, rId, type);
      GoToBookMark();
      toast.success("Thêm vào danh sách thành công");
      if (response.status === 200) {
        console.log("add thanh cong");
      } else {
        console.log("ko add dc");
      }
    } catch (error) {
      console.error("ko add dc", error);
    }
  };
  //đóng mởi chon menu dialog
  const handleOpenSelectMenuDialog = () => {
    getListMenu();
    setSelectMenuDialog(true);
  };
  const handleCloseSelectMenuDialog = () => {
    setSelectMenuDialog(false);
  };
  const handlePrint = () => {
    setPrintMode(true);
    setTimeout(() => {
      window.print();
      setPrintMode(false);
    }, 500);
  };
  //đóng mở tạo menu dialog
  const handleOpenCreateMenuDialog = () => {
    setSelectMenuDialog(false);
    setCreateMenuDialog(true);
  };
  const handleCloseCreateMenuDialog = () => {
    getListMenu();
    setCreateMenuDialog(false);
    setSelectMenuDialog(true);
  };
  // get công thức chi tiết theo id
  useEffect(() => {
    if (recipeId) {
      handleGetRecipessById();
    }
  }, [recipeId]);
  const handleGetRecipessById = async () => {
    try {
      const response = await getRecipeById(recipeId);
      if (response.status === 200) {
        setdata(response.data);
        setdata1(response.data.recipeIngredients);
        console.log("data", response);
      } else {
        console.error("Can not Load news! ");
      }
    } catch (error) {
      toast.error("Khoong load dc list");
    }
  };

  const handleScrollToComment = () => {
    commentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const extensions = useExtensions({
    placeholder: "Nội dung của bạn ...",
  });

  return (
    <div>
      <GetInformationJWT setId={setId} />
      {!printMode && <Appbar />}
      {!printMode && (
        <Typography
          sx={{ fontSize: "16px", marginRight: "255px", marginTop: "50px" }}
        ></Typography>
      )}

      <Typography
        color="#ff5e00"
        sx={{ marginLeft: 35, fontSize: "60px", fontWeight: "bold" }}
      >
        {data?.recipeTitle}
      </Typography>
      <Typography sx={{ height: 10 }} />
      {!printMode && (
        <Typography sx={{ marginLeft: 35 }}>
          <Stack direction="row" spacing={1}>
            <Avatar
              sx={{ width: 20, height: 20 }}
              alt="Remy Sharp"
              src="../assets/images/news1.jpg"
            />
            <Typography sx={{ fontSize: 14 }}> {data?.userName}</Typography>
            <Button
              sx={{ height: 14 }}
              endIcon={<CalendarTodayIcon />}
            ></Button>
            <Typography sx={{ fontSize: 14 }}>
              {moment(data?.createDate).format("DD/MM/YYYY")}
            </Typography>
            <Rating
              name="half-rating"
              defaultValue={2.5}
              precision={0.5}
            ></Rating>
            <Typography sx={{ height: 30 }} />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button
              size="small"
              variant="contained"
              sx={{
                bgcolor: "#ff5e00",
                color: "white",
                borderRadius: "15px",
                width: "110px",
                height: "35px",
              }}
              endIcon={<ThumbUpIcon />}
              onClick={handleScrollToComment}
            >
              Đánh giá
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
              onClick={handleAddBookMark}
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
              onClick={handlePrint}
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
              onClick={shareToFacebook}
            >
              Chia sẻ
            </Button>

            {/*nút add to menu*/}
            <Button
              onClick={handleOpenSelectMenuDialog}
              size="small"
              variant="contained"
              sx={{
                bgcolor: "#ff5e00",
                borderRadius: "15px",
                width: "150px",
                height: "35px",
                color: "white",
                size: "20px",
                fontSize: "12px",
              }}
              endIcon={<MenuBookIcon />}
            >
              Thêm vào menu
            </Button>
            <AddRecipeToMenuDialog
              open={selectMenuDialog}
              handleClose={handleCloseSelectMenuDialog}
              onOpenCreate={handleOpenCreateMenuDialog}
              listMenu={listMenu}
              recipeId={recipeId}
            />
            <CreateNewMenuDialog
              open={createMenuDialog}
              s
              handleClose={handleCloseCreateMenuDialog}
            />
          </Stack>
          <Typography sx={{ marginTop: 3 }} />
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ width: 850 }}>
          <Card>
            <CardContent>
              <div className="video-container ">
                {data && data?.videoLink ? ( // Kiểm tra xem có dữ liệu video và embedUrl không
                  <>
                    <iframe
                      width="100%"
                      height="400"
                      // src={data?.videoLink}
                      src="https://www.youtube.com/embed/oHlKAMKi24E?controls=0"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  </>
                ) : (
                  <CardMedia
                    component={"img"}
                    height={500}
                    image={data?.featuredImage}
                    alt="green iguana"
                  /> // Hiển thị hình ảnh khi không có video
                )}
              </div>
            </CardContent>
          </Card>

          <CardContent>
            <RichTextReadOnly
              content={data?.recipeContent}
              extensions={extensions}
            />
          </CardContent>
          <CardContent>
            <Stack direction="row" spacing={2}>
              <Typography sx={{ color: "gray" }}>
                Thời gian chuẩn bị{" "}
              </Typography>
              <Typography sx={{ color: "gray" }}>Thời gian nấu </Typography>
              <Typography sx={{ color: "gray" }}>Số người phục vụ </Typography>
            </Stack>
            <Stack direction="row" spacing={12}>
              <Typography>{data?.preparationTime}</Typography>
              <Typography>{data?.cookTime} </Typography>
              <Typography>{data?.recipeServe}</Typography>
            </Stack>
            <Typography sx={{ fontSize: 25, fontWeight: "bold" }}>
              Nguyên liệu
            </Typography>
            {/* {data1.map((item) => {
              return (
                <div key={item.ingredientId}>
                  <p>Ingredient ID: {item.ingredientId}</p>
                  <p>Ingredient Name: {item.ingredientName}</p>
                  <p>Unit Value: {item.unitValue}</p>
                  <p>Ingredient Unit: {item.ingredientUnit}</p>
                </div>
              );
            })} */}
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={data1?.ingredientName}
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
              {data?.recipeContent}
            </Typography>
            {!printMode && (
              <Typography
                color="#ff5e00"
                sx={{ fontSize: "35px", fontWeight: "bold" }}
                ref={commentRef}
              >
                Đánh giá cho công thức
              </Typography>
            )}
            {!printMode && <CommentSection recipeId={recipeId} />}
          </CardContent>
        </Card>
      </Box>
      {/* {!printMode && <RandomRecipes />} */}
      {/* {!printMode && <Footer />} */}
    </div>
  );
}

export default RecipeDetail;