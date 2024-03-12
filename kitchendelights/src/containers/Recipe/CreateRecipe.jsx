
import React, { useEffect , useState } from 'react';
import { useNavigate } from "react-router-dom";
import Appbar from '../../components/Homepage/Appbar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import {AppCreateRecipe} from '../../components/Richtext/App.tsx'
import ClassicButton from '../../components/Button/ClassicButton.jsx';

export default function CreateRecipe() {
  const navigate = useNavigate();


  // const handleMarkdownChange = (event) => {
  //   const content = event.target.value;
  //   setMarkdownContent(content);
  //   const html = convertMarkdownToHtml(content);
  //   setHtmlContent(html);
  // };

  const goToViewListRecipe = () => {
    navigate('/ViewListRepice');
  }

  return (
    <div>
        <Appbar/>
        <Grid container spacing={2}>
            <Grid item xs={8}>
            <Typography sx={{ marginLeft: '25%', fontSize: '16px', marginRight: '255px', marginTop: '4%'}}>
                <Breadcrumbs aria-label="breadcrumb" color="#ff5e00" sx={{fontSize: '30px', fontWeight: 'bold'}}>
                <Link underline="hover" color="#ff5e00" onClick={goToViewListRecipe} sx={{fontSize: '30px', fontWeight: 'bold'}}>Công thức</Link>
                <Typography color="#ff5e00" sx={{fontSize: '30px', fontWeight: 'bold'}}>Tạo công thức mới</Typography>
                </Breadcrumbs>
                Nơi bạn tạo những công thức nấu ăn. Người dùng sẽ nhìn thấy công thức nấu ăn của bạn.
            </Typography>
            </Grid>

            <Grid item xs={10}>
                <Paper elevation={0} sx={{marginLeft: '20%'}}>
                <AppCreateRecipe/>
                </Paper>
            </Grid>

        </Grid>
    </div>
  )
}
