import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ClassicButton from "../../../components/Button/ClassicButton";
import { useState } from "react";



function CreateRecipeDashBoard() {

    const[steps, setSteps] = useState([1]);

    const addStep = () => {
        setSteps([...steps, steps.length + 1]);
    };


    return (
        <div>
            <Paper elevation={2} sx={{ marginLeft: '320px', marginTop: '30px', borderRadius: '15px', border: '1px solid #bfb8b8', width: '1100px', height: '700px', backgroundColor: '#FFFFFF',overflow:'auto' }}>
                <Typography sx={{ fontSize: '24px', fontWeight: '', marginLeft: '10%', marginTop: '30px', color: '#4A5568' }}>
                    Tạo Recipe mới
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold', marginTop: '15px', marginLeft: '45px' }}>Title: </Typography>
                        <TextField size="small" type="input" placeholder="Tittle" sx={{ width: '80%', height: '10%', fontSize: '14px', fontWeight: 'bold', marginLeft: '45px', backgroundColor: '#FFFFFF' }}>
                        </TextField>

                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold', marginTop: '10px', marginLeft: '45px' }}>Mô tả: </Typography>
                        <TextField size="small" type="input" placeholder="Mô tả về công thức" sx={{ width: '80%', height: '10%', fontSize: '14px', fontWeight: 'bold', marginLeft: '45px', backgroundColor: '#FFFFFF' }}>
                        </TextField>

                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold', marginTop: '10px', marginLeft: '45px' }}>Thời gian chuẩn bị: </Typography>
                        <TextField size="small" type="input" placeholder="Thời gian chuẩn bị" sx={{ width: '80%', height: '10%', fontSize: '14px', fontWeight: 'bold', marginLeft: '45px', backgroundColor: '#FFFFFF' }}>
                        </TextField>

                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold', marginTop: '10px', marginLeft: '45px' }}>Thời gian nấu: </Typography>
                        <TextField size="small" type="input" placeholder="Thời gian nấu" sx={{ width: '80%', height: '10%', fontSize: '14px', fontWeight: 'bold', marginLeft: '45px', backgroundColor: '#FFFFFF' }}>
                        </TextField>

                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold', marginTop: '10px', marginLeft: '45px' }}>Số suất ăn: </Typography>
                        <TextField size="small" type="input" placeholder="Số suất ăn" sx={{ width: '80%', height: '10%', fontSize: '14px', fontWeight: 'bold', marginLeft: '45px', backgroundColor: '#FFFFFF' }}>
                        </TextField>

                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold', marginTop: '10px', marginLeft: '45px' }}>Link Video: </Typography>
                        <TextField size="small" type="input" placeholder="Link Video" sx={{ width: '80%', height: '10%', fontSize: '14px', fontWeight: 'bold', marginLeft: '45px', backgroundColor: '#FFFFFF' }}>
                        </TextField>

                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold', marginTop: '10px', marginLeft: '45px' }}>Ảnh: </Typography>

                        <Button variant="contained" sx={{ marginTop: '10px', marginLeft: '70%' }}>Thêm ảnh</Button>

                    </Grid>

                    <Grid item xs={6}>

                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold', marginTop: '10px', marginLeft: '45px' }}>Nguyên liệu: </Typography>
                        <TextField size="small" type="input" placeholder="Nguyên liệu" sx={{
                            width: '80%', height: '30%', fontSize: '14px', fontWeight: 'bold', marginLeft: '45px', backgroundColor: '#FFFFFF', '& .MuiInputBase-input': {
                                height: '130px',
                            },
                        }}>
                        </TextField>
                        <Button variant="contained" sx={{ marginTop: '10px', marginLeft: '50%' }}>Thêm nguyên liệu</Button>
                    
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold', marginTop: '10px', marginLeft: '45px' }}>cách làm: </Typography>
                        {steps.map((step,index) => (
                        <TextField key={index} size="small" type="input" placeholder={`Bước${step}`} sx={{ width: '80%', height: '10%', fontSize: '14px', fontWeight: 'bold', marginLeft: '45px', backgroundColor: '#FFFFFF' }}>
                        </TextField>
                        ))}
                        <Button variant="contained" onClick={addStep} sx={{ marginTop: '10px', marginLeft: '50%' }}>Thêm bước làm</Button>

                    </Grid>
                </Grid>

            </Paper>
        </div>
    )
}


export default CreateRecipeDashBoard;