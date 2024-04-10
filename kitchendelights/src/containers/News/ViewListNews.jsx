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
import { listNews } from '../../services/ApiServices';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Cookies from 'js-cookie';
import { searchNews } from '../../services/NewsService';
import { listNewsUser } from '../../services/NewsService';
import { checkUserFullNameExist } from '../../components/JWT/CheckValidate';
import { useSnackbar } from '../../components/Snackbar/Snackbar.jsx';

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

function ViewListNews() {
  const [data, setData] = useState([]);
  // const [page, setPage] = useState(0);
  // const [isForwardPage, setIsForwardPage] = useState(true);
  // const [isNextPage, setIsNextPage] = useState(false);

  const [searchText, setSearchText] = useState('');
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const role = Cookies.get('role');

  const getAllListNews = async () => {
    try {
      const response = await listNewsUser();
      if (response.status === 200) {
        setData(response.data);
      } else {

      }
    } catch (error) {
      console.error('Can not load news data!', error);
    }
  };

  useEffect(() => {
    checkUserFullNameExist();
    if (searchText === '') {
      getAllListNews();
    } else {
      SearchNews();
    }
  }, [searchText]);
  
  const SearchNews = async () => {
    try {
      const response = await searchNews(searchText);
      if (response.status === 200) {
        setData(response.data);
      } else {
        console.error('Can not get news!');
      }
    } catch (error) {
      console.error('Can not load news data!', error);
    }
  }
  const goToCreateNews = () => {
    if(Cookies.get('userFullname') !== ''){
      navigate('/CreateNews');
    } else{
      showSnackbar('Vui lòng thêm họ tên ở trang thông tin cá nhân để tiếp tục và thử lại !', "error");
    }
  }

  const viewDetailNews = (id) => {
    navigate(`/ViewDetailNews/${id}`);
  }

  // const getNextNewsPage = () => {
  //   if(data[page + 6].newsId >= data.length){
  //     setIsForwardPage(false);
  //     setIsNextPage(true);
  //   }
  //   setPage(page + 6);
  // }

  // const getForwardNewsPage = () => {
  //   if(data[page - 6].newsId <= data.length || page === 0){
  //     setIsForwardPage(true);
  //     setIsNextPage(false);
  //   }
  //   setPage(page - 6);
  // }

  return (
    <div>
        <Appbar />
          <Typography sx={{ marginLeft: '280px', fontSize: '16px', marginRight: '255px', marginTop: '50px'}}>
            <Typography color="#ff5e00" sx={{fontSize: '30px', fontWeight: 'bold'}}> Tin tức </Typography>
            Đây là chuyên mục bạn có thể đọc những mẩu tin về chuyên ngành ẩm thực.
            
            <Box>
              <Grid container spacing={15}>
                <Grid xs={4}>
                  <DisplaySearchNews >
                  <DisplayStyledInputBase
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Tìm tin tức bạn muốn"
                    inputProps={{ 'aria-label': 'search' }}
                    sx={{ color: "rgba(0, 0, 0, 0.54)" }}
                  />
                  <SearchIcon 
                  sx={{ bgcolor: "#ff5e00", borderRadius: '15px', marginLeft: '16px', width: '48px', height: '42px', color: 'white'}}
                  onClick = {SearchNews}
                  />
                  </DisplaySearchNews>
                </Grid>

                <Grid xs={4}>
                
                </Grid>

                <Grid xs={4}>
                {(role === "Writer" || role === "Administrator" || role === "Moderator" ) && (

                <Button variant="contained" sx={{ bgcolor: "#ff5e00", marginTop:'20px', borderRadius: '15px', width: '100%', height: '42px', color: 'white'}} onClick={goToCreateNews}>Tạo tin tức mới</Button>
                  )}

                </Grid>

              </Grid>
            </Box>          
                <Box sx={{marginTop: '2%', marginBottom: '2%'}}>
                <Grid container spacing={3}>
                  {data.map((item) => {
                    return (
                      <Grid item lg={3} md={6} xs={12}>
                        <Card sx={{ maxWidth: 345 }} onClick={() => {viewDetailNews(item.newsId)}}>
                          <CardMedia
                            component={"img"}
                            height={240}
                            image={item.featuredImage}
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                textAlign: "center",
                                fontSize: '18px',
                                fontWeight: 'bold',
                                height: '80px',
                              }}
                              gutterBottom
                              component="div"
                            >
                              {item.newsTitle}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>


            {/* <Typography sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
              <Button variant="contained" disabled={isForwardPage} sx={{ bgcolor: "#ff5e00", borderRadius: '15px', width: '150px', height: '42px', color: 'white'}} startIcon={<ForwardIcon sx={{transform: 'rotate(180deg)'}}/>}  onClick={getForwardNewsPage}>Forward</Button>
              <Button variant="contained" disabled={isNextPage} sx={{ bgcolor: "#ff5e00", borderRadius: '15px', width: '150px', height: '42px', color: 'white', marginRight: '2%'}} endIcon={<ForwardIcon/>} onClick={getNextNewsPage}> Next</Button>
            </Typography> */}
          </Typography>
    </div>
  );
}

export default ViewListNews;
