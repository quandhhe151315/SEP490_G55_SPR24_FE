import React, { useEffect , useState } from 'react';
import DashboardMenu from '../../components/Dashboard/Menu/DashboardMenu'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { listMarketplace, createMarketplace, createIngredient, createIngredientMarketplace } from '../../services/MarketPlaceService';
import { useSnackbar } from '../../components/Snackbar/Snackbar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { uploadImage } from '../../services/BlogServices';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '@mui/material/Grid';
import ListIngredientMarketplace from '../../components/IngredientMarketplace/ListIngredientMarketplace';
import Autocomplete from '@mui/material/Autocomplete';
import { getAllIngredient } from '../../services/RecipeServices';

export default function MarketplaceManagement() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [newMarketplaceName, setNewMarketplaceName] = useState('');
  const [newMarketplaceLogo, setNewMarketplaceLogo] = useState('');
  const [newMarketplaceLogoName, setNewMarketplaceLogoName] = useState('');

  const [dataIngredients, setDataIngredients] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openCreateIngredient, setOpenCreateIngredient] = React.useState(false);
  const [newIngredient, setNewIngredient] = useState('');
  const handleClickOpenCreateIngredient = () => {
    setOpenCreateIngredient(true);
  };

  const handleCloseCreateIngredient = () => {
    setOpenCreateIngredient(false);
  };

  const { showSnackbar } = useSnackbar();

    const getListMarketplace = async () => {
      try {
        const response = await listMarketplace();
        if (response.status === 200) {
          setData(response.data);
        } else {

        }
      } catch (error) {
        console.error('Can not load news data!', error);
      }
    }

    const getListIngredient = async () => {
      try {
        const response = await getAllIngredient();
        if (response.status === 200) {
          setDataIngredients(response.data);
        } else {
          console.error('Can not Load news! ');
        }
      } catch (error) {
        console.error('Can not load news data!', error);
      }
    };

    useEffect(() => {
      getListIngredient();
        getListMarketplace();
      setRows(data.map(item => ({
        id: item.marketplaceId,
        marketplaceName: item.marketplaceName,
        marketplaceLogo: item.marketplaceLogo,
        marketplaceStatus: item.marketplaceStatus,
    })));
}, [data]);

    const handleViewDetailMarketplace = (id) => {
      console.log(`ViewDetailMarketplace: ${id}`);
    };

    const handleAcceptNews = async (id) => {
    //   try {
    //     const response = await acceptNews(id);
    //     if (response.status === 200) {
    //       showSnackbar('Duyệt tin tức thành công!', "success");
    //     } else {

    //     }
    //   } catch (error) {
    //     showSnackbar('Duyệt tin tức không thành công!', "error");
    //   }
      };

      const handleDeleteNews = async (id) => {
        // try {
        //   const response = await deleteNews(id);
        //   if (response.status === 200) {
        //     showSnackbar('Xóa tin tức thành công!', "success");
        //   } else {

        //   }
        // } catch (error) {
        //   showSnackbar('Xóa tin tức không thành công!', "error");
        // }
      };

      const handleChangeStatus = async (id) => {
        // try {
        //   const response = await deleteNews(id);
        //   if (response.status === 200) {
        //     showSnackbar('Xóa tin tức thành công!', "success");
        //   } else {

        //   }
        // } catch (error) {
        //   showSnackbar('Xóa tin tức không thành công!', "error");
        // }
      };

    const columns = [
    { field: 'blank', headerName: '', width: 100 },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'marketplaceName', headerName: 'Tên Cửa Hàng', width: 500, sortable: false },
    { field: 'marketplaceLogo', headerName: 'Ảnh Logo', width: 500, sortable: false,
    renderCell: (params) => (
        <img src={params.value} alt="Logo" style={{ width: 40, height: 40 }} />
      ), },
    {
      field: 'marketplaceStatus',
      headerName: 'Trạng thái',
      width: 200,
      sortable: false,
        renderCell: (params) => (
            <div style={{ color: params.row.marketplaceStatus === 1 ? 'green' : 'red' }}>
                {params.row.marketplaceStatus === 1 ? 'Hoạt động' : 'Không hoạt đọng'}
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
                onClick={() => handleViewDetailMarketplace(params.row.id)}
                sx={{height: '37px'}}
            >
            </Button>
            
            <Button
                variant="outlined"
                startIcon={<ChangeCircleIcon sx={{marginLeft: '10px'}}/>}
                onClick={() => handleChangeStatus(params.row.id)}
                sx={{height: '37px', marginLeft: '5%'}}
            >
            </Button>
            </div>
        ),
      },
  ];

  const handleCreateNewMarketplace = async () => {
    try {
        const response = await createMarketplace(newMarketplaceName, newMarketplaceLogo);
        if (response.status === 200) {
          showSnackbar('Tạo cửa hàng mới thành công!', "success");
        } else {
  
        }
      } catch (error) {
        showSnackbar('Tạo cửa hàng mới thất bại!', "error");
      }
  }

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewMarketplaceLogoName(file.name);
      if (file.type.startsWith('image/')) {
        const resFeaturedImage = await uploadImage(file, "news");
        setNewMarketplaceLogo(resFeaturedImage);
      } else {
      }
    }
  };

  const [valueTab, setValueTab] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const handleCreateNewIngredient = async () => {
    try {
        const response = await createIngredient(newIngredient, "g");
        if (response.status === 200) {
          showSnackbar('Tạo nguyên liệu mới thành công!', "success");
        } else {
  
        }
      } catch (error) {
        showSnackbar('Tạo nguyên liệu mới thất bại!', "error");
      }
  }


  const [openCreateLink, setOpenCreateLink] = React.useState(false);
  const [ingredientSelect, setIngredientSelect] = useState();
  const [marketplaceSelect, setMarketplaceSelect] = useState();

  const handleClickOpenCreateLink = () => {
    setOpenCreateLink(true);
  };

  const handleCloseCreateLink = () => {
    setOpenCreateLink(false);
  };

  const handleChangeRecipeIngredientName = (ingredientId) => {
    setIngredientSelect(ingredientId);
  };

  const handleChangeMarketplaceName = (marketplaceId) => {
    setMarketplaceSelect(marketplaceId);
  };

  const handleCreateNewLink = async () => {
    try {
        const response = await createIngredientMarketplace(ingredientSelect, marketplaceSelect);
        if (response.status === 200) {
          showSnackbar('Tạo liên kết mới thành công!', "success");
        } else {
  
        }
      } catch (error) {
        showSnackbar('Tạo liên kết mới thất bại!', "error");
      }
  }

  return (
    <div>

        <Box sx={{marginTop: '60px'}}>
            <Grid container spacing={0} >
            <Grid item xs={1}>
            <DashboardMenu dashboardTitle={"Quản lý cửa hàng liên kết"}/>
            </Grid>
            
            <Grid item xs={11} sx={{ position: 'sticky', }}>
            <TabContext value={valueTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginLeft: '80px'}}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Cửa hàng" value="1" />
                    <Tab label="Nguyên liệu liên kết" value="2" />
                </TabList>
            </Box>
            
            <TabPanel value="1">
                <Box >
                <DataGrid
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
            </TabPanel>
            
            <TabPanel value="2">
                <Box >
                <ListIngredientMarketplace dataIngredients={dataIngredients}/>
                </Box>
                </TabPanel>
            </TabContext>
            </Grid>
            </Grid>
        </Box>
        <Grid container spacing={0} >
          <Grid item xs={6}>
            
          </Grid>

          <Grid item xs={2}>
            <Button 
                variant="contained" 
                sx={{ 
                    bgcolor: "#ff5e00",
                    width: '70%',
                    borderRadius: '15px' , 
                    marginTop: '1%',
                    marginBottom: '1%',
                  //  marginLeft: '20%',
                    color: 'white' 
                }}
                onClick={handleClickOpen}
                >
                Tạo cửa hàng mới
            </Button>
          </Grid>

          <Grid item xs={2}>
            <Button 
                variant="contained" 
                sx={{ 
                    bgcolor: "#ff5e00",
                    width: '70%',
                    borderRadius: '15px' , 
                    marginTop: '1%',
                    marginBottom: '1%',
             
                    color: 'white' 
                }}
                onClick={handleClickOpenCreateIngredient}
                >
                Tạo nguyên liệu mới
            </Button>
          </Grid>

          <Grid item xs={2}>
            <Button 
                variant="contained" 
                sx={{ 
                    bgcolor: "#ff5e00",
                    width: '70%',
                    borderRadius: '15px' , 
                    marginTop: '1%',
                    marginBottom: '1%',
               
                    color: 'white' 
                }}
                onClick={handleClickOpenCreateLink}
                >
                Tạo liên kết mới
            </Button>
          </Grid>

        </Grid>
            {/* Dialog tạo cửa hàng mới */}
            <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            // setNewMarketplaceName(formJson.name);

            handleClose();
          },
        }}
      >
        <DialogTitle>Tạo cửa hàng mới</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{marginBottom: '5%'}}>
            Tạo thêm cửa hàng bằng cách nhập tên cửa hàng và thêm ảnh logo
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Tên cửa hàng"
            type="name"
            fullWidth
            variant="standard"
            value={newMarketplaceName}
            onChange={(e) => setNewMarketplaceName(e.target.value)}
          />
          <Typography sx={{ fontSize: '16px', marginTop: '10%', color: 'gray' }}>
            Logo cửa hàng *
            </Typography>
                <input
                  type="file"
                  accept="image/*"
                  id="upload-feature-image"
                  style={{ display: 'none' }}
                  onChange={(event) => handleImageChange(event)}
                />
                          <Button variant="contained"  onClick={() => { document.getElementById('upload-feature-image').click(); }} className="custom-upload-button" sx={{ 
                bgcolor: "#ff5e00", 
                borderRadius: '15px' , 
                width: '42%',
                height: '50%',
                color: 'white',
                marginTop: '4%'
            }}>
                            {newMarketplaceLogoName && newMarketplaceLogoName.length > 39 ?
              `${newMarketplaceLogoName.slice(0, 25)}...` :
              (newMarketplaceLogoName || 'Chọn ảnh')}
                            </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit" onClick={handleCreateNewMarketplace}>Tạo</Button>
        </DialogActions>
            </Dialog>
            {/* Dialog tạo cửa hàng mới */}

      {/* Dialog tạo nguyên liệu mới */}
      <Dialog
        open={openCreateIngredient}
        onClose={handleCloseCreateIngredient}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            // setNewMarketplaceName(formJson.name);

            handleCloseCreateIngredient();
          },
        }}
      >
        <DialogTitle>Tạo nguyên liệu mới</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{marginBottom: '5%'}}>
            Tạo thêm nguyên liệu bằng cách nhập tên nguyên liệu
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Tên nguyên liệu"
            type="name"
            fullWidth
            variant="standard"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateIngredient}>Hủy</Button>
          <Button type="submit" onClick={handleCreateNewIngredient}>Tạo</Button>
        </DialogActions>
            </Dialog>
            {/* Dialog tạo cửa hàng mới */}


      {/* Dialog tạo liên kết mới */}
      <Dialog
        open={openCreateLink}
        onClose={handleCloseCreateLink}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            // setNewMarketplaceName(formJson.name);

            handleCloseCreateLink();
          },
        }}
      >
        <DialogTitle>Tạo liên kết mới</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{marginBottom: '5%'}}>
            Tạo thêm liên kết bằng cách chọn tên nguyên liệu và tên cửa hàng
          </DialogContentText>

            <Autocomplete
              disablePortal
              size="small"
              options={data}
              getOptionLabel={(option) => option.marketplaceName }
              isOptionEqualToValue={(option, newValue) => {
                return option.marketplaceName === newValue.marketplaceName;
              }}
              onChange={(event, option) => handleChangeMarketplaceName(option?.marketplaceId)}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  {option.marketplaceName} <img src={option.marketplaceLogo} alt="Logo" style={{ width: 40, height: 40, marginLeft: 15 }} />
                </Box>
              )}
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField {...params} label="Chọn cửa hàng" sx={{ borderRadius: '15px' }}/>}
            />
            
            <Autocomplete
              disablePortal
              size="small"
              options={dataIngredients}
              getOptionLabel={(option) => option.ingredientName}
              isOptionEqualToValue={(option, newValue) => {
                return option.ingredientName === newValue.ingredientName;
              }}
              onChange={(event, option) => handleChangeRecipeIngredientName(option?.ingredientId)}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  {option.ingredientName}
                </Box>
              )}
              sx={{ width: '100%',  marginTop: '20%', marginBottom: '20%' }}
              renderInput={(params) => <TextField {...params} label="Chọn nguyên liệu" sx={{ borderRadius: '15px' }}/>}
            />
            
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateLink}>Hủy</Button>
          <Button type="submit" onClick={handleCreateNewLink}>Tạo</Button>
        </DialogActions>
            </Dialog>
            {/* Dialog tạo liên kết mới */}
        
    </div>
  )
}
