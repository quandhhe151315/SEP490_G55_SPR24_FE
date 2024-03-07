import { Grid, Pagination, PaginationItem, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import CategoriesList from "./CategoriesList";
import BlogFilter from "./BlogFilter";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetBlogList } from "../../../hook/useGetBlogList";

export default function BlogList() {
  const [blogData, setBlogData] = useState([]); // Assume you have a state for your blog data
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const { blogList } = useGetBlogList();
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
      <Stack sx={{ marginX: "auto", maxWidth: "80%" }}>
        <BlogFilter />
        <CategoriesList />
        <Grid
          container
          columnGap={3}
          rowGap={3}
          mt={2}
          height={"100%"}
          mx={0}
          width={"100%"}
        >
          {currentBlogs?.map((item, index) => {
            return (
              <Grid item xs={3.8} key={index}>
                <BlogItem
                  title={item?.blogTitle}
                  id={item?.blogId}
                  content={item?.blogContent}
                  createDate={item?.createDate}
                  userName={item?.userName}
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