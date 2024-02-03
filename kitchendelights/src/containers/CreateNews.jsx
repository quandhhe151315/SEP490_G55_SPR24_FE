import React from 'react';
import Appbar from '../components/Homepage/Appbar';
import Typography from '@mui/material/Typography';
import AppCreateNews from '../components/Richtext/App.tsx'

function CreateNews() {
  return (
    <div>
        <Appbar />
        <Typography sx={{ marginLeft: '320px', fontSize: '16px', marginRight: '255px'}}>
            <h1> Tin tức > Tạo tin tức mới</h1>
            Đây là những bạn tạo những mẩu tin về chuyên ngành ẩm thực. Nơi mà người dùng có thể nhìn thấy bài viết của bạn.
            
          </Typography>
          <AppCreateNews/>
    </div>
  );
}

export default CreateNews;
