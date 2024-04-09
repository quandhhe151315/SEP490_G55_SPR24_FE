import React from "react";
import { Grid, Typography, Avatar, Button, Divider } from "@mui/material";
import { useGetBlogList } from "../../../hook/useGetBlogList";
import Cookies from "js-cookie";
import BlogHomeItem from "../../Home/BlogLatest/BlogHomeItem";

export default function BlogItemUser() {
  const userId = Cookies.get("userId");
  const { blogList } = useGetBlogList({ userId });
  return (
    <Grid container rowSpacing={4} mt={2} height={"100%"} width={"100%"} xs={8}>
      {blogList?.slice(0, 6)?.map((item, index) => (
        <Grid item xs={12} key={`${item?.blogId}+${index}`}>
          <BlogHomeItem
            title={item?.blogTitle}
            id={item?.blogId}
            content={item?.blogContent}
            createDate={item?.createDate}
            userName={item?.userName}
            blogImage={item?.blogImage}
          />
        </Grid>
      ))}
    </Grid>
  );
}
