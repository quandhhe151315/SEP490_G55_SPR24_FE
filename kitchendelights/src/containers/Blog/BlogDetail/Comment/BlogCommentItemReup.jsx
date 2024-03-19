import {
  Button,
  Divider,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "resize-observer-polyfill";
export default function BlogCommentItemReup() {
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
      }}
    >
      <Typography
        variant="h6"
        sx={{ textTransform: "uppercase", color: "#ff5e00" }}
      >
        PHẢN HỒI ĐẾN ĐÕ HỒNG QUÂN
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Typography>Bình luận</Typography>
      <TextareaAutosize
        minRows={8}
        maxRows={12}
        sx={{
          borderRadius: "12px",
          borderColor: "#ccc",
          outline: "none",
          marginTop: "12px",
          padding: "8px",
          width: "100m%",
        }}
        placeholder="Bình luận về bài viết"
        autoFocus
      />
    </Stack>
  );
}
