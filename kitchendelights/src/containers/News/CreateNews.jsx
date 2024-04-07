import React, { createContext, useContext, useState } from 'react';
import Appbar from '../../components/Homepage/Appbar.jsx';
import Typography from '@mui/material/Typography';
import {AppCreateNews} from '../../components/Richtext/App.tsx'
import { useNavigate } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { createNews } from '../../services/ApiServices.jsx';
import Cookies from 'js-cookie';
import Grid from '@mui/material/Grid';
import { useSnackbar } from '../../components/Snackbar/Snackbar.jsx';
import { uploadImage } from '../../services/BlogServices.jsx';
import { Stack } from '@mui/material';
import { Button } from '@mui/material'

function CreateNews() {
  const [newsContent, setNewsContent] = useState('');
  const [newsTitle, setNewsTitle] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [featuredImageName, setFeaturedImageName] = useState('');

  const handleFeaturesImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      
      setFeaturedImageName(file.name);
      if (file.type.startsWith('image/')) {
        const resFeaturedImage = await uploadImage(file, "news");
        setFeaturedImage(resFeaturedImage);
      } else {
      }
    }
  };

  const goToNews = () => {
    navigate('/ViewListNews');
  }

  const handleCreateNews = async () => {
    if (newsTitle === '' || newsContent === '' || featuredImage === '') {
      showSnackbar('Không được để trống tiêu đề, ảnh giới thiệu hoặc nội dung !', "error");
    } else if (newsTitle.length > 80) {
      showSnackbar('Tiêu đề không được vượt quá 80 kí tự !', "error");
    } else {
      try {
        const response = await createNews(Cookies.get('userId'), newsTitle, newsContent, featuredImage);
        if (response.status === 200) {
          showSnackbar('Tạo thành công và đang chờ được duyệt !', "success");
          goToNews();
        } else {

        }
      } catch (error) {
        showSnackbar('Tạo thất bại !', "error");
      }
    }
    
  };

  
  return (
    <div>
        <Appbar />
        <Typography sx={{ marginLeft: '320px', fontSize: '16px', marginRight: '255px', marginTop: '50px'}}>
            <Breadcrumbs aria-label="breadcrumb" color="#ff5e00" sx={{fontSize: '30px', fontWeight: 'bold'}}>
              <Link underline="hover" color="#ff5e00" onClick={goToNews} sx={{fontSize: '30px', fontWeight: 'bold'}}>Tin tức</Link>
              <Typography color="#ff5e00" sx={{fontSize: '30px', fontWeight: 'bold'}}>Tạo tin tức mới</Typography>
            </Breadcrumbs>
            Đây là những bạn tạo những mẩu tin về chuyên ngành ẩm thực. Nơi mà người dùng có thể nhìn thấy bài viết của bạn.
          </Typography>
          

          <Grid container spacing={2} sx={{marginTop: '2%'}}>
          <Grid item xs={8}>
            <Typography sx={{ color: '#ff5e00', fontWeight: 'bold', fontSize: '20px',marginLeft: '24%'}}>Tiêu đề</Typography>
            <TextField value={newsTitle} onChange={(event) => setNewsTitle(event.target.value)} required id="outlined-required" sx={{ width: '70%',marginLeft: '26%', marginTop: '2%'}} placeholder="Nhập tiêu đề"/>
          </Grid>
          
          <Grid item xs={4}>
            <Typography sx={{color: '#ff5e00', fontWeight: 'bold', fontSize: '20px'}}>
            Ảnh giới thiệu
            </Typography>
                <input
                  type="file"
                  accept="image/*"
                  id="upload-feature-image"
                  style={{ display: 'none' }}
                  onChange={(event) => handleFeaturesImageChange(event)}
                />
                          <Button variant="contained"  onClick={() => { document.getElementById('upload-feature-image').click(); }} className="custom-upload-button" sx={{ 
                bgcolor: "#ff5e00", 
                borderRadius: '15px' , 
                width: '42%',
                height: '50%',
                color: 'white',
                marginTop: '4%'
            }}>
                            {featuredImageName && featuredImageName.length > 39 ?
              `${featuredImageName.slice(0, 25)}...` :
              (featuredImageName || 'Chọn ảnh')}
                            </Button>

              </Grid>
        </Grid>

        <Grid container spacing={2} sx={{marginTop: '2%', marginLeft: '15%'}}>
        <Grid item xs={8}>
          <Typography sx={{ color: '#ff5e00', fontWeight: 'bold', fontSize: '20px', }}>
            Nội dung *
          </Typography>
          <AppCreateNews title={newsTitle} setContent={setNewsContent} handleCreateNews={handleCreateNews}/>
          </Grid>
          </Grid>
    </div>
  );
}

export default CreateNews;
