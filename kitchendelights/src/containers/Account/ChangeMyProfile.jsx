import React, { useState, useEffect } from 'react';
import AvatarMenu from '../../components/Account/AvatarMenu';
import Appbar from '../../components/Homepage/Appbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import UploadAvatar from '../../components/UploadAvatar/UploadAvatar';
import GetInformationJWT from '../../components/JWT/GetInformationJWT';
import { useSnackbar } from '../../components/Snackbar/Snackbar';
import { myProfile, changeMyProfile } from '../../services/ApiServices';

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
    const [openDialog, setOpenDialog] = useState(false);
    const [avatarImage, setAvatarImage] = useState(null);
    const [newAvatarImage, setNewAvatarImage] = useState(null);

    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

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
      if (firstName === '' || middleName === '' || lastName === '') {
        showSnackbar('Không được để trống tên !', "error");
      } else {
        try {
          const response = await changeMyProfile(id, email, firstName, middleName, lastName, phone, address, avatarImage, status, role);
          if (response.status === 200) {
            showSnackbar('Change profile successful!', "success");
            navigate('/ChangeMyProfile');
          } else {
            console.error('Your information is not change! ');
          }
        } catch (error) {
            showSnackbar('Change profile failed!', 'error');
          console.error('Change error:', error);
        }
      }
      };
      

    return (
        <div>
<Appbar />
      <GetInformationJWT setId={setId}/>
      <Box sx={{ display: 'flex' }}>
        <Grid container spacing={2}>
          <Grid item xs={2} sx={{ marginLeft: "10%" }}>
            <AvatarMenu />
          </Grid>
          <Grid item xs={7}>

            <Stack spacing={2} sx={{marginTop: '2%', marginLeft: '1%'}}>
              <Typography sx={{ fontSize: '30px', fontWeight: 'bold'}}>Chỉnh sửa thông tin cá nhân</Typography>
              <Typography sx={{ fontSize: '16px'}}>Đây là nơi chỉnh sửa những thông tin cá nhân của bạn</Typography>
              <Paper sx={{ marginTop: '3%', borderRadius: '15px', border: '1px solid #bfb8b8', width: '100%', height: '100%'}}>
                
                  <Grid container spacing={2}>

                    <Grid item xs={3}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '20%', marginLeft: '40%' }}>Email: </Typography>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '30%', marginLeft: '40%' }}>Họ và tên: </Typography>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '30%', marginLeft: '40%' }}>Mật khẩu: </Typography>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '30%', marginLeft: '40%' }}>Số điện thoại: </Typography>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '30%', marginLeft: '40%' }}>Địa chỉ: </Typography>
                    </Grid>

                    <Grid item xs={5}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '12%'}}>{email} </Typography>

                    <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '55%'}}>Họ: <TextField size='small' type="input" value={lastName} onChange={(e) => setLastName(e.target.value)} sx={{ width: '55%', fontSize: '16px', fontWeight: 'bold' }} /></Typography>
                        </Grid>
                        <Grid item xs={4}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '55%'}}>Đệm: <TextField size='small' type="input" value={middleName} onChange={(e) => setMiddleName(e.target.value)} sx={{ width: '55%', fontSize: '16px', fontWeight: 'bold' }} /></Typography>
                        </Grid>
                        <Grid item xs={4}>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '55%'}}>Tên: <TextField size='small' type="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} sx={{ width: '55%', fontSize: '16px', fontWeight: 'bold' }} /></Typography>
                        </Grid>
                    </Grid>

                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '15%'}}>******** </Typography>
                    <TextField size='small' type="input" disabled value={phone} onChange={(e) => setPhone(e.target.value)} sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '15%'}} />
                    <TextField size='small' type="input" disabled value={address} onChange={(e) => setAddress(e.target.value)} sx={{  fontSize: '16px', fontWeight: 'bold', marginTop: '13%' }} />
                    </Grid>

                    <Grid item xs={4}>
                    <Typography sx={{marginTop: '50px' }}>
                                    <img src={avatarImage} alt="Image news" style={{width: '80%', height: '80%', overflow: 'hidden', marginRight: '2%' }} />
                                        <br />
                                        <Button variant="contained" onClick={handleOpenDialog} sx={{bgcolor: "#ff5e00", borderRadius: '15px', marginLeft: '17%', marginTop: '5%' ,width: '50%', height: '20%', color: 'white' }}>Đổi Avatar</Button>
                                        <Grid item xs container direction="row">
                                        </Grid>
                                    </Typography>
                    </Grid>

                    
                    <Button variant="contained" onClick={changeProfile} sx={{ bgcolor: "#ff5e00", marginTop: '5%', borderRadius: '15px', marginLeft: '40%',marginBottom: '5%' , width: '20%', height: '20%', color: 'white' }}>Đổi thông tin</Button>
                  </Grid>
                
              </Paper>
            </Stack>
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
