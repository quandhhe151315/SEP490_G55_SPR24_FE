import React, { createContext, useContext, useState } from 'react';
import Appbar from '../../components/Homepage/Appbar.jsx';
import Typography from '@mui/material/Typography';
import AppCreateNews from '../../components/Richtext/App.tsx'
import { useNavigate } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { createNews } from '../../services/ApiServices.jsx';
import Cookies from 'js-cookie';

function CreateNews() {
  const [newsContent, setNewsContent] = useState('');
  const [newsTitle, setNewsTitle] = useState('');
  const navigate = useNavigate();

  const handleTextFieldChange = (event) => {
    setNewsTitle(event.target.value);
  };

  const goToNews = () => {
    navigate('/ViewListNews');
  }

  const handleCreateNews = async () => {
    try {
      // Cookies.get('username')
      const response = await createNews(Cookies.get('userId'), 'userName', newsTitle, newsContent);
      if (response.status === 200) {
        console.log('Create news successful! ');
      } else {
        console.error('Can not create news! ');
      }
    } catch (error) {
      console.error('Create news error:', error);
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
          <Typography sx={{ color: '#ff5e00', fontWeight: 'bold', marginLeft: '320px', fontSize: '20px', marginRight: '255px', marginTop: '50px'}}>
            Tiêu đề *
          </Typography>
          <TextField
            required
            id="outlined-required"
            value={newsTitle}
            sx={{marginLeft: '340px', marginTop: '20px', width: '1207px'}}
            InputProps={{
              sx: {
                borderRadius: '15px',
              },
            }}  
            onChange={handleTextFieldChange}
          />
          <Typography sx={{ color: '#ff5e00', fontWeight: 'bold', marginLeft: '320px', fontSize: '20px', marginRight: '255px', marginTop: '50px'}}>
            Nội dung *
          </Typography>
          <AppCreateNews title={newsTitle} setContent={setNewsContent} handleCreateNews={handleCreateNews}/>
    </div>
  );
}

export default CreateNews;
