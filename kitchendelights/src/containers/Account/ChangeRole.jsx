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
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from '../../components/Snackbar/Snackbar';
import { myProfile } from '../../services/ApiServices';
import { changeRole } from '../../services/UserServices';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ChangeRole() {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState('');
  const [role, setRole] = useState(9);
  const { userId } = useParams();

  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const goToListAccount = () => {
    navigate("/ListAccount");
  }

  const getInformationProfile = async () => {
    try {
      const response = await myProfile(userId);

      if (response.status === 200) {
        setEmail(response.data?.email);
        setFirstName(response.data?.firstName);
        setMiddleName(response.data?.middleName);
        setLastName(response.data?.lastName);
        setPhone(response.data?.phone);
        // setAddress(response.data?.addresses);
        setAvatar(response.data?.avatar);

        const roleMapping = {
            "Administrator": 1,
            "Moderator": 2,
            "Writer": 3,
            "Chef": 4,
            //giá trị trả về của roleName là users thay vì User -> nếu lỗi thì có thể thay đổi
            "users": 5
          };
          setRole(roleMapping[response.data.role.roleName]);

      } else {
        console.error('Can not get news!');
      }
    } catch (error) {
      console.error('Can not load MyProfile data!', error);
    }
  }

  //statusId: 1 là active, 2 là banned, 3 là deleted
  const handleChangeRole = async () => {
    try {
      const response = await changeRole(userId,role);
      if (response.status === 200) {
        goToListAccount();
        showSnackbar('Thay đổi role thành công!', "success");
      } else {

      }
    } catch (error) {
      showSnackbar('Thay đổi role thất bại!', "error");
    }
  };

  useEffect(() => {
    getInformationProfile();
  }, []);

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
                      <TextField size='small' type="input" disabled placeholder={email} onChange={(e) => setEmail(e.target.value)} sx={{ width: '40%', fontSize: '16px', fontWeight: 'bold' }} />
                      <TextField size='small' type="input" disabled placeholder={userName} onChange={(e) => setUserName(e.target.value)} sx={{ width: '40%' , fontSize: '16px', fontWeight: 'bold' }} />
                      <TextField size='small' type="input" disabled placeholder={password} onChange={(e) => setPassword(e.target.value)} sx={{ width: '40%',  fontSize: '16px', fontWeight: 'bold' }} />
                      <TextField size='small' type="input" disabled placeholder={lastName} onChange={(e) => setLastName(e.target.value)} sx={{ width: '40%',  fontSize: '16px', fontWeight: 'bold' }} />
                      <TextField size='small' type="input" disabled placeholder={middleName} onChange={(e) => setMiddleName(e.target.value)} sx={{ width: '40%', fontSize: '16px', fontWeight: 'bold' }} />
                      <TextField size='small' type="input" disabled placeholder={firstName} onChange={(e) => setFirstName(e.target.value)} sx={{ width: '40%',  fontSize: '16px', fontWeight: 'bold' }} />
                      <TextField size='small' type="input" disabled placeholder={phone} onChange={(e) => setPhone(e.target.value)} sx={{ width: '40%',  fontSize: '16px', fontWeight: 'bold' }} />
                      <TextField size='small' type="input" disabled placeholder={address} onChange={(e) => setAddress(e.target.value)} sx={{ width: '40%',  fontSize: '16px', fontWeight: 'bold' }} />
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
                          <MenuItem value={1}>Administrator</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>
                    <ClassicButton text="Chỉnh sửa" top="10%" onClick={handleChangeRole}/>
                  </Grid>
                  
                </Grid>
                </Paper>
       
          </Box>
        </Box>
    </div>
  )
}
