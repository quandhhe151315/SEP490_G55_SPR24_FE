import React, { useState, useEffect } from 'react';
import { Grid, Typography } from "@mui/material";
import { RichTextReadOnly } from "mui-tiptap";
import useExtensions from "../../components/Richtext/useExtension.ts";
import { getNewsById } from '../../services/ApiServices';
import {useParams} from "react-router-dom";
import Appbar from '../../components/Homepage/Appbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const ViewDetailNews = () => {
  const extensions = useExtensions({
    placeholder: "Add your own content here...",
  });
  const [submittedContent, setSubmittedContent] = useState("");
  const params = useParams();
  const [data, setData] = useState('');
  const navigate = useNavigate();

  const getDetailNews = async () => {
      try {
        const id = Number.parseInt(params.id, 10);
        const response = await getNewsById(id);
        if (response.status === 200) {
          setData(response.data);
          setSubmittedContent(response.data.newsContent);
          console.log(response.data.newsContent);
        } else {
          console.error('Can not get news!');
        }
      } catch (error) {
        console.error('Can not load news data!', error);
      }
    };

  useEffect(() => {
    getDetailNews();
  }, []);

  const goToCreateNews = () => {
    navigate('/CreateNews');
  }

  return (
    <div>
      <Appbar />
          
          <Typography sx={{ marginLeft: '280px', fontSize: '16px', marginRight: '255px', marginTop: '50px'}}>
            <Typography color="#ff5e00" sx={{fontSize: '30px', fontWeight: 'bold'}}> Tin tức </Typography>
            Đây là chuyên mục bạn có thể đọc những mẩu tin về chuyên ngành ẩm thực.
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button variant="contained" sx={{ bgcolor: "#ff5e00", marginTop:'20px', borderRadius: '15px', marginLeft: '82%', width: '200px', height: '42px', color: 'white'}} onClick={goToCreateNews}>Tạo tin tức mới</Button>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant='h6' sx={{fontWeight: 'bold', marginTop: '5%'}}>Tác giả: {data.userName}</Typography>
              <Grid container justifyContent="center" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                
                <Typography variant='h4' sx={{color: '#ff5e00', fontWeight: 'bold', marginTop: '5%'}}>{data.newsTitle}</Typography>
                <RichTextReadOnly content={submittedContent} extensions={extensions} />
              </Grid>
            </Box>
          </Typography>
    </div>
  );
}
      


export default ViewDetailNews;
