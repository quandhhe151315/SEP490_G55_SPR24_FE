import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button, Paper, TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CategoryButton from "../../../components/Button/CategoryButton";
import { Navigate, useNavigate } from "react-router-dom";
import { getCategoryByParentId } from "../../../services/ApiServices";
import { postCreateCategory } from "../../../services/ApiServices";
import { toast } from "react-toastify";
import DashboardMenu from "../../../components/Dashboard/Menu/DashboardMenu";
import Box from "@mui/material/Box";

function CreateCategory() {
    const navigate = useNavigate();

    const [categoryName, setCategoryName] = useState("");
    const [parentCategories, setParentCategories] = useState([]);
    const [parentId, setParentId] = useState(null);
    const categoryId = 0;
    const categoryType = 'true';

    const handleChange = (event) => {
        setParentId(event.target.value);

    };
    const GoToListCategory = () => {
        navigate('/ViewListCategory');
    }

    const handleCreatCategory = async () => {
        try {
            console.log(categoryId, categoryName, categoryType, parentId);
            const response = await postCreateCategory(categoryId, categoryName, categoryType, parentId);

            GoToListCategory();
            if (response.status === 200) {
                toast.success('Tạo category thành công');
            }
            else {
                console.log('lỗi khi tạo category');
            }
        }
        catch (error) {
            console.error('lỗi khi tạo category', error);
            toast.error('Tạo category thất bại');
        }
    }

    const listParentCategory = async () => {
        try {
            const response = await getCategoryByParentId();
            if (response.status === 200) {
                setParentCategories(response.data);

            } else {
                console.log('lỗi khi tải danh sách parent category');
            }
        } catch (error) {
            console.error('lỗi khi tải danh sách parent category', error);
        }
    };

    useEffect(() => {
        listParentCategory();
    }, []);

    return (
        <div>
            <Box sx={{display:'flex'}}>
                <DashboardMenu dashboardTitle={"Quản lý Category"} />
                <Grid sx={{marginTop:'80px', marginLeft: '80px'}}>
                    <Paper sx={{borderRadius: '15px', border: '1px solid #bfb8b8', width: '1000px', height: '570px', backgroundColor: '#FFFFFF' }}>
                        <Typography sx={{ fontSize: '40px', fontWeight: 'bold', marginLeft: '20%', marginTop: '20px', color: '#0B488F' }}>
                            Tạo Category
                        </Typography>
                        <Grid container sx={{ marginTop: '30px', marginLeft: '30px' }}>
                            <Grid item xs={8} >
                                <Grid container direction="column">
                                    <Grid item xs container direction="row">
                                        <TextField onChange={(e) => setCategoryName(e.target.value)} size="small" type="input" placeholder="Category Name" sx={{ width: '100%', height: '55%', fontSize: '16px', fontWeight: 'bold', marginTop: '30px', marginLeft: '45px', backgroundColor: '#FFFFFF' }}>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs container direction="row" sx={{ marginTop: '30px' }}>
                                        <Typography sx={{ fontSize: '18px', marginTop: '40px', marginLeft: '70px' }}>Chọn Category cha: </Typography>
                                        <FormControl sx={{ marginTop: '5px', marginLeft: '30px', minWidth: '60%', textAlign: 'center' }}>
                                            <Select value={parentId} onChange={handleChange} sx={{ marginTop: '20px', width: '100%', borderRadius: '30px', height: '70%', backgroundColor: '#FFFFFF' }}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value={null}>
                                                    <em>None</em>
                                                </MenuItem>
                                                {parentCategories.map((parent) => (
                                                    <MenuItem key={parent.categoryId} value={parent.categoryId}>{parent.categoryName}</MenuItem>
                                                ))};
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item >
                                        <CategoryButton onClick={handleCreatCategory} text='Tạo' height='auto' width='120px' marginLeft='10%' marginTop='80px' ></CategoryButton>
                                    </Grid>
                                    <Grid item xs container direction="row">
                                        <Button onClick={() => {
                                            GoToListCategory();
                                        }} sx={{ fontSize: '10px', marginTop: '10%', marginLeft: '10%' }}>Quay lại list category</Button>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Box>
        </div>
    );
}

export default CreateCategory;