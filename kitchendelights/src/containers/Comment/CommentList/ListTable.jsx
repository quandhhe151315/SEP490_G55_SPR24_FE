import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { TableHead, Typography, Checkbox, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useGetComment } from "../../../hook/useGetComment";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteBlogModal from "../../DashBoard/BlogManagent/DeleteBlogModal";
import DeleteCommentModal from "./DeleteModal";
export default function ListTable() {
  const [commentLists, setCommentList] = useState();
  const { commentList } = useGetComment();
  useEffect(() => {
    setCommentList(commentList);
  }, [commentList]);
  const commentPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastComment = currentPage * commentPerPage;
  const indexOfFirstComment = indexOfLastComment - commentPerPage;
  const currentComments = commentLists?.slice(
    indexOfFirstComment,
    indexOfLastComment
  );
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
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
                Nội dung bình luận
              </TableCell>
              <TableCell sx={{ width: "10%", color: "#fff" }}>
                Ngày tạo
              </TableCell>
              <TableCell sx={{ width: "12%", color: "#fff" }}></TableCell>
              <TableCell sx={{ width: "10%", color: "#fff" }}>
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentComments?.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell sx={{ width: "1%" }}>
                  <Checkbox />
                </TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.userId}</TableCell>
                <TableCell>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Stack style={{ flex: 1 }}>{item.commentContent}</Stack>
                  </Box>
                </TableCell>
                <TableCell>{item.blogId}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>
                  <Stack
                    onClick={() => {
                      setOpenDelModal(true);
                      setDelId(item?.commentId);
                    }}
                  >
                    <DeleteIcon style={{ color: "red", cursor: "pointer" }} />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteCommentModal
        delId={delId}
        openDelModal={openDelModal}
        setOpenDelModal={setOpenDelModal}
        setCommentList={setCommentList}
        commentList={commentLists}
      />
    </Box>
  );
}
