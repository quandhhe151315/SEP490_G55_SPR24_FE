import React, { useState, useEffect } from 'react';
import AvatarMenu from '../../components/Account/AvatarMenu';
import Appbar from '../../components/Homepage/Appbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import SuccessSnackbar from '../../components/Snackbar/SuccessSnackbar';
import FailSnackbar from '../../components/Snackbar/FailSnackbar';
import { changePassword } from '../../services/ApiServices';

function MyProfile() {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');

    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openFailSnackbar, setOpenFailSnackbar] = useState(false);

    const navigate = useNavigate();

    const handleChangePassword = async () => {
        try {
          const response = await changePassword(Cookies.get('userId'), password, newPassword);
          if (response.status === 200) {
            setOpenSuccessSnackbar(true);
            navigate('/KitchenDelights');
          } else {
            console.log('Old password is not correct! ');
            setOpenFailSnackbar(true);
            console.error('Change error! ');
          }
        } catch (error) {
          console.error('Change error:', error);
        }
      };

    return (
        <div>
            <Appbar />
            <FailSnackbar open={openFailSnackbar} text="Change password error!" />
            <SuccessSnackbar open={openSuccessSnackbar} text="Change password successful!" />
            <Box sx={{ display: 'flex' }}>
                <Grid container spacing={2}>
                    <Grid item>
                        <AvatarMenu />
                    </Grid>

                    <Grid item xs container direction="column" sx={{ fontSize: '30px', fontWeight: 'bold', marginLeft: '50px' }}>
                        <Grid item>
                            <Typography sx={{ fontSize: '30px', fontWeight: 'bold', marginTop: '20px' }}>Đổi mật khẩu</Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ fontSize: '16px', marginTop: '10px' }}>Đây là nơi đổi mật khẩu của bạn</Typography>
                        </Grid>

                        <Paper item sx={{ marginTop: '30px', borderRadius: '15px', border: '1px solid #bfb8b8', width: '1000px', height: '470px' }}>
                            <Grid container>

                                    <Grid container direction="column">
                                        <Grid item xs container direction="row">
                                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '70px' }}>Nhập mật khẩu cũ: </Typography>
                                            <TextField size='small' type="input" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ width: '325px', height: '10px', fontSize: '16px', fontWeight: 'bold', marginTop: '30px', marginLeft: '133px' }} />
                                        </Grid>

                                        <Grid item xs container direction="row">
                                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '70px' }}>Nhập mật khẩu mới: </Typography>
                                            <TextField size='small' type="input" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} sx={{ width: '325px', height: '10px', fontSize: '16px', fontWeight: 'bold', marginTop: '30px', marginLeft: '123px' }} />
                                        </Grid>

                                        <Grid item xs container direction="row">
                                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '70px' }}>Nhập lại mật khẩu mới: </Typography>
                                            <TextField size='small' type="input" value={reNewPassword} onChange={(e) => setReNewPassword(e.target.value)} sx={{ width: '325px', height: '10px', fontSize: '16px', fontWeight: 'bold', marginTop: '30px', marginLeft: '100px' }} />
                                        </Grid>
                                    </Grid>


                            </Grid>
                            <Grid item xs container direction="row">
                                <Button variant="contained" onClick={handleChangePassword} sx={{ bgcolor: "#ff5e00", marginTop: '199px', borderRadius: '15px', marginLeft: '370px', width: '180px', height: '42px', color: 'white' }}>Đổi mật khẩu</Button>
                            </Grid>
                        </Paper>
                    </Grid>

                </Grid>
            </Box>


        </div>
    );
}

export default MyProfile;
