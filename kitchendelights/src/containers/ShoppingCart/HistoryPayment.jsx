import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import CardMedia from "@mui/material/CardMedia";
import { Button, Card, Stack, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getHistoryPayment } from "../../services/Payment";
import Paper from "@mui/material/Paper";
import Appbar from "../../components/Homepage/Appbar";
import AvatarMenu from "../../components/Account/AvatarMenu";
import Box from "@mui/material/Box";
import moment from "moment";
import Grid from "@mui/material/Unstable_Grid2";
export default function HistoryPayment() {
  const [data, setdata] = useState([]);
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
  }, []);
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
      valueFormatter: (params) => {
        // Format ngày dưới dạng "DD/MM/YYYY"
        return moment(params.value).format("DD/MM/YYYY");
      },
    },
  ];
  return (
    <div>
      <Appbar />
      <Grid container spacing={2} sx={{ marginBottom: "2%" }}>
        <Grid item xs={2} sx={{ marginLeft: "10%" }}>
          <AvatarMenu />
        </Grid>
        <Grid item xs={7} sx={{ marginTop: "28px" }}>
          <Paper
            elevation={2}
            style={{
              marginLeft: "20px",
              height: "500px",
              width: "1100px",
              overflow: "auto",
            }}
          >
            <Typography
              marginTop={3}
              sx={{
                marginLeft: 10,
                fontSize: "28px",
                fontWeight: "bold",
                color: "#ff5e00",
              }}
            >
              Lịch sử mua hàng
            </Typography>
            <Typography marginTop={6} />
            <Box sx={{ marginTop: "30px" }}>
              <DataGrid
                sx={{ minWidth: "940px", minHeight: "400px" }}
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
                disableRowSelectionOnClick
                slots={{ toolbar: QuickSearchToolbar }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter />
    </Box>
  );
}
