import { Grid, Stack, Typography } from "@mui/material";
import React from "react";

export default function BlogSuggestItem() {
  return (
    <Stack>
      <Grid container columnSpacing={2}>
        <Grid item xs={4}>
          <img
            src="https://cdn.tgdd.vn/Files/2022/03/12/1420043/30-status-caption-nau-an-mua-dich-cuc-doc-dao-va-thu-vi-202203122354092008.jpg"
            width={"100%"}
            height={"80px"}
            style={{
              borderRadius: "8px",
            }}
          />
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            fontSize={14}
            fontWeight={600}
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            Cá nục thường được nhiều bà nội trợ ưa chuộng vì bổ dưỡng và có thể
          </Typography>
          <Typography sx={{ mt: 1 }} fontSize={14}>
            28/12/2023
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  );
}
