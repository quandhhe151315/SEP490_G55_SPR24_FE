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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { verifyEmailAPI } from '../../services/UserServices';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

  const [code, setCode] = useState('');
  const [codeValid, setCodeValid] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if (password === '' || username === '') {
      showSnackbar('Không được để trống username hoặc mật khẩu!', "error");
    } else if (repassword !== password) {
      showSnackbar('Nhập lại mật khẩu không trùng khớp với mật khẩu!', "error");
    } else {
      showSnackbar('Vui lòng kiểm tra email!', "success");
      handleVerifyEmail();
      setOpen(true);
    }
  };
  

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const goToLoginPage = () => {
    navigate('/Login');
  }

  const goToForgotPasswordPage = () => {
    navigate('/ForgotPassword');
  }

  const handleVerifyEmail = async () => {
    try {
      const response = await verifyEmailAPI(email);
      if (response.status === 200) {
        setCodeValid(response.data);
      } else {

      }
    } catch (error) {
      showSnackbar('Xác thực thất bại! Vui lòng thử lại', "error");
    }
  }

  const handleRegister = async () => {
    if(code !== codeValid){
      showSnackbar('Code không chính xác!', "error");
    } else {
      try {
        const response = await register(username, email, password);
        if (response.status === 200) {
          goToLoginPage();
          showSnackbar('Đăng kí tài khoản thành công!', "success");
        } else {

        }
      } catch (error) {
        showSnackbar('Đăng kí tài khoản thất bại!', "error");
      }
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
                    <TextField  isRequired size='large' type="input" placeholder='Nhập Username' value={username} onChange={(e) => setUsername(e.target.value)} sx={{ width: '40%', fontSize: '16px', fontWeight: 'bold' }} />
                    <TextField  required size='large' type="input" placeholder='Nhập Email' value={email} onChange={(e) => setEmail(e.target.value)} sx={{ width: '40%', fontSize: '16px', fontWeight: 'bold' }} />
                    <TextField  required size='small' type="password" placeholder='Nhập Mật Khẩu' value={password} onChange={(e) => setPassword(e.target.value)} sx={{ width: '40%' , fontSize: '16px', fontWeight: 'bold' }} />
                    <TextField  required size='small' type="password" placeholder='Nhập lại Mật Khẩu' value={repassword} onChange={(e) => setRepassword(e.target.value)} sx={{ width: '40%' , fontSize: '16px', fontWeight: 'bold' }} />
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
                    <ClassicButton text="Đăng kí" left="41%" right="40%" top="5%" onClick={handleClickOpen}/>
                  </Grid>
             
                </Box>
                </Container>

                <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            // setNewMarketplaceName(formJson.name);

            handleClose();
          },
        }}
      >
        <DialogTitle>Xác thực email</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{marginBottom: '5%'}}>
            Vui lòng nhập code vừa được gửi tới email đăng kí của bạn
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Nhập code"
            type="name"
            fullWidth
            variant="standard"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit" onClick={handleRegister}>Tạo</Button>
        </DialogActions>
            </Dialog>
    </div>
  );
};

export { Register }; 