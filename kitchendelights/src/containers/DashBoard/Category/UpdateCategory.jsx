import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Paper, TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CategoryButton from "../../../components/Button/CategoryButton";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { getCategoryById } from "../../../services/ApiServices";
import { getCategoryByParentId } from "../../../services/ApiServices";
import DashboardMenu from "../../../components/Dashboard/Menu/DashboardMenu";
import Box from "@mui/material/Box";

function UpdateCategory() {
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState('');
    const [ParentCategories, setParentCategories] = useState([]);
    const [parentId, setParentId] = useState('');

    const { categoryId } = useParams();
    console.log(categoryId);

    const getCategoryInformation = async () => {
        try {
            const response = await getCategoryById(categoryId);
            if (response.status === 200) {
                setCategoryName(response.data?.categoryName ?? '');
                setParentId(response.data?.parentId ?? '');
            } else {
                console.error('Can not get category information');
            }
        } catch (error) {
            console.error('lỗi khi tải danh sách parent category', error);
        }
    }

    const GoToListCategory = () => {
        navigate('/ViewListCategory');
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
        getCategoryInformation();
        listParentCategory();
    });

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <DashboardMenu dashboardTitle={"Quản lý Category"} />
                
                <Grid sx={{ marginTop: '80px', marginLeft: '80px' }}>
                    <Paper sx={{borderRadius: '15px', border: '1px solid #bfb8b8', width: '1000px', height: '570px', backgroundColor: '#D9D9D9' }}>
                        <Typography sx={{ fontSize: '40px', fontWeight: 'bold', marginLeft: '20%', marginTop: '20px', color: '#0B488F' }}>
                            Cập nhật Category
                        </Typography>
                        <Grid container sx={{ marginTop: '30px', marginLeft: '30px' }}>
                            <Grid item xs={8} >
                                <Grid container direction="column">
                                    <Grid item xs container direction="row">
                                        <TextField size="small" type="input" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Category Name" sx={{ width: '100%', height: '55%', fontSize: '16px', fontWeight: 'bold', marginTop: '30px', marginLeft: '45px', backgroundColor: '#FFFFFF' }}>
                                        </TextField>
                                    </Grid>

                                    <Grid item xs container direction="row" sx={{ marginTop: '30px' }}>
                                        <Typography sx={{ fontSize: '18px', marginTop: '40px', marginLeft: '70px' }}>Chọn Category cha: </Typography>
                                        <FormControl sx={{ marginTop: '5px', marginLeft: '30px', minWidth: '60%', textAlign: 'center' }}>
                                            <Select value={parentId} onChange={(e) => setParentId(e.target.value)} sx={{ marginTop: '20px', width: '100%', borderRadius: '30px', height: '70%', backgroundColor: '#FFFFFF' }}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value={null}>
                                                    <em>None</em>
                                                </MenuItem>
                                                {ParentCategories.map((parent) => {
                                                    <MenuItem key={parent.categoryId} value={parent.categoryId}>{parent.categoryName}</MenuItem>
                                                })};
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item >
                                        <CategoryButton text='Cập nhật' height='auto' width='120px' marginLeft='10%' marginTop='80px' ></CategoryButton>
                                    </Grid>
                                    <Grid item xs container direction="row">
                                        <Button onClick={GoToListCategory} sx={{ fontSize: '10px', marginTop: '10%', marginLeft: '10%' }}>Quay lại list category</Button>
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

export default UpdateCategory;