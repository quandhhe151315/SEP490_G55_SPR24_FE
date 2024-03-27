import React, { useCallback, useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import { RichTextReadOnly } from "mui-tiptap";
import useExtensions from "../../../components/Richtext/useExtension.ts";
import EmbedVideo from "../../../components/Video/EmbedVideo.jsx";

function CategoryCheckbox({ category, handleCheckboxChange, selectedCategories  }) {
    
    return (
        <FormControlLabel
            key={category.categoryId}
            control={
                <Checkbox
                    value={category.categoryId}
                    onChange={(event) => {
                        handleCheckboxChange(event, category.categoryId);
                    }}
                    checked={selectedCategories.includes(category.categoryId)}
                />
            }
            label={category.categoryName}
            sx={{ display: 'block', wordWrap: 'break-word' }}
        />
    );
}




function ApporoveDialog({ open, handleClose, recipeId }) {
    const [recipe, setRecipe] = useState({});
    const [categories, setCategories] = useState([]);
    const [checkCount, setCheckCount] = useState(0);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [ingredients, setIngredients] = useState([{}]);
    const [categoriesRecipe, setCategoriesRecipe] = useState([]);

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
                setSelectedCategories(response.data.categories.map(category => category.categoryId));
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
    

    const handleUpdateCategoryRecipe = async (recipeId, categoryId, type, event) => {
        event.preventDefault();
        try {
            const reponse = await updateCategoryRecipe(recipeId, categoryId, type);
            if (reponse.status === 200) {

                console.log('update category thanh cong');

            } else {
                console.log('update category that bai');
            }
        } catch (error) {
            console.error('loi khi update category cho recipe', error);
        }
    };

    const handleApproveRecipe = async () => {
        if(selectedCategories.length === 0) {
            toast.error('Vui lòng chọn ít nhất 1 category');
            return;
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
        event.preventDefault();
        let newSelectedCategories = [...selectedCategories];
        if (event.target.checked) {
            newSelectedCategories.push(categoryId);
            handleUpdateCategoryRecipe(recipeId, categoryId, 1, event);
        } else {
            newSelectedCategories = newSelectedCategories.filter(id => id !== categoryId);
            handleUpdateCategoryRecipe(recipeId, categoryId, 2, event);
        }
        setSelectedCategories(newSelectedCategories);
    };

    function isCategorySelected(categoryId) {
        return selectedCategories.some(category => category.id === categoryId);
      }

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
                                <EmbedVideo url="https://www.youtube.com/playlist?list=PLz6H3RqQFdcwFwQECBcZVYAmXVhc0gPR1" />
                                <Box sx={{ height: 340, width: 560, marginLeft: '20%', marginTop: '10px' }}>
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src="https://www.youtube.com/watch?v=tbaQLjWdV04"
                                        title="YouTube video player"
                                        frameBorder={0}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
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
                                                selectedCategories={selectedCategories}
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
                    <Button onClick={() => {
                        handleApproveRecipe();

                    }}>{recipe.recipeStatus === 1 ? 'Save' : 'Approve'}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ApporoveDialog;