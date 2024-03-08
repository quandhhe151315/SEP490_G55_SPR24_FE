import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

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
      commentContent: "Default Comment 2",
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
            <TableCell sx={{ width: "5%" }}>STT</TableCell>
            <TableCell sx={{ width: "12%" }}>Tên người dùng</TableCell>
            <TableCell sx={{ width: "30%" }}>Nội dụng bình luận</TableCell>
            <TableCell sx={{ width: "20%" }}>Tên bài viết</TableCell>
            <TableCell sx={{ width: "10%" }}>Trạng thái</TableCell>
            <TableCell sx={{ width: "10%" }}>Ngày tạo</TableCell>
            <TableCell sx={{ width: "10%" }} align="right">
              Thao tác
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {defaultData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.userId}</TableCell>
              <TableCell>{row.commentContent}</TableCell>
              <TableCell>{row.blogId}</TableCell>
              <TableCell align="center" >
                <ToggleSwitch />
              </TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell align="right">
                <BorderColorIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
