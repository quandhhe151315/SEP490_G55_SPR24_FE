import React, {useEffect, useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { getRecipeById, getAllCategory } from "../../../services/ApiServices.jsx";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { updateCategoryRecipe, updateStatusRecipe } from "../../../services/ApiServices.jsx";
import { toast } from "react-toastify";
import { RichTextReadOnly } from "mui-tiptap";
import useExtensions from "../../../components/Richtext/useExtension.ts";
import EmbedVideo from "../../../components/Video/EmbedVideo.jsx";
import CategoryCheckbox from "./CategoryCheckbox.jsx";


function ApporoveDialog({ open, handleClose, recipeId }) {
    const [recipe, setRecipe] = useState({});
    const [categories, setCategories] = useState([]);
    const selectedCategoriesRef = useRef([]);
    const unselectedCategoriesRef = useRef([]);
    const [ingredients, setIngredients] = useState([{}]);

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

    const handleGetRecipeById = async (recipeId) => {
        try {
            const response = await getRecipeById(recipeId);
            if (response.status === 200) {
                setRecipe(response.data);
                setIngredients(response.data.recipeIngredients);
                selectedCategoriesRef.current = (response.data.categories.map(category => category.categoryId));
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

    const handleApproveRecipe = async () => {
        if (selectedCategoriesRef.current.length === 0) {
            toast.error('Vui lòng chọn ít nhất 1 category');
            return;
        }

        //add category for recipe
        for (let categoryId of selectedCategoriesRef.current) {
            await updateCategoryRecipe(recipeId, categoryId, 1);
            console.log('add category for recipe');
        }

        //remove category for recipe
        for (let categoryId of unselectedCategoriesRef.current) {
            await updateCategoryRecipe(recipeId, categoryId, 2);
            console.log('remove category for recipe');
        }

        try {
            const response = await updateStatusRecipe(recipeId, 1);
            if (response.status === 200) {
                handleClose();
                console.log('approve thanh cong');
                toast.success('Duyệt công thức thành công');
            } else {
                console.log('approve that bai');
                toast.error('Duyệt công thức thất bại');
            }

        } catch (error) {
            console.error('loi khi approve recipe', error);
        }
    };

    const extensions = useExtensions({
        placeholder: "Add your own content here...",
    });


    const handleCheckboxChange = (event, categoryId) => {

        if (event.target.checked) {
            if (!selectedCategoriesRef.current.includes(categoryId)) {
                selectedCategoriesRef.current.push(categoryId);
                unselectedCategoriesRef.current = unselectedCategoriesRef.current.filter(id => id !== categoryId);
            }
        } else {
            selectedCategoriesRef.current = selectedCategoriesRef.current.filter(id => id !== categoryId);
            if (!unselectedCategoriesRef.current.includes(categoryId)) {
                unselectedCategoriesRef.current.push(categoryId);
            }
        }

    };

    useEffect(() => {
        if (open) {
            handleGetAllCategory();
            handleGetRecipeById(recipeId);
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

                                <CardMedia
                                    style={{ height: 600, width: 900, marginTop: 20, objectFit: 'contain', marginLeft: 70 }}
                                    component="img"
                                    image={recipe.featuredImage}
                                    alt={recipe.recipeTitle}
                                />
                                <Box sx={{ height: 340, width: 560, marginLeft: '20%', marginTop: '10px' }}>
                                    <EmbedVideo url={recipe.videoLink} />

                                </Box>

                            </CardContent>
                            <CardContent>
                                <Typography variant="h5" sx={{ marginTop: '45px', marginLeft: '20px' }}>
                                    Mô tả về món ăn
                                </Typography>
                                <Typography sx={{ textAlign: 'left', marginLeft: '5%', marginTop: '10px' }}>
                                    {recipe.recipeDescription || `đây là mô tả cho công thức của ${recipe.recipeTitle}`}
                                </Typography>
                                <Grid sx={{ display: 'flex', marginTop: '25px' }} container spacing={2}>
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
                                <Typography variant="h5" sx={{ marginTop: '25px', marginLeft: '20px' }}>
                                    Nguyên Liệu
                                </Typography>
                                {ingredients.map((ingredient, index) => (
                                    <Typography key={index} sx={{ marginLeft: '5%', marginTop: '10px' }}>
                                        {ingredient.ingredientName} : {ingredient.unitValue} {ingredient.ingredientUnit}
                                    </Typography>
                                ))}

                                {/* Cách làm */}
                                <Typography sx={{ marginLeft: '5%' }}>
                                    <RichTextReadOnly content={recipe?.recipeContent} extensions={extensions} />
                                </Typography>
                            </CardContent>

                        </Card>

                        {/* render list category để chọn cho recipe này */}
                        <Typography variant="h5" sx={{ marginTop: '25px', marginLeft: '20px' }}>
                            Chọn category cho công thức này
                        </Typography>
                        <Box sx={{ width: '90%', marginLeft: '5%', marginTop: '30px' }}>
                            <Grid container spacing={2}>
                                {Object.entries(categoryByParentId).map(([parentId, categories], index) => (
                                    <Grid sx={{ marginTop: '10px' }} item xs={3} key={index}>
                                        {categories.map((category) => (
                                            <CategoryCheckbox
                                                category={category}
                                                handleCheckboxChange={handleCheckboxChange}
                                                selectedCategoriesRef={selectedCategoriesRef}
                                            />
                                        ))}
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button sx={{marginRight:'30px'}} onClick={handleClose}>Cancel</Button>
                    <Button sx={{marginRight:'70px'}} onClick={() => {
                        handleApproveRecipe();

                    }}>{recipe.recipeStatus === 1 ? 'Save' : 'Approve'}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ApporoveDialog;