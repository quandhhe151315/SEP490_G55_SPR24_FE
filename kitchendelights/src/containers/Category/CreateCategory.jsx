import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button, Paper, TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Link from "@mui/material/Link";
import CategoryButton from "../../components/Button/CategoryButton";
import { Navigate, useNavigate } from "react-router-dom";
function CreateCategory() {
    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState('0');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);

    };
    const GoToListCategory = () => {
        navigate('/ViewListCategory');
    }

    
    return (
        <div>
            <Grid >
                <Paper sx={{ marginLeft: '400px', marginTop: '30px', borderRadius: '15px', border: '1px solid #bfb8b8', width: '1000px', height: '570px', backgroundColor: '#D9D9D9' }}>
                    <Typography sx={{ fontSize: '40px', fontWeight: 'bold', marginLeft: '20%', marginTop: '20px', color: '#0B488F' }}>
                        Tạo Category
                    </Typography>
                    <Grid container sx={{ marginTop: '30px', marginLeft: '30px' }}>
                        <Grid item xs={8} >
                            <Grid container direction="column">
                                <Grid item xs container direction="row">
                                    <TextField size="small" type="input" placeholder="Category Name" sx={{ width: '100%', height: '55%', fontSize: '16px', fontWeight: 'bold', marginTop: '30px', marginLeft: '45px', backgroundColor: '#FFFFFF' }}>
                                    </TextField>
                                </Grid>
                                <Grid item xs container direction="row" sx={{ marginTop: '30px' }}>
                                    <Typography sx={{ fontSize: '18px', marginTop: '40px', marginLeft: '70px' }}>Chọn Category cha: </Typography>
                                    <FormControl sx={{ marginTop: '5px', marginLeft: '30px', minWidth: '60%', textAlign: 'center' }}>
                                        <Select value={selectedValue} onChange={handleChange} sx={{ marginTop: '20px', width: '100%', borderRadius: '30px', height: '70%', backgroundColor: '#FFFFFF' }}
                                            //value={age}
                                            //onChange={handleChange}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            <MenuItem value={0}>
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Món nướng</MenuItem>
                                            <MenuItem value={20}>Bữa sáng</MenuItem>
                                            <MenuItem value={30}>Bữa ăn nhẹ</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item >
                                    <CategoryButton text='Tạo' height='auto' width='120px' marginLeft='10%' marginTop='80px' ></CategoryButton>
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

export default CreateCategory;