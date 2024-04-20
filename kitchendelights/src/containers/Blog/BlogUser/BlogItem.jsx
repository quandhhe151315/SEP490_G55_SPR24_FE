import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Avatar,
  Button,
  Divider,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { useGetBlogList } from "../../../hook/useGetBlogList";
import Cookies from "js-cookie";
import BlogHomeItem from "../../Home/BlogLatest/BlogHomeItem";
import EditIcon from "@mui/icons-material/Edit";
import { Stack } from "@mui/system";
import EditFormModal from "../../DashBoard/BlogManagent/EditFormModal";
export default function BlogItemUser() {
  const userId = Cookies.get("userId");
  const { blogList } = useGetBlogList({ userId });
  const [blogLists, setBlogList] = useState();
  useEffect(() => {
    setBlogList(blogList);
  }, [blogList]);
  const blogsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogLists?.slice(indexOfFirstBlog, indexOfLastBlog);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const [open, setOpen] = React.useState(false);
  const [editId, setEditId] = useState("");
  return (
    <Grid
      container
      rowSpacing={4}
      mt={2}
      height={"100%"}
      width={"100%"}
      xs={8}
      sx={{ ml: 3 }}
    >
      {currentBlogs?.length === 0 ? (
        <Grid item xs={12}>
          <Typography
            variant="body1"
            sx={{ mt: 6, ml: 30, textAlign: "center", color: "#ff5e00" }}
          >
            Bạn chưa tạo blog nào.
          </Typography>
        </Grid>
      ) : (
        currentBlogs
          ?.slice(0, 6)
          ?.filter((item) => item.blogStatus === 1)
          .map((item, index) => (
            <Grid
              item
              xs={12}
              key={`${item?.blogId}+${index}`}
              sx={{ position: "relative" }}
            >
              <Stack
                sx={{ position: "absolute", mt: 1, right: 0, mr: 2,cursor:'pointer' }}
                onClick={() => {
                  setOpen(true);
                  setEditId(item?.blogId);
                }}
              >
                <EditIcon />
              </Stack>
              <BlogHomeItem
                title={item?.blogTitle}
                id={item?.blogId}
                content={item?.blogContent}
                createDate={item?.createDate}
                userName={item?.userName}
                blogImage={item?.blogImage}
                commentCount={item?.commentCount}
              />
            </Grid>
          ))
      )}
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
      <EditFormModal
        openModal={open}
        setOpenModal={setOpen}
        id={editId}
        setBlogList={setBlogList}
        blogLists={blogLists}
      />
    </Grid>
  );
}
