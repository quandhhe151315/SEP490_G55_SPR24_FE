import { Box, Typography, Stack,Grid } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React from "react";

export default function NotAuthorication() {
  return (
    <div>
      <Box sx={{ height: "800px" }}>
        <Box
          sx={{
            height: "300px",
            textAlign: "center",
            mx: 4,
            mt: 14,
           
          }}
        >
          <HighlightOffIcon
            sx={{ fontSize: 100, textAlign: "center", color: "red",mt:2}}
          />
          <Typography variant="h3">Từ chối truy cập</Typography>
          <Typography variant="h6" sx={{mt:4}}>
            Xin lỗi, bạn không được phép truy cập vào trang web này.
          </Typography>
          <a
            href="/KitchenDelights"
            style={{ textDecoration: "none", color: "#ff5e00" }}
          >
            <Grid container alignItems="center" justifyContent="center" sx={{mt:3}}> 
              <Grid item>
                <ArrowBackIosIcon />
              </Grid>
              <Grid item>
                <Typography>Quay về</Typography>
              </Grid>
            </Grid>
          </a>
        </Box>
      </Box>
    </div>
  );
}
