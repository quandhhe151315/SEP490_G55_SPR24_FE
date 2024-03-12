import { Avatar, Stack, Typography, Button, Box } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import BlogCommentItemReup from "./BlogCommentItemReup";
import dayjs from "dayjs";

export default function BlogCommentItem({ item }) {
  const [showReplySection, setShowReplySection] = useState(false);

  const handleReplyClick = () => {
    setShowReplySection(!showReplySection);
  };

  return (
    <Stack direction="row" alignItems="flex-start" spacing={2}>
      <Avatar>B</Avatar>
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography fontWeight={600} sx={{ color: "#ff5e00" }}>
              Đỗ Hồng Quân
            </Typography>
            <Typography fontWeight={300}>
              {dayjs(item?.createDate)?.format("DD-MM-YYYY hh:mm")}
            </Typography>
          </Box>
          <Box>
            {/* <Button
              variant="contained"
              sx={{
                backgroundColor: "#fff",
                color: "#ff5e00", // Orange color
                "&:hover": {
                  backgroundColor: "#ff5e00",
                  color: "#fff", // Hover color (same as default)
                },
              }}
              href="#contained-buttons"
              onClick={handleReplyClick}
            >
              Trả lời
            </Button> */}
          </Box>
        </Stack>
        <Typography>{item?.commentContent}</Typography>
        {showReplySection && ( // To make TextareaAutosize invisible
          <BlogCommentItemReup />
        )}
      </Stack>
    </Stack>
  );
}
