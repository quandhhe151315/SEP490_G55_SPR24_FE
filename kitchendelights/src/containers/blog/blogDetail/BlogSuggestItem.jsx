import { Grid, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

export default function BlogSuggestItem({ blogItem }) {
  return (
    <Stack>
      <Grid container columnSpacing={2}>
        <Grid item xs={4}>
          <img
            src={
              blogItem?.blogImage ||
              "https://cdn.tgdd.vn/Files/2022/03/12/1420043/30-status-caption-nau-an-mua-dich-cuc-doc-dao-va-thu-vi-202203122354092008.jpg"
            }
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
            justifyContent: "space-between",
            pb: 2,
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
            {blogItem?.blogTitle}
          </Typography>
          <Typography sx={{ mt: 1 }} fontSize={14}>
            {dayjs(blogItem?.createDate).format("DD/MM/YYYY")}
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  );
}
