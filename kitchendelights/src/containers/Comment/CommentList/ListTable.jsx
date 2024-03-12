import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { TableHead, Typography, Checkbox,Stack } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useGetComment } from "../../../hook/useGetComment";
import { useState, useEffect } from "react";
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
  return (
    <TableContainer>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#FFCF96" }}>
            <TableCell sx={{ width: "1%" }}>
              <Checkbox />
            </TableCell>
            <TableCell sx={{ width: "5%" }}>ID</TableCell>
            <TableCell sx={{ width: "12%" }}>Tên người dùng</TableCell>
            <TableCell sx={{ width: "20%" }}>Nội dụng bình luận</TableCell>
            <TableCell sx={{ width: "15%" }}>Tên bài viết</TableCell>
            <TableCell sx={{ width: "10%" }}>Ngày tạo</TableCell>
            <TableCell sx={{ width: "10%" }}>Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentComments?.map((item,index) => (
            <TableRow key={item.id}>
              <TableCell sx={{ width: "1%" }}>
                <Checkbox />
              </TableCell>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.userId}</TableCell>
              <TableCell>
              <Box display="flex" alignItems="center" justifyContent="flex-end">
              <Stack style={{ flex: 1 }}>
                    {item.commentContent}
                  </Stack>
 
                  <EditIcon/>
                </Box>
              </TableCell>
              <TableCell>{item.blogId}</TableCell>
              <TableCell>{item.createdAt}</TableCell>
              <TableCell>
                <Typography
                  display={"inline-block"}
                  sx={{ bgcolor: "#E4E4E4", px: 0.4, borderRadius: "2px" }}
                >
                  Chưa phê duyệt
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
