import { Box, Dialog, Grid, List, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CategoryButton from "../../../components/Button/CategoryButton";
import Button from "@mui/material/Button";
import { Navigate, useNavigate } from "react-router-dom";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UpdateCategory from "./UpdateCategory";
import DashboardMenu from "../../../components/Dashboard/Menu/DashboardMenu"
import { getAllCategory, deleteCategory } from "../../../services/ApiServices";
import { toast } from "react-toastify";



function ListCategoryDashboard() {

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#EDF2F7',
      color: '#4A5568',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const goToUpdateCategory = (categoryId) => {
    navigate(`/UpdateCategory/${categoryId}`);
  };

  const goToCreateCategory = () => {
    navigate('/CreateCategory')
  };

  const getListCategory = async () => {
    try {
      const response = await getAllCategory();
      if (response.status === 200) {
        setCategories(response.data);

      } else {
        console.error('không thể lấy dữ liệu về category');
      }
    } catch (error) {
      console.error('lỗi khi tải danh sách category', error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteCategory(selectedCategoryId);
      if (response.status == 200) {
        setCategories(categories.filter(category => category.categoryId !== selectedCategoryId));
        setOpen(false);
        toast.success('Xóa category thành công');
      } else {
        console.error('Unable to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Xóa category thất bại');
    }
  }

  useEffect(() => {
    getListCategory();
  }, [selectedCategoryId]);

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <DashboardMenu dashboardTitle={"Quản lý Category"} />
        <Grid sx={{ marginTop: '80px', marginLeft: '80px' }}>
          <Paper elevation={2} sx={{ borderRadius: '15px', border: '1px solid #bfb8b8', width: '1100px', height: '650px', backgroundColor: '#FFFFFF' }}>
            <Typography sx={{ fontSize: '24px', fontWeight: '', marginLeft: '10%', marginTop: '30px', color: '#4A5568' }}>
              Danh sách category
            </Typography>
            <CategoryButton text='Tạo category mới' height='auto' width='auto' marginLeft='70%' marginTop='10px' onClick={goToCreateCategory}></CategoryButton>
            <TableContainer sx={{ marginTop: '20px', maxHeight: '500px' }}>
              <Table sx={{ minWidth: 1000 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left" style={{ width: '15%' }}>ID</StyledTableCell>
                    <StyledTableCell align="left" style={{ width: '30%' }}>Tên Category</StyledTableCell>
                    <StyledTableCell align="left" style={{ width: '30%' }}>Tên category cha</StyledTableCell>
                    <StyledTableCell align="left" style={{ width: '25%', paddingLeft: '60px' }}>Hoạt động</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category) => {
                    const isParent = categories.some(otherCategory => otherCategory.parentId === category.categoryId);
                    return (
                      <StyledTableRow key={category.categoryId}>
                        <StyledTableCell align="left">{category.categoryId}</StyledTableCell>
                        <StyledTableCell align="left">{category.categoryName}</StyledTableCell>
                        <StyledTableCell align="left">{category.parentName !== null && category.parentName !== undefined ? category.parentName : 'None'}</StyledTableCell>
                        <StyledTableCell>
                          <Button onClick={() => {
                            goToUpdateCategory(category.categoryId);
                          }}>Cập nhật</Button>
                          <Button disabled={isParent} onClick={() => {
                            setSelectedCategoryId(category.categoryId);
                            handleOpen(true);
                          }}>Xóa</Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xác nhận xóa category"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa category này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDelete}>Có</Button>
          <Button onClick={handleClose} autoFocus>
            Không
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default ListCategoryDashboard





