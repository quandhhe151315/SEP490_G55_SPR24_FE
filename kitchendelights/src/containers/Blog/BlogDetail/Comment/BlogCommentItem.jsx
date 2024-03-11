import { Avatar, Stack, Typography, Button, Box } from "@mui/material";
import React, { useState,useRef,useEffect } from "react";
import BlogCommentItemReup from "./BlogCommentItemReup";


export default function BlogCommentItem() {
  const [showReplySection, setShowReplySection] = useState(false);

  const handleReplyClick = () => {
    setShowReplySection(!showReplySection);
    
  };

  return (
    <Stack direction="row" alignItems="flex-start" spacing={2}>
      <Avatar>B</Avatar>
      <Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography fontWeight={600} sx={{ color: "#ff5e00" }}>
              Đỗ Hồng Quân
            </Typography>
            <Typography fontWeight={300}>
              Tháng Ba 2,2024 vào 10:48 sáng #
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#fff",
                color: "#ff5e00", // Orange color
                "&:hover": {
                  backgroundColor: "#ff5e00",
                  color: "#fff", // Hover color (same as default)
                },
              }}
              href="#contained-buttons" onClick={handleReplyClick}
            >
              Trả lời
            </Button>
          </Box>
        </Stack>

        <Typography sx={{mt:2,ml:-7}}>
          Chi ơi. e lên mạng học cách làm bánh và e tìm được trang của ch. nhưng
          e không biết làm sao để theo dõi và cập nhật được cacs bài đăng của
          chị. chị bày em với. e cảm ơn ch
        </Typography>
        {showReplySection// To make TextareaAutosize invisible
            &&<BlogCommentItemReup/>}
      </Stack>
  
     
    </Stack>
  );
}
