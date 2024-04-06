import React, { useEffect, useState } from "react";
import DashboardMenu from "../../components/Dashboard/Menu/DashboardMenu";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Grid, Paper, Typography } from "@mui/material";
import CategoryButton from "../../components/Button/CategoryButton";
import { getAds, deleteAds } from "../../services/Advertisement";
import { DataGrid } from "@mui/x-data-grid";
import CardMedia from "@mui/material/CardMedia";
import useMediaQuery from "@mui/material/useMediaQuery";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
export default function ViewAdvertisement() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [ADS, setADS] = useState([]);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const goToCreateADS = () => {
    navigate("/CreateAdvertisement");
  };
  useEffect(() => {
    getADS();
  }, [loading]);
  const getADS = async () => {
    try {
      const response = await getAds();
      if (response.status === 200) {
        setADS(response.data);
      } else {
        console.error("không thể lấy dữ liệu về ads");
      }
    } catch (error) {
      console.error("lỗi khi tải danh sách ads", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await deleteAds(id);

      if (response.status === 200) {
        toast.success("Xoá thành công ");

        setloading(!loading);
      } else {
        toast.error("Khoong load dc list");
      }
    } catch (error) {
      console.error("ko xoá dc", error);
    }
  };
  const columns = [
    {
      field: "advertisementId",
      headerName: "ID",

      headerClassName: "header-bold",
      width: isSmallScreen ? 50 : 100,
    },
    {
      field: "advertisementImage",
      headerName: "Hình ảnh",
      width: 200,
      renderCell: (params) => {
        return (
          <CardMedia
            component="img"
            image={params.row.advertisementImage}
            style={{
              width: isSmallScreen ? 60 : 120,
              height: "auto",
            }}
          />
        );
      },
    },
    {
      field: "advertisementLink",
      headerName: "Link quảng cáo",

      headerClassName: "header-bold",
      width: isSmallScreen ? 150 : 350,
    },
    {
      field: "advertisementStatus",
      headerName: "Trạng thái",
      width: isSmallScreen ? 50 : 100,
      renderCell: (params) => (
        <div
          style={{
            color:
              params.row.advertisementStatus === 1
                ? "green"
                : params.row.advertisementStatus === 2
                ? "red"
                : "",
          }}
        >
          {params.row.advertisementStatus === 1
            ? "Hoạt động"
            : params.row.advertisementStatus === 2
            ? "Ẩn"
            : ""}
        </div>
      ),
    },
    {
      field: "edit",
      headerName: "Xoá",
      width: isSmallScreen ? 40 : 60,
      renderCell: (params) => {
        return (
          <button onClick={() => handleDelete(params.row.advertisementId)}>
            <DeleteIcon />
          </button>
        );
      },
    },
  ];
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <DashboardMenu dashboardTitle={"Quản lý quảng cáo"} />
        <Grid sx={{ marginTop: "80px", marginLeft: "80px" }}>
          <Paper
            elevation={2}
            sx={{
              borderRadius: "15px",
              border: "1px solid #bfb8b8",
              width: "1100px",
              height: "650px",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "",
                marginLeft: "10%",
                marginTop: "30px",
                color: "#4A5568",
              }}
            >
              Danh sách quảng cáo
            </Typography>
            <CategoryButton
              text="Tạo quảng cáo mới"
              height="auto"
              width="auto"
              marginLeft="70%"
              marginTop="10px"
              onClick={goToCreateADS}
            ></CategoryButton>
            <Typography marginBottom={2} />
            <DataGrid
              sx={{ minWidth: "940px", minHeight: "300px" }}
              rows={ADS}
              getRowId={(row) => row.advertisementId}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              // disableRowSelectionOnClick
            />
          </Paper>
        </Grid>
      </Box>
    </div>
  );
}
