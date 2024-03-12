import {
  Breadcrumbs,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import BlogContent from "./BlogContent";
import BlogSearch from "./BlogSearch";
import BlogComment from "./Comment/BlogComment";
import { useParams } from "react-router";
import { useGetBlogDetail } from "../../../hook/useGetBlogDetail";

export default function BlogDetail() {
  const { slug } = useParams();
  const { blogDetail } = useGetBlogDetail(slug);
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Trang chủ
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
    >
      Blog
    </Link>,
    <Typography key="3" color="text.primary">
      Blog chi tiết
    </Typography>,
  ];
  return (
    <Stack width={"100%"} height={"100%"} pt={4}>
      <Stack sx={{ width: "80%", px: 4, mx: "auto" }}>
        <Stack>
          <Typography
            fontSize={28}
            color={"#FF642F"}
            fontWeight={700}
            textAlign={"center"}
          >
            BLOG CÔNG THỨC NẤU ĂN
          </Typography>
          <Typography
            fontStyle={"italic"}
            fontWeight={500}
            textAlign={"center"}
          >
            Chia sẻ công thức nấu ăn
          </Typography>
        </Stack>
        <Divider width="100%" sx={{ mt: 4 }} />
        <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ mt: 2 }}>
          {breadcrumbs}
        </Breadcrumbs>
        <Grid container columnSpacing={4}>
          <Grid item xs={8}>
            <BlogContent
              userName={blogDetail?.userName}
              title={blogDetail?.userName}
              content={blogDetail?.blogContent}
              createDate={blogDetail?.createDate}
              image={blogDetail?.blogImage}
            />
            <BlogComment />
          </Grid>
          <Grid item xs={4}>
            <BlogSearch />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
}
