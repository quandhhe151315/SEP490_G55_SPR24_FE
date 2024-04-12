import React, { useEffect, useState } from "react";
import DashboardMenu from "../../components/Dashboard/Menu/DashboardMenu";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Grid, Paper, Typography } from "@mui/material";
import CategoryButton from "../../components/Button/CategoryButton";
import { getAds, deleteAds, changeStatus } from "../../services/Advertisement";
import { DataGrid } from "@mui/x-data-grid";
import CardMedia from "@mui/material/CardMedia";
import useMediaQuery from "@mui/material/useMediaQuery";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import StraightIcon from "@mui/icons-material/Straight";
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

  const handlechangStatus = async (id, status) => {
    try {
      const statusReal = status == 1 ? 2 : 1;
      const response = await changeStatus(id, statusReal);

      if (response.status === 200) {
        setloading(!loading);
      } else {
      }
    } catch (error) {
      console.error("ko xoá dc", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await deleteAds(id);

      if (response.status === 200) {
        toast.success("Xoá thành công ");
        debugger;
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
      width: isSmallScreen ? 100 : 200,
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
            ? "không hoạt động"
            : ""}
        </div>
      ),
    },

    {
      field: "edit",
      headerName: "Hành động",
      width: isSmallScreen ? 120 : 200,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              onClick={() =>
                handlechangStatus(
                  params.row.advertisementId,
                  params.row.advertisementStatus
                )
              }
            >
              <StraightIcon />
            </button>

            <Link to={`/UpdateAdvertisement/${params.row.advertisementId}`}>
              <button style={{ marginLeft: 8, marginRight: 8 }}>
                <EditIcon />
              </button>
            </Link>

            <button onClick={() => handleDelete(params.row.advertisementId)}>
              <DeleteIcon />
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <DashboardMenu dashboardTitle={"Quản lý quảng cáo"} />
        <Grid sx={{ marginTop: "80px", marginLeft: "80px" }}>
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
            sx={{ width: "1100px", height: "450px" }}
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
            disableRowSelectionOnClick
          />
        </Grid>
      </Box>
    </div>
  );
}
