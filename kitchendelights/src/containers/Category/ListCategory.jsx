import { List, Paper, Typography } from "@mui/material";
import React from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CategoryButton from "../../components/Button/CategoryButton";
import Button from "@mui/material/Button";
import { Navigate, useNavigate } from "react-router-dom";

function ListCategoryDashboard() {

    const navigate = useNavigate();

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

      const goToUpdateCategory = () => {
        navigate('/UpdateCategory');
      }
      
      const goToCreateCategory = () => {
        navigate('/CreateCategory')
      }

      function createData(id, name, parent) {
        return { id, name, parent};
      }
      
      const rows = [
        createData(1,'Món nướng','#'),
        createData(2,'Bữa sáng', '#'),
        createData(3,'Bữa ăn nhẹ', '#'),
        createData(4,'các món ăn vặt', 'bữa ăn nhẹ'),
        createData(5,'các bữa sáng cho trẻ', 'bữa sáng'),
      ];

    return (
        <div>
            <Paper elevation={2} sx={{ marginLeft: '360px', marginTop: '30px', borderRadius: '15px', border: '1px solid #bfb8b8', width: '1000px', height: '600px', backgroundColor: '#FFFFFF' }}>
                <Typography sx={{ fontSize: '24px', fontWeight: '', marginLeft: '10%', marginTop: '30px', color: '#4A5568' }}>
                    Danh sách category
                </Typography>
                    <CategoryButton text='Tạo category mới' marginLeft='70%' marginTop='10px' onclick={goToCreateCategory}></CategoryButton>
                <TableContainer sx={{marginTop:'20px'}}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">ID</StyledTableCell>
                                <StyledTableCell align="left">Category Name</StyledTableCell>
                                <StyledTableCell align="left">Parent Name</StyledTableCell>
                                <StyledTableCell align="left">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.id}>
                                    
                                    <StyledTableCell align="left">{row.id}</StyledTableCell>
                                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                                    <StyledTableCell align="left">{row.parent}</StyledTableCell>
                                    <StyledTableCell>
                                    <Button href="#text-buttons" onClick={goToUpdateCategory}>Update</Button>
                                    <Button href="#text-buttons">Delete</Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}


export default ListCategoryDashboard





