import React from 'react';
import AvatarMenu from '../components/Account/AvatarMenu';
import Appbar from '../components/Homepage/Appbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import image1 from '/SEP490_G55_SPR24_FE/SEP490_G55_SPR24_FE/kitchendelights/src/assets/images/news1.jpg';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


function MyProfile() {
  const navigate = useNavigate();

  const goToChangeMyProfile = () => {
    navigate('/ChangeMyProfile');
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <Appbar />
      <Box sx={{ display: 'flex' }}>
        <Grid container spacing={2}>
          <Grid item>
            <AvatarMenu />
          </Grid>

          <Grid item xs container direction="column" sx={{ fontSize: '30px', fontWeight: 'bold', marginLeft: '50px' }}>
            <Grid item>
              <Typography sx={{ fontSize: '30px', fontWeight: 'bold', marginTop: '20px' }}>Thông tin cá nhân</Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ fontSize: '16px', marginTop: '10px' }}>Đây là nơi hiển thị những thông tin cá nhân</Typography>
            </Grid>

            <Paper item sx={{ marginTop: '30px', borderRadius: '15px', border: '1px solid #bfb8b8', width: '1000px', height: '470px' }}>
              <Grid container>
                <Grid item xs={6}>
                  <Grid container direction="column">
                    <Grid item xs container direction="row">
                      <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '70px' }}>Email: </Typography>
                      <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '120px' }}>faskdk@gmail.com </Typography>
                    </Grid>

                    <Grid item xs container direction="row">
                      <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '70px' }}>Họ và tên: </Typography>
                      <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '90px' }}>Phan Tuấn Linh </Typography>
                    </Grid>

                    <Grid item xs container direction="row">
                      <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '70px' }}>Mật khẩu: </Typography>
                      <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '93px' }}>******** </Typography>
                    </Grid>

                    <Grid item xs container direction="row">
                      <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '70px' }}>Số điện thoại: </Typography>
                      <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '61px' }}>0923166218 </Typography>
                    </Grid>

                    <Grid item xs container direction="row">
                      <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '70px' }}>Địa chỉ: </Typography>
                      <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '110px' }}>Hanoi </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={6}>
                  <Typography sx={{ marginLeft: '50px', marginTop: '50px' }}>
                    <img src={image1} alt="Image news" />
                    <br/>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '10px', marginLeft: '165px' }}>Avatar</Typography>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs container direction="row">
                    <Button variant="contained" sx={{ bgcolor: "#ff5e00", marginTop:'58px', borderRadius: '15px', marginLeft: '370px', width: '180px', height: '42px', color: 'white'}} onClick={goToChangeMyProfile}>Đổi thông tin</Button>
                    </Grid>
            </Paper>
          </Grid>

        </Grid>
      </Box>


    </div>
  );
}

export default MyProfile;
