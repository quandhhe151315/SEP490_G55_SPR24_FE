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
import { changePassword } from '../../services/ApiServices';
import { useSnackbar } from '../../components/Snackbar/Snackbar';
function ChangePassword() {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');

    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

    const handleChangePassword = async () => {
        if(reNewPassword !== newPassword){
            showSnackbar('Nhập lại mật khẩu không trùng khớp với mật khẩu!', "error");
        } else if (newPassword.length < 6 || password.length < 6) {
            showSnackbar('Mật khẩu phải dài hơn 6 kí tự!', "error");
        } else{
            try {
            const response = await changePassword(Cookies.get('userId'), password, newPassword);
            if (response.status === 200) {
                showSnackbar('Thay đổi mật khẩu thành công!', 'success');
                navigate('/ChangePassword');
                setPassword('');
                setNewPassword('');
                setReNewPassword('');
            } else {

            }
            } catch (error) {
                showSnackbar('Mật khẩu cũ không đúng!', 'error');
            }
        }
        
      };

    return (
        <div>
            <Appbar/>
            <Grid container spacing={2} sx={{marginBottom: '2%'}}>
        <Grid item xs={2} sx={{marginLeft: '10%'}}>
          <AvatarMenu/>
        </Grid>
        
        <Grid item xs={7}  >
            <Box sx={{ display: 'flex' }}>
                <Grid container spacing={2}>
                <Grid item xs={12}>

                    <Grid item xs container direction="column" sx={{ fontSize: '30px', fontWeight: 'bold' }}>
                        <Grid item>
                            <Typography sx={{ fontSize: '30px', fontWeight: 'bold', marginTop: '20px' }}>Đổi mật khẩu</Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ fontSize: '16px', marginTop: '10px' }}>Đây là nơi đổi mật khẩu của bạn</Typography>
                        </Grid>

                        <Grid container spacing={2}>
                        <Paper item sx={{ marginTop: '3%', borderRadius: '15px', border: '1px solid #bfb8b8', width: '100%', height: '100%', marginLeft: '1.5%' }}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Grid container direction="column">
                                        <Grid item xs container direction="row">
                                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '10%' }}>Nhập mật khẩu cũ: </Typography>
                                            <TextField size='small' type="input" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ width: '30%', height: '10px', fontSize: '16px', fontWeight: 'bold', marginTop: '3%', marginLeft: '10%' }} />
                                        </Grid>

                                        <Grid item xs container direction="row">
                                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '10%' }}>Nhập mật khẩu mới: </Typography>
                                            <TextField size='small' type="input" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} sx={{ width: '30%', height: '10px', fontSize: '16px', fontWeight: 'bold', marginTop: '3%', marginLeft: '9%' }} />
                                        </Grid>

                                        <Grid item xs container direction="row">
                                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '10%' }}>Nhập lại mật khẩu mới: </Typography>
                                            <TextField size='small' type="input" value={reNewPassword} onChange={(e) => setReNewPassword(e.target.value)} sx={{ width: '30%', height: '10px', fontSize: '16px', fontWeight: 'bold', marginTop: '3%', marginLeft: '7%' }} />
                                        </Grid>
                                    </Grid>

                                    </Grid>
                            </Grid>
                            <Grid item xs container direction="row">
                                <Button variant="contained" onClick={handleChangePassword} sx={{ bgcolor: "#ff5e00", marginTop: '10%', marginBottom:'5%', borderRadius: '15px', marginLeft: '40%', width: '180px', height: '42px', color: 'white' }}>Đổi mật khẩu</Button>
                            </Grid>
                        </Paper>
                    </Grid>
                    </Grid>
                    </Grid>
                </Grid>
            </Box>

            </Grid>
            </Grid>
        </div>
    );
}

export default ChangePassword;
