import React, { useState, useEffect } from 'react';
import AvatarMenu from '../../components/Account/AvatarMenu';
import Appbar from '../../components/Homepage/Appbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import image1 from '../../assets/images/news1.jpg';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import UploadAvatar from '../../components/UploadAvatar/UploadAvatar';
import GetInformationJWT from '../../components/JWT/GetInformationJWT';
import SuccessSnackbar from '../../components/Snackbar/SuccessSnackbar';
import { myProfile, changeMyProfile } from '../../services/ApiServices';
import FailSnackbar from '../../components/Snackbar/FailSnackbar';

function MyProfile() {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [statusId, setStatusId] = useState('');
    const [statusName, setStatusName] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roleName, setRoleName] = useState('');


    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [avatarImage, setAvatarImage] = useState(null);
    const [newAvatarImage, setNewAvatarImage] = useState(null);

    const [open, setOpen] = useState(false);
    const [openFail, setOpenFail] = useState(false);

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

    useEffect(() => {
        if (id) {
            getInformationProfile();
        }
      }, [id]);
      const getInformationProfile = async () => {
        try {
          const response = await myProfile(id);
    
          if (response.status === 200) {
            const data = response.data;
            setEmail(data?.email);
            setFirstName(data?.firstName);
            setMiddleName(data?.middleName);
            setLastName(data?.lastName);
            setPhone(data?.phone);
            setAddress(data?.addresses);
            setAvatarImage(data?.avatar);
            setStatusId(data?.status?.statusId)
            setStatusName(data?.status?.statusName)
            setRoleId(data?.role?.roleId)
            setRoleName(data?.role?.roleName)
            console.log(response.data);
          } else {
            console.error('Can not get news!');
          }
        } catch (error) {
          console.error('Can not load news data!', error);
        }
      }

      const status = {
        statusId: statusId,
        statusName: statusName,
      };

      const role = {
        roleId: roleId, 
        roleName: roleName,
      };


    const changeProfile = async () => {
        try {
          const response = await changeMyProfile(id, email, firstName, middleName, lastName, phone, address, avatarImage, status, role);
          if (response.status === 200) {
            setOpen(true);
            navigate('/ChangeMyProfile');
          } else {
            setOpenFail(true);
            console.error('Your information is not change! ');
          }
        } catch (error) {
          console.error('Change error:', error);
        }
      };

    return (
        <div>
            <SuccessSnackbar open={open} text="Change profile successful!" setOpen={setOpen} />
            <FailSnackbar open={openFail} text="Change profile failed!" setOpen={setOpenFail}/>
            <Appbar />
            <GetInformationJWT setId={setId}/>
            <Box sx={{ display: 'flex' }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <AvatarMenu />
                    </Grid>

                    <Grid item xs container direction="column" sx={{ fontSize: '30px', fontWeight: 'bold' }}>
                        <Grid item>
                            <Typography sx={{ fontSize: '30px', fontWeight: 'bold', marginTop: '20px' }}>Chỉnh sửa thông tin cá nhân</Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ fontSize: '16px', marginTop: '10px' }}>Đây là nơi chỉnh sửa những thông tin cá nhân của bạn</Typography>
                        </Grid>

                        <Grid container spacing={2}>
                        <Paper item sx={{ marginTop: '3%', borderRadius: '15px', border: '1px solid #bfb8b8', width: '77%', height: '100%' }}>
                            <Grid container>
                                <Grid item xs={8}>
                                    <Grid container direction="column">
                                        <Grid item xs container direction="row">
                                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '70px' }}>Email: </Typography>
                                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '120px' }}>{email}</Typography>
                                        </Grid>

                                        <Grid item xs container direction="row">
                                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '70px' }}>Họ: </Typography>
                                            <TextField size='small' type="input" value={lastName} onChange={(e) => setLastName(e.target.value)} sx={{ width: '15%', height: '10px', fontSize: '16px', fontWeight: 'bold', marginTop: '30px', marginLeft: '5px' }} />
                                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '10px' }}>Đệm: </Typography>
                                            <TextField size='small' type="input" value={middleName} onChange={(e) => setMiddleName(e.target.value)} sx={{ width: '15%', height: '10px', fontSize: '16px', fontWeight: 'bold', marginTop: '30px', marginLeft: '5px' }} />
                                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '10px' }}>Tên: </Typography>
                                            <TextField size='small' type="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} sx={{ width: '15%', height: '10px', fontSize: '16px', fontWeight: 'bold', marginTop: '30px', marginLeft: '5px' }} />
                                        </Grid>

                                        <Grid item xs container direction="row">
                                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '70px' }}>Mật khẩu: </Typography>
                                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '93px' }}>******** </Typography>
                                        </Grid>

                                        <Grid item xs container direction="row">
                                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '70px' }}>Số điện thoại: </Typography>
                                            <TextField size='small' type="input" value={phone} onChange={(e) => setPhone(e.target.value)} sx={{ width: '225px', height: '10px', fontSize: '16px', fontWeight: 'bold', marginTop: '30px', marginLeft: '45px' }} />
                                        </Grid>

                                        <Grid item xs container direction="row">
                                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '70px' }}>Địa chỉ: </Typography>
                                            <TextField size='small' type="input" value={address} onChange={(e) => setAddress(e.target.value)} sx={{  height: '10px', fontSize: '16px', fontWeight: 'bold', marginTop: '30px', marginLeft: '95px' }} />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography sx={{marginTop: '50px' }}>
                                    <img src={avatarImage} alt="Image news" style={{width: '250px', height: '250px', overflow: 'hidden', marginRight: '2%' }} />
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
