import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, Paper, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import DashboardMenu from "../../components/Dashboard/Menu/DashboardMenu";
import Typography from "@mui/material/Typography";
import CategoryButton from "../../components/Button/CategoryButton";
import { Navigate, useNavigate } from "react-router-dom";
import { createAds } from "../../services/Advertisement";

import { toast } from "react-toastify";
function CreateAdvertisement() {
  const navigate = useNavigate();
  const [Link, setLink] = useState("");
  const advertisementLink = Link;
  const [image, setImage] = useState(null);
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
      }
    }
  };
  const advertisementImage = image;
  const GoToAds = () => {
    navigate("/AdsManagement");
  };

  const handleCreatADS = async () => {
    if (!advertisementLink) {
      toast.error("Vui lòng nhập link ảnh!");
      return;
    }
    if (!advertisementImage) {
      toast.error("Vui lòng chọn ảnh!");
      return;
    }
    try {
      const response = await createAds(advertisementImage, advertisementLink);
      GoToAds();
      if (response.status === 200) {
        toast.success("Tạo quảng cáo thành công");
      } else {
      }
    } catch (error) {
      toast.error("Tạo quảng cáo thất bại");
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
              Tạo quảng cáo
            </Typography>
            <Grid container sx={{ marginTop: "30px", marginLeft: "30px" }}>
              <Grid item xs={8}>
                <Grid container direction="column">
                  <Grid item xs container direction="row">
                    <TextField
                      onChange={(e) => setLink(e.target.value)}
                      size="small"
                      type="input"
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
                      onClick={handleCreatADS}
                      text="Tạo"
                      height="auto"
                      width="120px"
                      marginLeft="200px"
                      marginTop="80px"
                    ></CategoryButton>
                    <CategoryButton
                      onClick={() => {
                        GoToAds();
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
export default CreateAdvertisement;
