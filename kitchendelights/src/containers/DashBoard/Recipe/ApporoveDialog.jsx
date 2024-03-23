import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { getRecipeById, getAllCategory } from "../../../services/ApiServices";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { updateCategoryRecipe, updateStatusRecipe } from "../../../services/ApiServices";
import { set } from "date-fns";

function ApporoveDialog({ open, handleClose, recipeId }) {
    const [recipe, setRecipe] = useState({});
    const [categories, setCategories] = useState([]);
    const [checkCount, setCheckedCount] = useState(0);

    const handleGetAllCategory = async () => {
        try {
            const response = await getAllCategory();
            if (response.status === 200) {
                setCategories(response.data);
                console.log('get category thanh cong');
            } else {
                console.log('get category that bai');
            }
        } catch (error) {
            console.error('loi khi get category', error);
        }
    };

    const handleGetRecipeById = async () => {
        try {
            const response = await getRecipeById(recipeId);
            if (response.status === 200) {
                setRecipe(response.data);
                console.log('get recipe by id thanh cong');
            } else {
                console.log('ko get thanh cong');
            }
        } catch (error) {
            console.error('loi khi get recipe by id', error);
        }
    };

    const categoryByParentId = categories.filter(category => category.parentId !== null).reduce((groups, category) => {
        const group = (groups[category.parentId] || []);
        group.push(category);
        groups[category.parentId] = group;
        return groups;
    }, {});

    const handleUpdateCategoryRecipe = async (recipeId, categoryId, type) => {
        try {
            const reponse = await updateCategoryRecipe(recipeId, categoryId, type);
            if (reponse.status === 200) {
                console.log('add category thanh cong');
            } else {
                console.log('add category that bai');
            }
        } catch (error) {
            console.error('loi khi add category cho recipe', error);
        }
    };

    const handleApproveRecipe = async () => {
        try {
            const response = await updateStatusRecipe(recipeId, 1);
            if (response.status === 200) {
                console.log('approve thanh cong');
            } else {
                console.log('approve that bai');
            }
        } catch (error) {
            console.error('loi khi approve recipe', error);
        }
    };

    // const handleCheckboxChange = (event, recipeId, categoryId) => {
    //     const UpdateCategories = categories.map(category => {
    //         if (category.categoryId === categoryId) {
    //             category.checked = event.target.checked;
    //         }
    //         return category;
    //     });
    //     setCategories(UpdateCategories);
    // };

    useEffect(() => {
        if (open) {
            handleGetAllCategory();
            handleGetRecipeById();
            console.log('recipeId', recipeId);
            console.log(recipe);
        }
    }, [open, recipeId]);
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}

                PaperComponent={({ children }) => (
                    <Paper sx={{ width: '1200px', height: '700px', borderRadius: '20px', padding: '8px' }}>
                        <Box sx={{ overflow: 'auto', height: '100%', flexGrow: 1 }}>
                            {children}
                        </Box>
                    </Paper>)}
            >
                <DialogTitle>Approve Recipe</DialogTitle>
                <DialogContent>
                    <Box>
                        <Card>

                            <CardContent sx={{}}>
                                <Typography gutterBottom variant="h4" component="div">
                                    {recipe.recipeTitle}
                                </Typography>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={recipe.featuredImage}
                                        alt={recipe.recipeTitle}
                                    />

                                    <Box sx={{ height: 340, width: 560, marginLeft: '20%' }}>
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src="https://www.youtube.com/embed/c9GfHgMk1ac"
                                            title="YouTube video player"
                                            frameBorder={0}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </Box>
                                </CardActionArea>
                            </CardContent>
                            <CardContent>
                                <Typography variant="body2">
                                    {recipe.recipeDescription || `đây là mô tả cho công thức của ${recipe.recipeTitle}`}
                                </Typography>
                                <Grid sx={{ display: 'flex', marginTop: '15px' }} container spacing={2}>
                                    <Grid item xs={8}>
                                        <Grid container spacing={2} alignItems="flex-start">
                                            <Grid item xs={6} sm={4}>
                                                <Typography align="center" sx={{ color: 'gray' }}>Thời gian chuẩn bị</Typography>
                                                <Typography align="center">{recipe.preparationTime}</Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={4}>
                                                <Typography align="center" sx={{ color: 'gray' }}>Thời gian nấu</Typography>
                                                <Typography align="center">{recipe.cookTime}</Typography>
                                            </Grid>
                                            <Grid item xs={6} sm={4}>
                                                <Typography align="center" sx={{ color: 'gray' }}>Khẩu phần</Typography>
                                                <Typography align="center">{recipe.recipeServe}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={4}></Grid>
                                </Grid>
                                <Typography variant="h5" sx={{ marginTop: '15px', marginLeft: '20px' }}>
                                    Nguyên Liệu
                                </Typography>
                                {/* {recipe.ingredients.map((ingredient, index) => (
                                    <Typography key={index} sx={{marginLeft:'20px'}}>
                                        {ingredient}
                                    </Typography>
                                    ))} */}

                                <Typography variant="h5" sx={{ marginTop: '15px', marginLeft: '20px' }}>
                                    Cách làm :
                                </Typography>

                                {/* đang làm */}
                                <Typography>
                                    {recipe.recipeContent}
                                </Typography>
                            </CardContent>

                        </Card>
                        <Typography variant="h5" sx={{ marginTop: '25px', marginLeft: '20px' }}>
                            Chọn category cho công thức này
                        </Typography>
                        <Box sx={{ width: '90%', marginLeft: '5%', marginTop: '30px' }}>
                            <Grid container spacing={2}>
                                {Object.entries(categoryByParentId).map(([parentId, categories], index) => (
                                    <Grid sx={{ marginTop: '10px' }} item xs={3} key={index}>
                                        {categories.map((category, index) => (
                                            <FormControlLabel
                                                key={index}
                                                control={<Checkbox
                                                    onChange={(event) => {
                                                        if (event.target.checked) {
                                                            handleUpdateCategoryRecipe(recipeId, category.categoryId, 1);
                                                            
                                                            setCheckedCount(checkCount + 1);
                                                        } else {
                                                            handleUpdateCategoryRecipe(recipeId, category.categoryId, 2);
                                                            
                                                            setCheckedCount(checkCount - 1);
                                                        }
                                                    }}
                                                />}
                                                label={category.categoryName}
                                                sx={{ display: 'block', wordWrap: 'break-word' }}
                                            />

                                        ))}
                                    </Grid>
                                ))}
                            </Grid>

                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={checkCount === 0} onClick={handleApproveRecipe}>Approve</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ApporoveDialog;