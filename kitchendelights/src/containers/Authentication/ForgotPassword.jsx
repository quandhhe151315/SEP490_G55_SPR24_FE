import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../../assets/css/Login.css'
import { TextField, Grid, Stack, Typography, Box } from '@mui/material';
import { resetPassword, forgotPassword } from '../../services/UserServices';
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

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [code, setCode] = useState('');

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if (email === '') {
      showSnackbar('Không được để trống email !', "error");
    } else {
      showSnackbar('Vui lòng kiểm tra email của bạn!', "success");
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

  const goToRegisterPage = () => {
    navigate('/Register');
  }

  const handleVerifyEmail = async () => {
    try {
      const response = await resetPassword(email);
      if (response.status === 200) {
      } else {

      }
    } catch (error) {
      showSnackbar('Xác thực thất bại! Vui lòng thử nhập lại email', "error");
    }
  }

  const handleForgotPassword = async () => {
    if(code === '' || password === '' || repassword === ''){
      showSnackbar('Không được để trống code hoặc mật khẩu!', "error");
    }
    else if(password !== repassword){
      showSnackbar('Mật khẩu không trùng khớp với nhập lại mật khẩu!', "error");
    } else if(password.length < 6) {
      showSnackbar('Mật khẩu phải dài hơn 6 kí tự!', "error");
    } else {
      try {
        const response = await forgotPassword(email, password, code);
        if (response.status === 200) {
          goToLoginPage();
          showSnackbar('Đổi mật khẩu thành công!', "success");
        } else {

        }
      } catch (error) {
        showSnackbar('Đổi mật khẩu thất bại. Vui lòng nhập đúng code !', "error");
      }
    }
      
  };
  
  return (
    <div>
         <Container fixed>
        <Box>
                <Grid container spacing={2}>
                <Typography sx={{ fontSize: '32px', marginTop: '10%',marginLeft: '37%',marginRight: '35%', }}>Quên mật khẩu</Typography>
                  </Grid>
                
                  <Stack spacing={3} sx={{marginLeft: '35%', marginTop: '5%'}}>
                    <TextField  required size='large' type="input" placeholder='Nhập Email' value={email} onChange={(e) => setEmail(e.target.value)} sx={{ width: '40%', fontSize: '16px', fontWeight: 'bold' }} />
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
                    onClick={goToRegisterPage}
                    >
                    Chưa có tài khoản ? Đăng kí
                  </Link>
                  </Stack>
                    <ClassicButton text="Gửi" left="41%" right="40%" top="5%" onClick={handleClickOpen}/>
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
            Vui lòng nhập code vừa được gửi tới email của bạn và mật khẩu mới
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
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Nhập mật khẩu mới"
            type="name"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Nhập lại mật khẩu mới"
            type="name"
            fullWidth
            variant="standard"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleForgotPassword}>Đổi mật khẩu</Button>
        </DialogActions>
            </Dialog>
    </div>
  );
};

export { ForgotPassword }; 