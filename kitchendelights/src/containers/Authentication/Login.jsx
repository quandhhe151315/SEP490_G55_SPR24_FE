import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../../assets/css/Login.css'
import { TextField, Grid, Stack, Typography, Box } from '@mui/material';
import {login} from '../../services/ApiServices'
import ClassicButton from '../../components/Button/ClassicButton';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { useSnackbar } from '../../components/Snackbar/Snackbar';
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const goToHomePage = () => {
    navigate('/');
  }

  const goToDashboard = () => {
    navigate('/KitchenDelights');
  }

  const goToRegisterPage = () => {
    navigate('/Register');
  }

  const goToForgotPasswordPage = () => {
    navigate('/ForgotPassword');
  }

  const handleLogin = async () => {
    if (password === '' || email === '') {
      showSnackbar('Không được để trống username, email hoặc mật khẩu !', "error");
    } else if (password.length > 5) {
      try {
        const response = await login(email, password);
        if (response.status === 200) {
          Cookies.set('jwt', response.data, { expires: 7 });
          showSnackbar('Login successful!', "success");
          goToHomePage();
        } else {
          
        }
      } catch (error) {
          showSnackbar('Tài khoản hoặc mật khẩu không đúng!', "error");
      }
    }
  };

  return (
    <div>
         <Container fixed>
        <Box>
                <Grid container spacing={2}>
                <Typography sx={{ fontSize: '32px', marginTop: '10%',marginLeft: '40%',marginRight: '40%', }}>Đăng nhập </Typography>
                  </Grid>
                
                  <Stack spacing={3} sx={{marginLeft: '35%', marginTop: '5%'}}>
                    <TextField size='large' type="input" placeholder='Nhập Email' value={email} onChange={(e) => setEmail(e.target.value)} sx={{ width: '40%', fontSize: '16px', fontWeight: 'bold' }} />
                    <TextField size='small' type="password" placeholder='Nhập Mật Khẩu' value={password} onChange={(e) => setPassword(e.target.value)} sx={{ width: '40%' , fontSize: '16px', fontWeight: 'bold' }} />
                  
                  </Stack>
                  <Grid container spacing={2}>
                  <Stack spacing={3} sx={{marginLeft: '38%', marginTop: '5%'}}>
                    <Link
                    component="button"
                    variant="body2"
                    onClick={goToRegisterPage}
                    >
                    Chưa có mật khẩu ? Đăng kí tài khoản
                  </Link>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={goToForgotPasswordPage}
                    >
                    Quên mật khẩu
                  </Link>
                  </Stack>
                    <ClassicButton text="Đăng nhập" left="41%" right="40%" top="5%" onClick={handleLogin} bot="8%"/>
                  </Grid>
             
                </Box>
                </Container>
    </div>
  );
};

export { Login }; 