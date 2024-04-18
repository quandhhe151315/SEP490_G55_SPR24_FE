import React, { useEffect , useState } from 'react';
import DashboardMenu from '../../components/Dashboard/Menu/DashboardMenu'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { listNews } from '../../services/ApiServices';
import DoneIcon from '@mui/icons-material/Done';
import { deleteNews, acceptNews } from '../../services/NewsService';
import { useSnackbar } from '../../components/Snackbar/Snackbar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CardMedia from "@mui/material/CardMedia";
export default function ListNews() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const { showSnackbar } = useSnackbar();

  const [open, setOpen] = React.useState(false);

  const [newsId, setNewsId] = useState();

  const handleClickOpen = (id) => {
    setNewsId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewDetailNews = (idView) => {
    navigate(`/ViewDetailNews/${idView}`);
  }

    const getListUser = async () => {
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
    }

    useEffect(() => {
      getListUser();
      setRows(data.map(item => ({
        id: item.newsId,
        userName: item.userName,
        featuredImage: item.featuredImage,
        newsTitle: item.newsTitle,
        createDate: item.createDate,
        newsStatus: item.newsStatus,
    })));
}, [data]);

    const handleAcceptNews = async (id) => {
      try {
        const response = await acceptNews(id);
        if (response.status === 200) {
          showSnackbar('Duyệt tin tức thành công!', "success");
        } else {

        }
      } catch (error) {
        showSnackbar('Duyệt tin tức không thành công!', "error");
      }
      };

      const handleDeleteNews = async () => {
        try {
          const response = await deleteNews(newsId);
          if (response.status === 200) {
            handleClose();
            showSnackbar('Xóa tin tức thành công!', "success");
          } else {

          }
        } catch (error) {
          showSnackbar('Xóa tin tức không thành công!', "error");
        }
      };

    const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'userName', headerName: 'Tác giả', width: 300, sortable: false },
    // { field: 'featuredImage', headerName: 'Ảnh', width: 300, sortable: false },
    { field: 'featuredImage', headerName: 'Ảnh', width: 150, sortable: false,
    renderCell: (params) => (
        <div>
        <Button
            variant="outlined"
            startIcon={<VisibilityIcon sx={{marginLeft: '10px'}}/>}
            onClick={() => handleViewImage(params.row.featuredImage)}
            sx={{height: '37px'}}
        >
        </Button>
        </div>
        ),
      },
    { field: 'newsTitle', headerName: 'Tiêu đề', width: 650, sortable: false },
    { field: 'createDate', headerName: 'Ngày tạo', width: 110, sortable: false },
    {
      field: 'newsStatus',
      headerName: 'Trạng thái',
      width: 120,
      sortable: false,
        renderCell: (params) => (
            <div style={{ color: params.row.newsStatus === 1 ? 'green' : 'red' }}>
                {params.row.newsStatus === 1 ? 'Xuất bản' : 'Chờ duyệt'}
            </div>
        ),
    },
    {
        field: 'action',
        headerName: 'Hành động',
        width: 250,
        renderCell: (params) => (
            <div>
            <Button
                variant="outlined"
                startIcon={<VisibilityIcon sx={{marginLeft: '10px'}}/>}
                onClick={() => handleViewDetailNews(params.row.id)}
                sx={{height: '37px'}}
            >
            </Button>
            <Button variant="outlined" color="error" sx={{marginLeft: '5%'}} onClick={() => handleClickOpen(params.row.id)}>
            Xóa
            </Button>

            {params.row.newsStatus === 1 ? (
            <Button
            variant="outlined"
            disabled
            startIcon={<DoneIcon sx={{marginLeft: '10px'}}/>}
            onClick={() => handleAcceptNews(params.row.id)}
            sx={{height: '37px', marginLeft: '5%'}}
        >
        </Button>
          ) : (
            <Button
                variant="outlined"
                startIcon={<DoneIcon sx={{marginLeft: '10px'}}/>}
                onClick={() => handleAcceptNews(params.row.id)}
                sx={{height: '37px', marginLeft: '5%'}}
            >
            </Button>
          )}
            
            </div>
        ),
      },
  ];

  const [openImage, setOpenImage] = useState(false);
  const [imageToShow, setImageToShow] = useState('');

  const handleCloseDialogImage = () => {
    setOpenImage(false);
  };
      const handleViewImage = (image) => {
        setImageToShow(image);
        setOpenImage(true);
        
        };

  return (
    <div>
        <Box>
            <Box sx={{ display: 'flex', marginBottom: '6%' }}>
                
                <DashboardMenu dashboardTitle={"Quản lý tin tức"}/>
                <DataGrid
                    sx={{marginTop: '64px'}}
                    rows={rows}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    }}
                    pageSizeOptions={[5, 10]}
                    
                />
                
            </Box>
            <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Bạn có chắc muốn xóa tin tức này?"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Sau khi xóa sẽ không thể khôi phục lại được. Nhấn "Xóa" để xóa tin tức hoặc nhấn "Hủy"
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button color="error" onClick={handleDeleteNews}>Xóa</Button>
                    <Button onClick={handleClose} autoFocus>
                        Hủy
                    </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
        open={openImage}
        onClose={handleCloseDialogImage}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            // setNewMarketplaceName(formJson.name);

            handleCloseDialogImage();
          },
        }}
      >
        <DialogTitle>Chi tiết ảnh</DialogTitle>
        <DialogContent>
        <CardMedia
                            component={"img"}
                            height={300}
                            image={imageToShow}
                            alt="green iguana"
                          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogImage}>Xong</Button>

        </DialogActions>
            </Dialog>
        </Box>
    </div>
  )
}
