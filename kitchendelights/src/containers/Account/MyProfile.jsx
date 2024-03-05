import React, { useEffect , useState } from 'react';
import AvatarMenu from '../../components/Account/AvatarMenu';
import Appbar from '../../components/Homepage/Appbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import image1 from '../../assets/images/news1.jpg';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import GetInformationJWT from '../../components/JWT/GetInformationJWT';
import {myProfile} from '../../services/ApiServices'

function MyProfile() {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState('');

  const navigate = useNavigate();
  const goToChangeMyProfile = () => {
    navigate('/ChangeMyProfile');
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    if (id) {
      getInformationProfile();
    }
  }, [id]);

  const getInformationProfile = async () => {
    try {
      const response = await myProfile(id);

      if (response.status === 200) {
        setEmail(response.data?.email);
        setFirstName(response.data?.firstName);
        setMiddleName(response.data?.middleName);
        setLastName(response.data?.lastName);
        setPhoneNumber(response.data?.phone);
        // setAddress(response.data?.addresses);
        setAvatar(response.data?.avatar);
        console.log(response.data);
      } else {
        console.error('Can not get news!');
      }
    } catch (error) {
      console.error('Can not load MyProfile data!', error);
    }
  }

  return (
    <div>
      <Appbar />
      <GetInformationJWT setId={setId}/>
      <Box sx={{ display: 'flex' }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <AvatarMenu />
          </Grid>

          <Grid item xs container direction="column" sx={{ fontSize: '30px', fontWeight: 'bold'}}>
            <Grid item>
              <Typography sx={{ fontSize: '30px', fontWeight: 'bold', marginTop: '20px' }}>Thông tin cá nhân</Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ fontSize: '16px', marginTop: '10px' }}>Đây là nơi hiển thị những thông tin cá nhân</Typography>
            </Grid>

            <Grid container spacing={2}>
            <Paper  item xs={8} sx={{ marginTop: '3%', borderRadius: '15px', border: '1px solid #bfb8b8', width: '77%', height: '100%'}}>
              <Grid container>
                <Grid item xs={8}>
                  <Grid container direction="column">
                    <Grid item xs container direction="row">
                      <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '70px' }}>Email: </Typography>
                      <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '100px' }}>{email} </Typography>
                    </Grid>

                    <Grid item xs container direction="row">
                      <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '70px' }}>Họ và tên: </Typography>
                      <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '70px' }}>{lastName} {middleName} {firstName} </Typography>
                    </Grid>

                    <Grid item xs container direction="row">
                      <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '70px' }}>Mật khẩu: </Typography>
                      <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '73px' }}>******** </Typography>
                    </Grid>

                    <Grid item xs container direction="row">
                      <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '70px' }}>Số điện thoại: </Typography>
                      <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '41px' }}>{phoneNumber} </Typography>
                    </Grid>

                    <Grid item xs container direction="row">
                      <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '70px' }}>Địa chỉ: </Typography>
                      <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '40px', marginLeft: '90px' }}>{address} </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={4}>
                  <Typography sx={{ marginTop: '50px' }}>
                    <img src={image1} alt="Image news" style={{width: '250px', height: '250px', overflow: 'hidden'}}/>
                    <br/>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', marginTop: '10px', marginLeft: '100px' }}>Avatar</Typography>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs container direction="row">
                    <Button variant="contained" sx={{ bgcolor: "#ff5e00", marginTop:'58px', borderRadius: '15px', marginLeft: '370px', width: '180px', height: '42px', color: 'white'}} onClick={goToChangeMyProfile}>Đổi thông tin</Button>
                    </Grid>
            </Paper>
            </Grid>
          </Grid>

        </Grid>
      </Box>


    </div>
  );
}

export default MyProfile;
