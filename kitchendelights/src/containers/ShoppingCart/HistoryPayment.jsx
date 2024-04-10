import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import CardMedia from "@mui/material/CardMedia";
import { Button, Card, Stack, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getHistoryPayment } from "../../services/Payment";
import Paper from "@mui/material/Paper";
import Appbar from "../../components/Homepage/Appbar";
export default function HistoryPayment() {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
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
  const id = getUserIdFromCookie();
  useEffect(() => {
    getHistoryPayments(id);
  }, [loading]);
  const getHistoryPayments = async (id) => {
    try {
      const response = await getHistoryPayment(id);
      if (response.status === 200) {
        setdata(response.data);

        console.log("Load cart successful! ");
      } else {
        console.error("Can not Load cart! ");
      }
    } catch (error) {}
  };
  const columns = [
    {
      field: "recipeTitle",
      headerName: "Tên công thức",

      headerClassName: "header-bold",
      width: isSmallScreen ? 200 : 400,
    },
    {
      field: "actualPrice",
      headerName: "Giá",

      headerClassName: "header-bold",
      width: isSmallScreen ? 200 : 400,
    },
    {
      field: "purchaseDate",

      headerName: "Ngày mua",
      width: isSmallScreen ? 125 : 250,
    },
  ];
  return (
    <div>
      <Appbar />
      <Paper
        sx={{
          backgroundColor: "#ff5e00",
          padding: 2,
          marginTop: 3,
          borderRadius: 3,
          width: "64%",
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: "white" }}>
          Lịch sử mua hàng của {data?.username}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          gutterBottom
          sx={{ color: "white" }}
        >
          Bạn có {data?.lenght} sản phẩm đã mua
        </Typography>
      </Paper>
      <Typography sx={{ marginTop: 2 }} />
      <DataGrid
        sx={{ minWidth: "940px", minHeight: "600px" }}
        rows={data}
        getRowId={(row) => row.recipeId}
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
    </div>
  );
}
