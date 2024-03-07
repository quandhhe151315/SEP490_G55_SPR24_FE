import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { TableHead } from '@mui/material';

export default function ListTable() {
    const defaultData = [
        { id: 1, userId: 'User1', commentContent: 'Default Comment 1', blogId: 'Blog1', status: 'Active', createdAt: '2022-03-07',action:'hide'},
        { id: 2, userId: 'User2', commentContent: 'Default Comment 2', blogId: 'Blog2', status: 'Inactive', createdAt: '2022-03-08' ,action:'hide'}];
  return (
    <TableContainer>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead>
        <TableRow sx={{backgroundColor: '#FFCF96' }}>
        <TableCell sx={{ width: '5%' }}>STT</TableCell>
        <TableCell sx={{ width: '10%' }}>Tên người dùng</TableCell>
            <TableCell sx={{ width: '30%' }}>Nội dụng bình luận</TableCell>
            <TableCell sx={{ width: '20%' }}>Tên bài viết</TableCell>
            <TableCell sx={{ width: '5%' }}>Trạng thái</TableCell>
            <TableCell sx={{ width: '10%' }}>Ngày tạo</TableCell>
            <TableCell  sx={{ width: '10%' }} align='right'>Thao tác</TableCell>
        </TableRow>
      </TableHead>
        <TableBody>
        {defaultData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.userId}</TableCell>
              <TableCell>{row.commentContent}</TableCell>
              <TableCell>{row.blogId}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell align="right">{row.action}</TableCell>
            </TableRow>
          ))}
       
        </TableBody>
      </Table>
    </TableContainer>
  );
}