import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, Paper, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import DashboardMenu from "../../components/Dashboard/Menu/DashboardMenu";
import Typography from "@mui/material/Typography";
import CategoryButton from "../../components/Button/CategoryButton";
import { Navigate, useNavigate } from "react-router-dom";
import { updateAds, getAdsId, getAds } from "../../services/Advertisement";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
function UpdateAdvertisement() {
  const navigate = useNavigate();
  const { advertisementId } = useParams();
  const [Image, setImage] = useState("");
  console.log("image", Image);
  const advertisementImage = Image;
  const [Link, setLink] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      if (file.type.startsWith("image/")) {
        reader.readAsDataURL(file);
      } else {
        toast.error("Vui lòng chỉ chọn file ảnh!");
        setImage(null);
      }
    }
  };
  const advertisementLink = Link;
  useEffect(() => {
    getADS();
  }, []);
  const GoToListAds = () => {
    navigate("/AdsManagement");
  };
  const getADS = async () => {
    try {
      const response = await getAds();
      if (response.status === 200) {
        //  setADS(response.data);
      } else {
        console.error("không thể lấy dữ liệu về ads");
      }
    } catch (error) {
      console.error("lỗi khi tải danh sách ads", error);
    }
  };
  useEffect(() => {
    getAdsById();
  }, [advertisementId]);

  const getAdsById = async () => {
    try {
      const response = await getAdsId(advertisementId);
      if (response.status === 200) {
        setImage(response.data.advertisementImage);
        setLink(response.data.advertisementLink);
      } else {
        console.error("Can not get category information");
      }
    } catch (error) {
      console.error("lỗi khi tải danh sách parent category", error);
    }
  };
  const handleUpdateAds = async () => {
    if (!advertisementLink) {
      toast.error("Vui lòng nhập link ảnh!");
      return;
    }
    if (!advertisementImage) {
      toast.error("Vui lòng chọn ảnh!");
      return;
    }
    try {
      const response = await updateAds(
        advertisementId,
        advertisementImage,
        advertisementLink
      );
      if (response.status === 200) {
        GoToListAds();
        toast.success("Cập nhật quảng cáo thành công");
      } else {
      }
    } catch (error) {
      toast.error("Cập nhật quảng cáo thất bại");
    }
  };
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <DashboardMenu dashboardTitle={"Quản lý quảng cáo"} />
        <Grid sx={{ marginTop: "80px", marginLeft: "80px" }}>
          <Paper
            sx={{
              borderRadius: "15px",
              border: "1px solid #bfb8b8",
              width: "1000px",
              height: "570px",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Typography
              sx={{
                fontSize: "40px",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "20px",
                color: "#0B488F",
              }}
            >
              Sửa quảng cáo
            </Typography>
            <Grid container sx={{ marginTop: "30px", marginLeft: "30px" }}>
              <Grid item xs={8}>
                <Grid container direction="column">
                  <Grid item xs container direction="row">
                    <TextField
                      onChange={(e) => setLink(e.target.value)}
                      size="small"
                      type="input"
                      value={Link}
                      placeholder="Link quảng cáo"
                      sx={{
                        width: "100%",
                        height: "55%",
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginTop: "30px",
                        marginLeft: "200px",
                        backgroundColor: "#FFFFFF",
                      }}
                    ></TextField>
                    <Box sx={{ marginLeft: "200px" }}>
                      <input type="file" onChange={handleImageChange} />
                    </Box>
                  </Grid>

                  <Grid item>
                    <CategoryButton
                      onClick={handleUpdateAds}
                      text="Sửa"
                      height="auto"
                      width="120px"
                      marginLeft="200px"
                      marginTop="80px"
                    ></CategoryButton>
                    <CategoryButton
                      onClick={() => {
                        GoToListAds();
                      }}
                      text="Huỷ"
                      height="auto"
                      width="120px"
                      marginLeft="200px"
                      marginTop="80px"
                    ></CategoryButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Box>
    </div>
  );
}
export default UpdateAdvertisement;
