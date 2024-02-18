import React, { useState, useEffect } from 'react';
import AvatarMenu from '../components/Account/AvatarMenu';
import Appbar from '../components/Homepage/Appbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import image1 from '../assets/images/news1.jpg';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import UploadAvatar from '../components/UploadAvatar/UploadAvatar';

function MyProfile() {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [avatarImage, setAvatarImage] = useState(null);
    const [newAvatarImage, setNewAvatarImage] = useState(null);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const changeAvatarImage = () => {
        setAvatarImage(newAvatarImage);
        handleCloseDialog();
    }

    const getProfileInformation = async () => {
        setFirstName('Linh');
        setMiddleName('Tuấn');
        setLastName('Phan');
        setPhoneNumber('0923166218');
        setAddress('Hanoi');
        setAvatarImage(image1);
    };

    useEffect(() => {
        getProfileInformation();
        console.log('useEffect has been called! / ' + firstName);
    }, [firstName]);

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

                    <Grid item xs container direction="column" sx={{ position: 'fixed' ,fontSize: '30px', fontWeight: 'bold', marginLeft: '627px' }}>
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
                                    <Typography sx={{marginLeft: '50px', marginTop: '50px' }}>
                                    <img src={avatarImage} alt="Image news" style={{width: '250px', height: '250px', overflow: 'hidden', marginLeft: '0px', marginLeft: '70px' }} />
                                        <br />
                                        <Button variant="contained" onClick={handleOpenDialog} sx={{bgcolor: "#ff5e00", borderRadius: '15px', marginLeft: '130px', marginTop: '30px' ,width: '130px', height: '42px', color: 'white' }}>Đổi Avatar</Button>
                                        <Grid item xs container direction="row">
                                        </Grid>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs container direction="row">
                                <Button variant="contained" onClick={changeProfile} sx={{ bgcolor: "#ff5e00", marginTop: '20px', borderRadius: '15px', marginLeft: '370px', width: '180px', height: '42px', color: 'white' }}>Đổi thông tin</Button>
                            </Grid>
                        </Paper>
                    </Grid>

                </Grid>
            </Box>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg">
                <DialogTitle>Đổi Avatar</DialogTitle>
                <DialogContent>
                <UploadAvatar setNewAvatarImage={setNewAvatarImage}/>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} sx={{ marginRight: '250px' }}>Hủy</Button>
                    <Button variant="contained" onClick={changeAvatarImage} sx={{ width: '100px' ,bgcolor: "#ff5e00", borderRadius: '15px', color: 'white', marginRight: '15px'}}>Đổi</Button>
                    
                </DialogActions>
            </Dialog>
            
        </div>
    );
}

export default MyProfile;
