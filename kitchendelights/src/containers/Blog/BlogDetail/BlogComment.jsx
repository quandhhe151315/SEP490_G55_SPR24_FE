import {
    Button,
    Divider,
    Stack,
    TextareaAutosize,
    Typography,
  } from "@mui/material";
  import React from "react";
  import BlogCommentItem from "./BlogCommentItem";
  import { Link } from "react-router-dom";
  
  export default function BlogComment() {
    return (
      <Stack mt={4}>
        <Stack>
          <Typography fontSize={22} fontWeight={600}>
            Bình luận
          </Typography>
        </Stack>
        <Divider sx={{ width: "100%", mt: 1 }} />
        <Stack rowGap={2} mt={4}>
          {Array.from({ length: 4 })
            ?.map((item, index) => {
              return {
                x: "index",
              };
            })
            ?.map((item, index) => (
              <BlogCommentItem key={index} />
            ))}
        </Stack>
        <Divider sx={{my:6}}/>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
          }}
        >
          
          <Typography variant="h6" sx={{ textTransform: 'uppercase', color: "#ff5e00" }}>Trả lời</Typography>
          <Divider sx={{my:1}}/>
          <Typography>Bình luận</Typography>
          <TextareaAutosize 
            minRows={8}
            maxRows={12}
            style={{
              borderRadius: "12px",
              borderColor: "#ccc",
              outline: "none",
              marginTop: "12px",
              padding: "8px",
              width: "100%",
            }}
            placeholder="Bình luận về bài viết"
          />
          <Typography mt={2}>
            <Link>Đăng nhập</Link> để bình luận
          </Typography>
          {/* <Button variant="contained" sx={{ width: "120px", mt: 2 }}>
            Bình luận
          </Button> */}
        </Stack>
      </Stack>
    );
  }
  
