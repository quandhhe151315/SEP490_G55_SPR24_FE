import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import ClearIcon from "@mui/icons-material/Clear";
import TableRow from "@mui/material/TableRow";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {
  TableHead,
  Typography,
  Checkbox,
  Stack,
  Pagination,
  PaginationItem,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useGetBlogList } from "../../../../hook/useGetBlogList";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import EditFormModal from "../EditFormModal";
import DeleteBlogModal from "../DeleteBlogModal";
export default function BlogListItem() {
  const [blogLists, setBlogList] = useState();
  const { blogList } = useGetBlogList();
  useEffect(() => {
    setBlogList(blogList);
  }, [blogList]);
  const blogPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastBlog = currentPage * blogPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogPerPage;
  const currentBlogs = blogLists?.slice(indexOfFirstBlog, indexOfLastBlog);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const [open, setOpen] = React.useState(false);
  const [editId, setEditId] = useState("");
  const [openDelModal, setOpenDelModal] = useState(false);
  const [delId, setDelId] = useState("");
  return (
    <Box>
      <TableContainer>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#553C9A" }}>
              <TableCell sx={{ width: "5%", color: "#fff" }}>STT</TableCell>
              <TableCell sx={{ width: "12%", color: "#fff" }}>
                Tên người dùng
              </TableCell>
              <TableCell sx={{ width: "20%", color: "#fff" }}>
                Tên bài viết
              </TableCell>
              <TableCell sx={{ width: "15%", color: "#fff" }}>
                Nội dung bài viết
              </TableCell>
              <TableCell sx={{ width: "10%", color: "#fff" }}>Ảnh</TableCell>
              <TableCell sx={{ width: "10%", color: "#fff" }}>
                Ngày tạo
              </TableCell>
              <TableCell sx={{ width: "12%", color: "#fff" }}>
                Trạng thái
              </TableCell>
              <TableCell sx={{ width: "10%", color: "#fff" }}>
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentBlogs?.map((item, index) => (
              <TableRow key={item?.blogId}>
                <TableCell>{indexOfFirstBlog + index + 1}</TableCell>
                <TableCell>{item?.userName}</TableCell>
                <TableCell>{item?.blogTitle}</TableCell>
                <TableCell>
                  <div
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      WebkitLineClamp: 3,
                    }}
                    dangerouslySetInnerHTML={{ __html: item?.blogContent }}
                  />
                </TableCell>
                <TableCell>
                  <img
                    src={item?.blogImage}
                    alt=""
                    style={{ height: "50px", width: "50px" }}
                  />
                </TableCell>
                <TableCell>
                  {new Date(item?.createDate).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>

                <TableCell>
                  {item?.blogStatus === 2 ? "Đã phê duyệt" : "Chưa phê duyệt"}
                </TableCell>
                <TableCell>
                  <div
                    style={{ display: "flex", gap: "8px", marginLeft: "6px" }}
                  >
                    <Stack
                      onClick={() => {
                        setOpen(true);
                        setEditId(item?.blogId);
                      }}
                    >
                      <EditIcon style={{ color: "blue", cursor: "pointer" }} />
                    </Stack>
                    {item?.blogStatus != 2 ? (
                      <DoneIcon style={{ color: "green" }} />
                    ) : (
                      <ClearIcon style={{ color: "red" }} />
                    )}
                    <Stack
                      onClick={() => {
                        setOpenDelModal(true);
                        setDelId(item?.blogId);
                      }}
                    >
                      <DeleteIcon style={{ color: "red", cursor: "pointer" }} />
                    </Stack>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(blogList?.length / blogPerPage)}
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
      <EditFormModal openModal={open} setOpenModal={setOpen} id={editId} />
      <DeleteBlogModal
        delId={delId}
        openDelModal={openDelModal}
        setOpenDelModal={setOpenDelModal}
        setBlogList={setBlogList}
        blogList={blogLists}
      />
    </Box>
  );
}
