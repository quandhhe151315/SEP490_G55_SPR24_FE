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
import { getRecipes, updateStatusRecipe } from "../../../services/ApiServices";
import DashboardMenu from "../../../components/Dashboard/Menu/DashboardMenu";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ApporoveDialog from "./ApporoveAndEditDialog";
import { toast } from "react-toastify";
import InputBase from '@mui/material/InputBase';
import { TextField } from "@mui/material";
import { searchRecipe } from "../../../services/RecipeServices";
import { debounce } from "lodash";
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';

function ListRecipeDashBoard() {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [openApprove, setOpenApprove] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [Recipes, setRecipes] = useState([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState('');
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 6;

    const filteredRecipes = Recipes.filter(recipe => recipe.recipeStatus !== 0);
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const goToCreateNewRecipe = () => {
        navigate('/CreateRecipe')
    }

    //open and close dialog delete
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    //open and close dialog approve
    const handleOpenApprove = () => {
        setOpenApprove(true);
    };
    const handleCloseApprove = () => {
        setOpenApprove(false);

    };

    //open and close dialog edit
    const handleOpenEdit = () => {
        setOpenEdit(true);
    };
    const handleCloseEdit = () => {
        setOpenEdit(false);
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
            const response = await updateStatusRecipe(selectedRecipeId, 0);
            if (response.status === 200) {
                setOpen(false);
                getListRecipe();
                toast.success('Xóa recipe thành công');
            } else {
                console.log('loi respondata', response.data);
            }
        } catch (error) {
            console.log('loi khi xoa category', error)
        }
    }

    const getListRecipe = async (searchText) => {
        try {
            const response = await searchRecipe(searchText);
            if (response.status === 200) {
                setRecipes(response.data);
            } else {
                console.log('loi respondata', response.data);
            }
        } catch (error) {
            console.log('loi khi tai danh sach recipe', error)
        }
    }

    // const DisplayStyledInputBase = styled(InputBase)(({ theme }) => ({
    //     color: "black",
    //     "& .MuiInputBase-input": {
    //       padding: theme.spacing(0, 1, 1, 0),
    //       paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    //       transition: theme.transitions.create("width"),
    //       width: "calc(100% - 48px)",
    //       [theme.breakpoints.up("md")]: {
    //         width: "61.5ch",
    //         marginTop: "2ch",
    //       },
    //     },
    //   }));


    useEffect(() => {
        getListRecipe(searchText);
    }, [openApprove]);



    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <DashboardMenu dashboardTitle={"Quản lý công thức"} />
                <Grid sx={{ marginLeft: '10px', marginTop: '80px' }}>
                    <Paper elevation={2} sx={{ borderRadius: '15px', border: '1px solid #bfb8b8', width: '1210px', height: '700px', backgroundColor: '#FFFFFF' }}>
                        <Typography sx={{ fontSize: '24px', fontWeight: '', marginLeft: '5%', marginTop: '15px', color: '#4A5568' }}>
                            Danh sách Recipe
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                sx={{
                                    marginLeft: '10%',
                                    marginTop: '5px',
                                    width: '50%',

                                    borderRadius: '15px',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderRadius: '15px',
                                        },
                                    },
                                }}
                                size="small"
                                label="Tìm kiếm công thức"
                                value={searchText}
                                onChange={(event) => {
                                    setSearchText(event.target.value)
                                    if (event.target.value === '') {
                                        getListRecipe('');
                                    }
                                }}
                            />

                            <SearchIcon
                                sx={{
                                    bgcolor: "#553C9A",
                                    borderRadius: "15px",
                                    marginLeft: "16px",
                                    width: "48px",
                                    height: "48px",
                                    color: "white",
                                    marginTop: "5px",
                                }}
                                onClick={() => getListRecipe(searchText)}
                            />

                            <CategoryButton text='Tạo Recipe mới' height='auto' width='auto' marginLeft='15%' onClick={goToCreateNewRecipe}></CategoryButton>
                        </Box>
                        <TableContainer sx={{ marginTop: '20px', maxHeight: '600px', overflow: 'auto', whiteSpace: 'nowrap' }}>
                            <Table sx={{ minWidth: 1000 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="left" style={{ width: '5%' }}>ID</StyledTableCell>
                                        <StyledTableCell align="left" style={{ width: '25%', paddingLeft: '25px' }}>Tên công thức</StyledTableCell>
                                        <StyledTableCell align="left" style={{ width: '20%', paddingLeft: '15px' }}>Tên người đăng</StyledTableCell>
                                        <StyledTableCell align="left" style={{ width: '10%', paddingLeft: '0px' }}>Đánh giá</StyledTableCell>
                                        <StyledTableCell align="left" style={{ width: '10%', paddingLeft: '20px' }}>Trạng thái</StyledTableCell>
                                        <StyledTableCell align="left" style={{ width: '10%', paddingLeft: '28px' }}>Giá</StyledTableCell>
                                        <StyledTableCell align="left" style={{ width: '10%', paddingLeft: '15px' }}>Ngày đăng</StyledTableCell>
                                        <StyledTableCell align="left" style={{ width: '5%', paddingLeft: '45px' }}>Hoạt động</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentRecipes.map((recipe) => (

                                        <StyledTableRow key={recipe.recipeid}>

                                            <StyledTableCell align="left">{recipe.recipeId}</StyledTableCell>
                                            <StyledTableCell align="left">{recipe.recipeTitle}</StyledTableCell>
                                            <StyledTableCell align="left">{recipe.userName}</StyledTableCell>
                                            <StyledTableCell align="left">{recipe.recipeRating}</StyledTableCell>
                                            <StyledTableCell align="left">{recipe.recipeStatus !== null && recipe.recipeStatus === 1 ? 'Đã duyệt' : 'Chưa duyệt'}</StyledTableCell>
                                            <StyledTableCell align="left">{recipe.recipePrice !== null && recipe.recipePrice !== undefined ? recipe.recipePrice : 'Miễn phí'}</StyledTableCell>
                                            <StyledTableCell align="left">{new Date(recipe.createDate).toLocaleDateString()}</StyledTableCell>
                                            <StyledTableCell>
                                                {recipe.recipeStatus === 1 ? (
                                                    <Button sx={{ paddingRight: '27px' }} onClick={() => {
                                                        setSelectedRecipeId(recipe.recipeId);
                                                        handleOpenApprove(true);
                                                    }}>Sửa</Button>
                                                ) : (
                                                    <Button onClick={() => {
                                                        setSelectedRecipeId(recipe.recipeId);
                                                        handleOpenApprove(true);
                                                    }}>
                                                        Duyệt
                                                    </Button>
                                                )}
                                                <Button onClick={() => {
                                                    setSelectedRecipeId(recipe.recipeId);
                                                    handleOpen(true);
                                                }}>Xóa</Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Box display="flex" justifyContent="center">
                                <Pagination
                                    count={Math.ceil(Recipes.length / recipesPerPage)}
                                    page={currentPage}
                                    onChange={(event, value) => setCurrentPage(value)}
                                    color="secondary"
                                    sx={{
                                        marginTop: 4,
                                        "& .Mui-selected": {
                                            backgroundColor: "#FF642F",
                                        },
                                        marginBottom: 4,
                                    }} />
                            </Box>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Box>
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
                        Bạn có chắc chắn muốn xóa Công thức này?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmDelete}>Có</Button>
                    <Button onClick={handleClose} autoFocus>
                        Không
                    </Button>
                </DialogActions>
            </Dialog>

            {/* //dialog Approve */}
            <ApporoveDialog
                open={openApprove}
                handleClose={handleCloseApprove}
                recipeId={selectedRecipeId}
            />

        </div>
    );
}

export default ListRecipeDashBoard;