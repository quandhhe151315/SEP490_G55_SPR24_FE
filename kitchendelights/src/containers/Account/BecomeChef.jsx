import React, { useState } from 'react';
import AvatarMenu from '../../components/Account/AvatarMenu';
import Appbar from '../../components/Homepage/Appbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import GetInformationJWT from '../../components/JWT/GetInformationJWT';
import { useSnackbar } from '../../components/Snackbar/Snackbar';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { uploadImage } from '../../services/BlogServices';
import { becomeChefAPI } from '../../services/UserServices';
import Cookies from 'js-cookie';

const steps = ['Ảnh căn cước công dân mặt trước', 'Ảnh căn cước công dân mặt sau', 'Ảnh giấy xác nhận mặt trước', 'Ảnh giấy xác nhận mặt sau'];

function BecomeChef() {
    const [id, setId] = useState('');

    const [cardF, setCardF] = useState('');
    const [cardB, setCardB] = useState('');
    const [verificationF, setVerificationF] = useState('');
    const [verificationB, setVerificationB] = useState('');

    const [cardFront, setCardFront] = useState('');
    const [cardBack, setCardBack] = useState('');
    const [verificationFront, setVerificationFront] = useState('');
    const [verificationBack, setVerificationBack] = useState('');

    const stateArray = [
        [cardFront, setCardFront],
        [cardBack, setCardBack],
        [verificationFront, setVerificationFront],
        [verificationBack, setVerificationBack]
      ];

      const [cardFrontDataSend, setCardFrontDataSend] = useState('');
    const [cardBackDataSend, setCardBackDataSend] = useState('');
    const [verificationFrontDataSend, setVerificationFrontDataSend] = useState('');
    const [verificationBackDataSend, setVerificationBackDataSend] = useState('');

      const stateArrayDataSend = [
        [cardFrontDataSend, setCardFrontDataSend, setCardF],
        [cardBackDataSend, setCardBackDataSend, setCardB],
        [verificationFrontDataSend, setVerificationFrontDataSend, setVerificationF],
        [verificationBackDataSend, setVerificationBackDataSend, setVerificationB]
      ];

    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

    // Code có sẵn phần Stepper MUI
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
  
   
    const isStepSkipped = (step) => {
      return skipped.has(step);
    };
  
    const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    //

    const handleImageChange = async (event, set, setData) => {
        const file = event.target.files[0];
        if (file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);
            setData(file);
            set(imageUrl);
            
        }
      };

      const handleCreateVerification = async () => {
          const results = [];
          try {
            for (let i = 0; i < stateArrayDataSend.length; i++) {
              const [state, setState, setData] = stateArrayDataSend[i];
              const res = await uploadImage(state, "avatar");
              results[i] = res;
            }
          } catch (error) {
            
          }
            
         if (results.length !== 4) {
          showSnackbar('Vui lòng chọn đủ 4 ảnh', "error");
            }
            else{  
          try {
            const response = await becomeChefAPI(Cookies.get('userId'), results[0], results[1], results[2], results[3]);
            if (response.status === 200) {
              showSnackbar('Tạo yêu cầu thành công và đang chờ được duyệt!', "success");
              navigate('/MyProfile');
            } else {

            }
          } catch (error) {
            showSnackbar('Tạo yêu cầu thất bại ! Vui lòng thử lại sau', "error");
          }
        }
        
      };

    return (
        <div>
<Appbar />
      <GetInformationJWT setId={setId}/>
      <Box sx={{ display: 'flex' }}>
        <Grid container spacing={2}>
          <Grid item xs={2} sx={{marginLeft: '10%'}}>
            <AvatarMenu />
          </Grid>
          <Grid item xs={7}>

            <Stack spacing={2} sx={{marginTop: '2%'}}>
              <Typography sx={{ fontSize: '30px', fontWeight: 'bold'}}>Trở thành đầu bếp</Typography>
              <Typography sx={{ fontSize: '16px'}}>Đây là nơi bạn tải ảnh nhằm xác thực đầu bếp. Các ảnh bao gồm căn cước công dân 2 mặt (mặc trước, mặt sau). Giấy xác nhận bạn là đầu bếp (mặt trước, mặt sau) hoặc có thể là bất cứ giấy gì có thể chứng minh (giấy xác nhận học nghề, chứng chỉ đầu bếp, kinh nghiệm làm việc, ...)</Typography>
              <Paper sx={{ marginTop: '3%', borderRadius: '15px', border: '1px solid #bfb8b8', width: '100%', height: '100%'}}>

              <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1, color: 'green', textAlign: 'center', fontWeight: 'bold', padding: '5%' }}>
            Gửi xác thực thành công! Vui lòng đợi duyệt
          </Typography>
          
        </React.Fragment>
      ) : (
        <React.Fragment>
           <img src={stateArray[activeStep][0]} alt="Image" style={{width: '100%', height: '10%', overflow: 'hidden', marginTop: '5%'}} />
          <input
                  type="file"
                  accept="image/*"
                  id="upload-feature-image"
                  style={{ display: 'none' }}
                  onChange={(event) => handleImageChange(event, stateArray[activeStep][1], stateArrayDataSend[activeStep][1])}
                />
                          <Button variant="contained"  onClick={() => { document.getElementById('upload-feature-image').click(); }} className="custom-upload-button" sx={{ 
                bgcolor: "#ff5e00", 
                borderRadius: '15px' , 
                width: '20%',
                height: '50%',
                color: 'white',
                marginTop: '4%',
                marginLeft: '40%',
                marginRight: '40%',
            }}>
                            Chọn ảnh
                            </Button>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2,  }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1, marginBottom: '1%', marginLeft: '1%', color: '#ff5e00', fontWeight: 'bold'}}
            >
              Quay lại
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            

            <Button onClick={activeStep === steps.length - 1 ? handleCreateVerification : handleNext} sx={{ display: 'flex', flexDirection: 'row', pt: 2, marginBottom: '1%', marginRight: '1%', color: '#ff5e00', fontWeight: 'bold' }}>
  {activeStep === steps.length - 1 ? 'Gửi' : 'Tiếp'}
</Button>
          </Box>
        </React.Fragment>
      )}
    </Box>

                {/* <Button variant="contained" sx={{ bgcolor: "#ff5e00", marginTop: '5%', borderRadius: '15px', marginLeft: '40%',marginBottom: '5%' , width: '20%', height: '20%', color: 'white' }}>Gửi xác thực</Button> */}
                  
                  
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>

        </div>
    );
}

export default BecomeChef;
