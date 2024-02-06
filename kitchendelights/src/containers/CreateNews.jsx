import React from 'react';
import Appbar from '../components/Homepage/Appbar';
import Typography from '@mui/material/Typography';
import AppCreateNews from '../components/Richtext/App.tsx'

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function CreateNews() {
  return (
    <div>
        <Appbar />
        <Typography sx={{ marginLeft: '320px', fontSize: '16px', marginRight: '255px', marginTop: '50px'}}>
            <Breadcrumbs aria-label="breadcrumb" color="#ff5e00" sx={{fontSize: '30px', fontWeight: 'bold'}}>
              <Link underline="hover" color="#ff5e00" href="/ViewListNews" sx={{fontSize: '30px', fontWeight: 'bold'}}>Tin tức</Link>
              <Typography color="#ff5e00" sx={{fontSize: '30px', fontWeight: 'bold'}}>Tạo tin tức mới</Typography>
            </Breadcrumbs>
            Đây là những bạn tạo những mẩu tin về chuyên ngành ẩm thực. Nơi mà người dùng có thể nhìn thấy bài viết của bạn.
          </Typography>
          <AppCreateNews/>
    </div>
  );
}

export default CreateNews;
