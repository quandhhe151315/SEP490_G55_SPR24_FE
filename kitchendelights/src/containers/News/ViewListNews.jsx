import React, { useEffect , useContext, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Appbar from '../../components/Homepage/Appbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import image1 from '../../assets/images/news1.jpg';
import ForwardIcon from '@mui/icons-material/Forward';
import { listNews ,getNewsById } from '../../services/ApiServices';

const DisplaySearchNews = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  border: '2px solid gray',
  marginTop: 20,
  borderRadius: '15px',
  [theme.breakpoints.up('sm')]: {
    width: 280,
    height: 40,
  },
}));

const DisplayStyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(0, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    width: 'calc(100% - 48px)',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      marginTop: '2ch',
    },
  },
}));

const DisplayItemNews = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  marginTop: '30px',
}));


function ViewListNews() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [isForwardPage, setIsForwardPage] = useState(true);
  const [isNextPage, setIsNextPage] = useState(false);

  const navigate = useNavigate();

  // const getNewsById = async (id) => {
  //   try {
  //     const response = await getNewsById(1);

  //     if (response.status === 200) {
  //       setData(response.data);
  //       console.log(response.data);
  //     } else {
  //       console.error('Can not get news!');
  //     }
  //   } catch (error) {
  //     console.error('Can not load news data!', error);
  //   }
  // };

  const getAllListNews = async () => {
    try {
      const response = await listNews();
      if (response.status === 200) {
        setData(response.data);
        console.log('Load news successful! ');
      } else {
        console.error('Can not Load news! ');
      }
    } catch (error) {
      console.error('Can not load news data!', error);
    }
  };

  useEffect(() => {
    getAllListNews();
  }, []);
  
  const SearchNews = () => {
    navigate('/KitchenDelights');
  }
  const goToCreateNews = () => {
    navigate('/CreateNews');
  }

  const viewDetailNews = (id) => {
    navigate(`/ViewDetailNews/${id}`);
  }

  const getNextNewsPage = () => {
    if(data[page + 6].newsId >= data.length){
      setIsForwardPage(false);
      setIsNextPage(true);
    }
    setPage(page + 6);
  }

  const getForwardNewsPage = () => {
    if(data[page - 6].newsId <= data.length || page === 0){
      setIsForwardPage(true);
      setIsNextPage(false);
    }
    setPage(page - 6);
  }

  return (
    <div>
        <Appbar />
          
          <Typography sx={{ marginLeft: '280px', fontSize: '16px', marginRight: '255px', marginTop: '50px'}}>
            <Typography color="#ff5e00" sx={{fontSize: '30px', fontWeight: 'bold'}}> Tin tức </Typography>
            Đây là chuyên mục bạn có thể đọc những mẩu tin về chuyên ngành ẩm thực.
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DisplaySearchNews >
              <DisplayStyledInputBase
                placeholder="Tìm tin tức bạn muốn"
                inputProps={{ 'aria-label': 'search' }}
                sx={{ color: "rgba(0, 0, 0, 0.54)" }}
              />
              <SearchIcon 
              sx={{ bgcolor: "#ff5e00", borderRadius: '15px', marginLeft: '16px', width: '48px', height: '42px', color: 'white'}}
              onClick = {SearchNews}
              />
              </DisplaySearchNews>
              <Button variant="contained" sx={{ bgcolor: "#ff5e00", marginTop:'20px', borderRadius: '15px', marginLeft: '62%', width: '200px', height: '42px', color: 'white'}} onClick={goToCreateNews}>Tạo tin tức mới</Button>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {Array.from(Array(6)).map((_, index) => {
              const nextIndex = index + page;
              if (nextIndex >= data.length || data[nextIndex] === null) {
                return null;
              }

              const nextNews = data[nextIndex];

              return (
                <Grid xs={4} sm={4} md={4} lg={4} key={nextNews.newsId} sx={{width: '50%'}} onClick={() => viewDetailNews(nextNews.newsId)}>
                  <DisplayItemNews sx={{ width: 400, height: 400 }} >
                    <img src={image1} alt="Image news"/>
                    <br/>
                    <Typography sx={{fontSize: '16px', color: 'black' }}>
                      <h2>{nextNews?.newsTitle}</h2>
                    </Typography>
                  </DisplayItemNews>
                </Grid>
              );
            })}

              </Grid>
            </Box>

            <Typography sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
              <Button variant="contained" disabled={isForwardPage} sx={{ bgcolor: "#ff5e00", borderRadius: '15px', width: '150px', height: '42px', color: 'white'}} startIcon={<ForwardIcon sx={{transform: 'rotate(180deg)'}}/>}  onClick={getForwardNewsPage}>Forward</Button>
              <Button variant="contained" disabled={isNextPage} sx={{ bgcolor: "#ff5e00", borderRadius: '15px', width: '150px', height: '42px', color: 'white', marginRight: '2%'}} endIcon={<ForwardIcon/>} onClick={getNextNewsPage}> Next</Button>
            </Typography>
          </Typography>
    </div>
  );
}

export default ViewListNews;
