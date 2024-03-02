import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Paper, TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CategoryButton from "../../components/Button/CategoryButton";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function UpdateCategory() {
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState('');
    const [parentCategory, setParentCategory] = useState([]);
    const [parentId, setParentId] = useState('');


    const GoToListCategory = () => {
        navigate('/ViewListCategory');
    }

    // const getCategoryInformation = async () => {
    //     setCategoryName('');
    // }
    const fetchParentCategory = async () => {
        try {
            const response = await fetch('');
            const data = await response.json();
            setParentCategory(data);
        } catch (error) {
            console.error('lỗi khi tải danh sách parent category', error);
        }
    };

    // useEffect(() => {
    //     fetchParentCategory();
    // });

    return (
        <div>
            <Grid >
                <Paper sx={{ marginLeft: '400px', marginTop: '30px', borderRadius: '15px', border: '1px solid #bfb8b8', width: '1000px', height: '570px', backgroundColor: '#D9D9D9' }}>
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
                                        <Select value={parentId} onChange={(e)=>setParentId(e.target.value)} sx={{ marginTop: '20px', width: '100%', borderRadius: '30px', height: '70%', backgroundColor: '#FFFFFF' }}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            <MenuItem value={0}>
                                                <em>None</em>
                                            </MenuItem>
                                            {parentCategory.map((parent) => {
                                                <MenuItem key={parent.id} value={parent.id}>{parent.name}</MenuItem>
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
        </div>
    );
}

export default UpdateCategory;