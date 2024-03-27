import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ClassicButton from "../../../components/Button/ClassicButton";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { getAllCategory } from "../../../services/ApiServices";
import CategoryCheckbox from "./CategoryCheckbox";


function EditRecipeCategory({ open, handleClose, recipeId }) {

    const [categories, setCategories] = useState([]);

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

    const categoryByParentId = categories.filter(category => category.parentId !== null).reduce((groups, category) => {
        const group = (groups[category.parentId] || []);
        group.push(category);
        groups[category.parentId] = group;
        return groups;
    }, {});

    useEffect(() => {
        if (open){
        handleGetAllCategory();
        }
    }, [open,recipeId]);

    return (
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

            <DialogTitle>Cập nhật Category cho công thức</DialogTitle>

            <DialogContent>
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
                                    />

                                ))}
                            </Grid>
                        ))}
                    </Grid>

                </Box>

            </DialogContent>

            <DialogActions>

            </DialogActions>
        </Dialog>
    )
}


export default EditRecipeCategory;