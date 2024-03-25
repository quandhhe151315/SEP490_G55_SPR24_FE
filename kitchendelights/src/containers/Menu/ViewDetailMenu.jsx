import React, { useState ,useEffect } from 'react';
import AvatarMenu from '../../components/Account/AvatarMenu';
import Appbar from '../../components/Homepage/Appbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { changePassword } from '../../services/ApiServices';
import { useSnackbar } from '../../components/Snackbar/Snackbar';
import MenuDetail from './MenuDetail';

function ViewDetailMenu() {
    const { menuId } = useParams();

    return (
        <div>
            <Appbar/>
            <Grid container spacing={2} sx={{marginBottom: '2%'}}>
        <Grid item xs={2} sx={{marginLeft: '10%'}}>
          <AvatarMenu/>
        </Grid>
        <Grid item xs={1}  ></Grid>
        <Grid item xs={7}  >
            <Box sx={{ display: 'flex' }}>
                <Grid container spacing={0}>
                <Grid item xs={12}>

                    <MenuDetail menuId={menuId}/>
                    </Grid>
                </Grid>
            </Box>

            </Grid>
            </Grid>
        </div>
    );
}

export default ViewDetailMenu;
