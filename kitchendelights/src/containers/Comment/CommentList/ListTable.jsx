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
export default function ListTable() {
  
  const defaultData = [
    {
      id: 1,
      userId: "User1",
      commentContent: "Default Comment 1",
      blogId: "Blog1",
      status: "Active",
      createdAt: "2022-03-07",
      action: "hide",
    },
    {
      id: 2,
      userId: "User2",
      commentContent: "A very long comment that might overflow to the next line A ",
      blogId: "Blog2",
      status: "Inactive",
      createdAt: "2022-03-08",
      action: "hide",
    },
  ];
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
          {defaultData.map((row) => (
            <TableRow key={row.id}>
              <TableCell sx={{ width: "1%" }}>
                <Checkbox />
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.userId}</TableCell>
              <TableCell>
              <Box display="flex" alignItems="center" justifyContent="flex-end">
              <Stack style={{ flex: 1 }}>
                    {row.commentContent}
                  </Stack>
 
                  <EditIcon/>
                </Box>
              </TableCell>
              <TableCell>{row.blogId}</TableCell>
              <TableCell>{row.createdAt}</TableCell>
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
