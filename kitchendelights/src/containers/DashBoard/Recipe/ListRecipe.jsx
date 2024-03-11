import Paper from "@mui/material/Paper";
import React from "react";
import Typography from "@mui/material/Typography";
import CategoryButton from "../../../components/Button/CategoryButton";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteRecipe, getRecipes } from "../../../services/ApiServices";

function ListRecipeDashBoard() {

    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const [Recipes, setRecipes] = useState([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState('');

    const goToCreateNewRecipe = () => {
        navigate('/')
    }

    //open and close dialog delete
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    //style table
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#EDF2F7',
            color: '#4A5568',
            fontSize: 14,
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

    const handleConfirmDelete = async () => {
        try {
            const response = await deleteRecipe(selectedRecipeId);
            if (response.status === 200) {
                setOpen(false);
                getListRecipe();
            } else {
                console.log('loi respondata', response.data);
            }
        } catch (error) {
            console.log('loi khi xoa category', error)
        }
    }

    const getListRecipe = async () => {
        try {
            const response = await getRecipes();
            if (response.status === 200) {
                setRecipes(response.data);
            } else {
                console.log('loi respondata', response.data);
            }
        } catch (error) {
            console.log('loi khi tai danh sach recipe', error)
        }
    }

    useEffect(() => {
        getListRecipe();
    }, []);

    return (
        <div>

            <Paper elevation={2} sx={{ marginLeft: '320px', marginTop: '30px', borderRadius: '15px', border: '1px solid #bfb8b8', width: '1100px', height: '700px', backgroundColor: '#FFFFFF' }}>
                <Typography sx={{ fontSize: '24px', fontWeight: '', marginLeft: '10%', marginTop: '30px', color: '#4A5568' }}>
                    Danh sách Recipe
                </Typography>
                <CategoryButton text='Tạo Recipe mới' height='auto' width='auto' marginLeft='70%' marginTop='10px' onClick={goToCreateNewRecipe}></CategoryButton>
                <TableContainer sx={{ marginTop: '20px', maxHeight: '400px' }}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">ID</StyledTableCell>
                                <StyledTableCell align="left">Recipe Title</StyledTableCell>
                                <StyledTableCell align="left">Creator</StyledTableCell>
                                <StyledTableCell align="left">Rating</StyledTableCell>
                                <StyledTableCell align="left">Status</StyledTableCell>
                                <StyledTableCell align="left">Price</StyledTableCell>
                                <StyledTableCell align="left">Created Date</StyledTableCell>
                                <StyledTableCell align="center" >Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Recipes.map((recipe) => (
                                <StyledTableRow key={recipe.recipeid}>

                                    <StyledTableCell align="left">{recipe.recipeId}</StyledTableCell>
                                    <StyledTableCell align="left">{recipe.recipeTitle}</StyledTableCell>
                                    <StyledTableCell align="left">{recipe.userName}</StyledTableCell>
                                    <StyledTableCell align="left">{recipe.recipeRating}</StyledTableCell>
                                    <StyledTableCell align="left">{recipe.recipeStatus !== null && recipe.recipeStatus !== undefined ? recipe.recipeStatus.toString() : 'No Status'}</StyledTableCell>
                                    <StyledTableCell align="left">{recipe.recipePrice !== null && recipe.recipePrice !== undefined ? recipe.recipePrice : 'Free'}</StyledTableCell>
                                    <StyledTableCell align="left">{recipe.createDate}</StyledTableCell>
                                    <StyledTableCell>
                                        <Button href="#text-buttons" >Edit</Button>
                                        <Button href="#text-buttons" >Approve</Button>
                                        <Button href="#text-buttons" onClick={() => {
                                            setSelectedRecipeId(recipe.recipeId); 
                                            handleOpen(true);
                                        }}>Delete</Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* //dialog Delete */}
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

export default ListRecipeDashBoard;