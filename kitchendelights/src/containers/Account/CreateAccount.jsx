import React, { useEffect , useState } from 'react';
import DashboardMenu from '../../components/Dashboard/Menu/DashboardMenu'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

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
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState('');
  const [role, setRole] = useState('');

  return (
    <div>
        <Box sx={{ display: 'flex' }}>
        <DashboardMenu/>
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
          <Toolbar />
            <Box xs={12}>
                <Paper sx={{display: 'flex', flexDirection: 'column', width: '170vh  ', marginTop: '70px' }}>
                  <TextField size='small' type="input" placeholder='Nhập Email' value={email} onChange={(e) => setEmail(e.target.value)} sx={{ width: '25%', height: '5%', fontSize: '16px', fontWeight: 'bold', marginLeft: '15%', marginTop: '10%' }} />
                  <TextField size='small' type="input" placeholder='Nhập Username' value={userName} onChange={(e) => setUserName(e.target.value)} sx={{ width: '25%', height: '5%', fontSize: '16px', fontWeight: 'bold', marginLeft: '15%', marginTop: '1%' }} />
                  <TextField size='small' type="input" placeholder='Nhập Họ' value={lastName} onChange={(e) => setLastName(e.target.value)} sx={{ width: '25%', height: '5%', fontSize: '16px', fontWeight: 'bold', marginLeft: '15%', marginTop: '1%' }} />
                  <TextField size='small' type="input" placeholder='Nhập Đệm' value={middleName} onChange={(e) => setMiddleName(e.target.value)} sx={{ width: '25%', height: '5%', fontSize: '16px', fontWeight: 'bold', marginLeft: '15%', marginTop: '1%' }} />
                  <TextField size='small' type="input" placeholder='Nhập Tên' value={firstName} onChange={(e) => setFirstName(e.target.value)} sx={{ width: '25%', height: '5%', fontSize: '16px', fontWeight: 'bold', marginLeft: '15%', marginTop: '1%' }} />
                  <TextField size='small' type="input" placeholder='Nhập Số điện thoại' value={phone} onChange={(e) => setPhone(e.target.value)} sx={{ width: '25%', height: '5%', fontSize: '16px', fontWeight: 'bold', marginLeft: '15%', marginTop: '1%' }} />
                </Paper>
            </Box>
          </Box>
        </Box>
    </div>
  )
}
