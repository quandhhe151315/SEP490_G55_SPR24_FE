import React, { useEffect , useState } from 'react';
import DashboardMenu from '../../components/Dashboard/Menu/DashboardMenu'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import ClassicButton from '../../components/Button/ClassicButton'
import { createAccount } from '../../services/UserServices';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from '../../components/Snackbar/Snackbar';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CreateAccount() {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState(9);

  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const goToListAccount = () => {
    navigate("/ListAccount");
  }

  //statusId: 1 là active, 2 là banned, 3 là deleted
  const handleCreateAccount = async () => {
    if (password === '' || role === 9 || email === '') {
      showSnackbar('Không được để trống email, password hoặc role !', "error");
    } else if (password.length < 6) {
      showSnackbar('Mật khẩu phải dài hơn 6 kí tự!', "error");
    } else {
      try {
        const response = await createAccount(userName,firstName,middleName,lastName,email,phone,password,"Avatar Default",1,role);
        if (response.status === 200) {
          goToListAccount();
          showSnackbar('Tạo tài khoản thành công !', "success");
        } else {

        }
      } catch (error) {
        showSnackbar('Tạo tài khoản thất bại ! Vui lòng thử lại', "error");
      }
    }
  };

  return (
    <div>
        <Box sx={{ display: 'flex' }}>
        <DashboardMenu dashboardTitle={"Tạo tài khoản mới"}/>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            display: 'flex', 
          }}
        >
                <Paper sx={{display: 'flex', width: '100%'}}>

                <Grid container>
            
                <Grid item xs={5}>
                  
                    <Stack spacing={3} sx={{marginLeft: '70%', marginTop: '32%'}}>
                    
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold',  marginLeft: '40%' }}>Email: </Typography>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold',  marginLeft: '40%' }}>Username: </Typography>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold',  marginLeft: '40%' }}>Mật khẩu: </Typography>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold',  marginLeft: '40%' }}>Tên Họ: </Typography>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold',  marginLeft: '40%' }}>Tên Đệm: </Typography>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold',  marginLeft: '40%' }}>Tên : </Typography>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold',  marginLeft: '40%' }}>Số điện thoại: </Typography>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold',  marginLeft: '40%' }}>Địa chỉ: </Typography>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold',  marginLeft: '40%' }}>Role: </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={4}>
                    <Stack spacing={1} sx={{marginTop: '38%'}}>
                      <TextField size='small' type="input" placeholder='Nhập Email' value={email} onChange={(e) => setEmail(e.target.value)} sx={{ width: '40%', fontSize: '16px', fontWeight: 'bold' }} />
                      <TextField size='small' type="input" placeholder='Nhập Username' value={userName} onChange={(e) => setUserName(e.target.value)} sx={{ width: '40%' , fontSize: '16px', fontWeight: 'bold' }} />
                      <TextField size='small' type="input" placeholder='Nhập Mật khẩu' value={password} onChange={(e) => setPassword(e.target.value)} sx={{ width: '40%',  fontSize: '16px', fontWeight: 'bold' }} />
                      <TextField size='small' type="input" placeholder='Nhập Họ' value={lastName} onChange={(e) => setLastName(e.target.value)} sx={{ width: '40%',  fontSize: '16px', fontWeight: 'bold' }} />
                      <TextField size='small' type="input" placeholder='Nhập Đệm' value={middleName} onChange={(e) => setMiddleName(e.target.value)} sx={{ width: '40%', fontSize: '16px', fontWeight: 'bold' }} />
                      <TextField size='small' type="input" placeholder='Nhập Tên' value={firstName} onChange={(e) => setFirstName(e.target.value)} sx={{ width: '40%',  fontSize: '16px', fontWeight: 'bold' }} />
                      <TextField size='small' type="input" placeholder='Nhập Số điện thoại' value={phone} onChange={(e) => setPhone(e.target.value)} sx={{ width: '40%',  fontSize: '16px', fontWeight: 'bold' }} />
                      <TextField size='small' type="input" placeholder='Nhập Địa chỉ' value={address} onChange={(e) => setAddress(e.target.value)} sx={{ width: '40%',  fontSize: '16px', fontWeight: 'bold' }} />
                      <FormControl size="small">
                      <InputLabel id="demo-select-small-label">Role</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={role}
                          label="Role"
                          onChange={handleRoleChange}
                          sx={{width: '40%'}}
                        >
                          <MenuItem value={5}>User</MenuItem>
                          <MenuItem value={4}>Chef</MenuItem>
                          <MenuItem value={3}>Writer</MenuItem>
                          <MenuItem value={2}>Moderator</MenuItem>
                          <MenuItem value={1}>Admin</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>
                    <ClassicButton text="Tạo tài khoản mới" top="10%" onClick={handleCreateAccount}/>
                  </Grid>
                  
                </Grid>
                </Paper>
       
          </Box>
        </Box>
    </div>
  )
}
