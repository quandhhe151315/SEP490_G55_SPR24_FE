import { Button, Grid, Pagination, PaginationItem, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import CategoriesList from "./CategoriesList";
import BlogFilter from "./BlogFilter";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetBlogList } from "../../../hook/useGetBlogList";
import PrimarySearchAppBar from "../../../components/Homepage/Appbar";
import { Link } from "react-router-dom";

export default function BlogList() {
  const [blogData, setBlogData] = useState([]); // Assume you have a state for your blog data
  const { blogList } = useGetBlogList();
  const blogsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogData?.slice(indexOfFirstBlog, indexOfLastBlog);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    setBlogData(blogList);
  }, [blogList]);
  console.log(blogList);
  return (
    <Stack width={"100%"} bgcolor={"#F9F9F9"} pt={4} minHeight={"100vh"}>
      <PrimarySearchAppBar />
      <Stack sx={{ marginX: "auto", maxWidth: "80%", mt: 4 }}>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "end",
            flexDirection: "row",
            mb: 1,
          }}
        >
          <Stack>
            <a href="/blog/create">
              <Button variant="outlined">Đăng Blog</Button>
            </a>
          </Stack>
        </Stack>
        <BlogFilter />
        <CategoriesList />
        <Grid
          container
          columnSpacing={3}
          rowSpacing={3}
          mt={2}
          height={"100%"}
          mx={0}
          width={"100%"}
        >
          {currentBlogs?.map((item, index) => {
            return (
              <Grid item xs={4} key={`${item?.blogId}+${index}`}>
                <BlogItem
                  title={item?.blogTitle}
                  id={item?.blogId}
                  content={item?.blogContent}
                  createDate={item?.createDate}
                  userName={item?.userName}
                  blogImage={item?.blogImage}
                />
              </Grid>
            );
          })}
        </Grid>
        <Pagination
          count={Math.ceil(blogData?.length / blogsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
          sx={{
            marginTop: 4,
            "& .Mui-selected": {
              backgroundColor: "#FF642F",
            },
            marginBottom: 4,
          }}
        />
      </Stack>
    </Stack>
  );
}
