import { Stack, TextField, Typography } from "@mui/material";
import React from "react";
import BlogSuggestItem from "./BlogSuggestItem";
import { useGetBlogList } from "../../../hook/useGetBlogList";

export default function BlogSearch({ categoryId }) {
  const { blogList } = useGetBlogList({ category: categoryId });
  return (
    <Stack>
      <Typography fontWeight={600} fontSize={20} mb={2}>
        Bài viết liên quan
      </Typography>
      {/* <TextField
        size="small"
        label="Tìm kiếm bài viết liên quan"
        sx={{
          "& .MuiInputBase-root": {
            height: 36,
            borderRadius: "8px",
            fontSize: 14,
          },
          "& .MuiInputBase-root > input, .MuiInputBase-multiline": {
            padding: "8px 12px",
          },
        }}
      /> */}
      <Stack rowGap={1} mt={2}>
        {blogList?.map((item, index) => {
          if (index < 6) {
            return (
              <BlogSuggestItem key={`suggest_blog_${index}`} blogItem={item} />
            );
          }
        })}
      </Stack>
    </Stack>
  );
}
