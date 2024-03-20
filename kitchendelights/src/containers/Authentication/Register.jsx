import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../../assets/css/Login.css'
import { TextField, Grid, Stack, Typography, Box } from '@mui/material';
import {register} from '../../services/ApiServices'
import ClassicButton from '../../components/Button/ClassicButton';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { useSnackbar } from '../../components/Snackbar/Snackbar';
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const goToLoginPage = () => {
    navigate('/Login');
  }

  const goToForgotPasswordPage = () => {
    navigate('/ForgotPassword');
  }

  const handleRegister = async () => {
    try {
      const response = await register(username, email, password);
      if (response.status === 200) {
        goToLoginPage();
        showSnackbar('Register successful!', "success");
      } else {

      }
    } catch (error) {
      showSnackbar('Register failed!', "error");
    }
  };

  return (
    <div>
         <Container fixed>
        <Box>
                <Grid container spacing={2}>
                <Typography sx={{ fontSize: '32px', marginTop: '10%',marginLeft: '37%',marginRight: '35%', }}>Đăng kí tài khoản</Typography>
                  </Grid>
                
                  <Stack spacing={3} sx={{marginLeft: '35%', marginTop: '5%'}}>
                    <TextField size='large' type="input" placeholder='Nhập Username' value={username} onChange={(e) => setUsername(e.target.value)} sx={{ width: '40%', fontSize: '16px', fontWeight: 'bold' }} />
                    <TextField size='large' type="input" placeholder='Nhập Email' value={email} onChange={(e) => setEmail(e.target.value)} sx={{ width: '40%', fontSize: '16px', fontWeight: 'bold' }} />
                    <TextField size='small' type="password" placeholder='Nhập Mật Khẩu' value={password} onChange={(e) => setPassword(e.target.value)} sx={{ width: '40%' , fontSize: '16px', fontWeight: 'bold' }} />
                    <TextField size='small' type="password" placeholder='Nhập lại Mật Khẩu' value={repassword} onChange={(e) => setRepassword(e.target.value)} sx={{ width: '40%' , fontSize: '16px', fontWeight: 'bold' }} />
                  </Stack>
                  <Grid container spacing={2}>
                  <Stack spacing={3} sx={{marginLeft: '40%', marginTop: '5%'}}>
                    <Link
                    component="button"
                    variant="body2"
                    onClick={goToLoginPage}
                    >
                    Đã có tài khoản ? Đăng nhập
                  </Link>
                  <Link
                    component="button"
                    variant="body2"
                    // onClick={goToForgotPasswordPage}
                    >
                    Quên mật khẩu
                  </Link>
                  </Stack>
                    <ClassicButton text="Đăng kí" left="41%" right="40%" top="5%" onClick={handleRegister}/>
                  </Grid>
             
                </Box>
                </Container>
    </div>
  );
};

export { Register }; 