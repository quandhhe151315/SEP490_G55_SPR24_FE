import { Button, Grid, Pagination, PaginationItem, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import CategoriesList from "./CategoriesList";
import BlogFilter from "./BlogFilter";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetBlogList } from "../../../hook/useGetBlogList";
import PrimarySearchAppBar from "../../../components/Homepage/Appbar";
import { Link } from "react-router-dom";
import MessageData from "./MessageData";

export default function BlogList() {
  const [categorySelect, setCategorySelect] = useState();
  const { blogList } = useGetBlogList({
    id: "",
    category: categorySelect,
    sort: "",
  });
  const blogsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogList?.slice(indexOfFirstBlog, indexOfLastBlog);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <div style={{ backgroundColor: "#F9F9F9" }}>
      <PrimarySearchAppBar />
      <Stack width={"100%"} bgcolor={"#F9F9F9"} mt={4} minHeight={"100vh"}>
        <Stack sx={{ marginX: "auto", width: "80%", mt: 4 }}>
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
          <CategoriesList
            categorySelect={categorySelect}
            setCategorySelect={setCategorySelect}
          />
          {blogList?.length > 0 ? (
            <>
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
                count={Math.ceil(blogList?.length / blogsPerPage)}
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
            </>
          ) : (
            <MessageData/>
          )}
        </Stack>
      </Stack>
    </div>
  );
}
