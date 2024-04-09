import React from "react";
import { Grid, Stack, Box, Typography } from "@mui/material";
import Appbar from "../../../components/Homepage/Appbar";
import AvatarMenu from "../../../components/Account/AvatarMenu";
import BlogItemUser from "./BlogItem";
export default function BlogUser() {
  return (
    <div>
      <Appbar />
      <Grid container spacing={2} sx={{ marginBottom: "2%" }}>
        <Grid item xs={2} sx={{ marginLeft: "10%" }}>
          <AvatarMenu />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={7}>
          <Box sx={{ display: "flex" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack spacing={2} sx={{ marginTop: "2%" }}>
                  <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
                    Blog của tôi
                  </Typography>
                  <Typography sx={{ fontSize: "16px" }}>
                    Đây là nơi hiển thị các bài đăng của bạn
                  </Typography>
                </Stack>
                <Stack sx={{ mt: 1 }}>
                  <BlogItemUser />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
