import React from 'react';
import '../../assets/css/Login.css'
import { Typography } from '@mui/material';

const DenyAccess = () => {
  return (
    <div>
        <Typography sx={{color: '#00ccff' ,fontSize: '32px', textAlign: 'center', padding: '15%'}}>Bạn không có quyền truy cập</Typography>
    </div>
  );
};

export { DenyAccess }; 