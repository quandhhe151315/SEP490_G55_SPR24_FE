import React, { useState, useEffect } from 'react';
import AvatarMenu from '../components/Account/AvatarMenu';
import Appbar from '../components/Homepage/Appbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import image1 from '/SEP490_G55_SPR24_FE/SEP490_G55_SPR24_FE/kitchendelights/src/assets/images/news1.jpg';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyProfile() {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const navigate = useNavigate();
    
    const getProfileInformation = async () => {
        setFirstName('Linh');
        setMiddleName('Tuấn');
        setLastName('Phan');
        setPhoneNumber('0923166218');
        setAddress('Hanoi');
    };

    useEffect(() => {
        getProfileInformation();
    }, []);

    const changeProfile = async () => {
        try {
          const response = await axios.post(process.env.REACT_APP_API_URL_LOGIN, {
            firstname: firstName,
            middlename: middleName,
            lastname: lastName,
            phonenumber: phoneNumber,
            address: address,
          });
    
          if (response.data.jwt) {
            navigate(response.data.redirectUrl);
          } else {
            console.error('Your information is not change! ');
          }
        } catch (error) {
          console.error('Change error:', error);
        }
      };

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
                            <Typography sx={{ fontSize: '30px', fontWeight: 'bold', marginTop: '20px' }}>Chỉnh sửa thông tin cá nhân</Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ fontSize: '16px', marginTop: '10px' }}>Đây là nơi chỉnh sửa những thông tin cá nhân của bạn</Typography>
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
                                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '70px' }}>Họ: </Typography>
                                            <TextField size='small' type="input" value={lastName} onChange={(e) => setLastName(e.target.value)} sx={{ width: '80px', height: '10px', fontSize: '16px', fontWeight: 'bold', marginTop: '30px', marginLeft: '5px' }} />
                                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '10px' }}>Đệm: </Typography>
                                            <TextField size='small' type="input" value={middleName} onChange={(e) => setMiddleName(e.target.value)} sx={{ width: '80px', height: '10px', fontSize: '16px', fontWeight: 'bold', marginTop: '30px', marginLeft: '5px' }} />
                                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '10px' }}>Tên: </Typography>
                                            <TextField size='small' type="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} sx={{ width: '80px', height: '10px', fontSize: '16px', fontWeight: 'bold', marginTop: '30px', marginLeft: '5px' }} />
                                        </Grid>

                                        <Grid item xs container direction="row">
                                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '70px' }}>Mật khẩu: </Typography>
                                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '93px' }}>******** </Typography>
                                        </Grid>

                                        <Grid item xs container direction="row">
                                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '70px' }}>Số điện thoại: </Typography>
                                            <TextField size='small' type="input" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} sx={{ width: '225px', height: '10px', fontSize: '16px', fontWeight: 'bold', marginTop: '30px', marginLeft: '45px' }} />
                                        </Grid>

                                        <Grid item xs container direction="row">
                                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '70px' }}>Địa chỉ: </Typography>
                                            <TextField size='small' type="input" value={address} onChange={(e) => setAddress(e.target.value)} sx={{ height: '10px', fontSize: '16px', fontWeight: 'bold', marginTop: '30px', marginLeft: '95px' }} />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={6}>
                                    <Typography sx={{ marginLeft: '50px', marginTop: '50px' }}>
                                        <img src={image1} alt="Image news" />
                                        <br />
                                        <Button variant="contained" sx={{ bgcolor: "#ff5e00", borderRadius: '15px', marginLeft: '130px', width: '130px', height: '42px', color: 'white' }}>Đổi Avatar</Button>
                                        <Grid item xs container direction="row">

                                        </Grid>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs container direction="row">
                                <Button variant="contained" onClick={changeProfile} sx={{ bgcolor: "#ff5e00", marginTop: '50px', borderRadius: '15px', marginLeft: '370px', width: '180px', height: '42px', color: 'white' }}>Đổi thông tin</Button>
                            </Grid>
                        </Paper>
                    </Grid>

                </Grid>
            </Box>


        </div>
    );
}

export default MyProfile;
