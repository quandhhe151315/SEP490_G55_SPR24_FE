import React, { useEffect , useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
// import { useNavigate } from "react-router-dom";
import { useSnackbar } from '../../components/Snackbar/Snackbar';
import { listIngredientMarketplace, deleteMarketplaceLink, createIngredientMarketplace } from '../../services/MarketPlaceService';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { useNavigate, Link  } from 'react-router-dom';

export default function ListIngredientMarketplace({ dataIngredients, dataMarketplace }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [dataDisplay, setDataDisplay] = useState([]);
  const [link, setLink] = useState('');
  const { showSnackbar } = useSnackbar();

  const getMarketplaceLink = (ingreId, url) => {
    const foundItem = data.find(item => item.ingredientId === ingreId && item.marketplaceLogo === url);
    return foundItem.marketplaceLink;
  };

  const handleGoToLinking = (id, url) => {
    const marketplaceLink = getMarketplaceLink(id, url);
    setLink(marketplaceLink);
  }

  const getListIngreMarketplace = async () => {
      try {
        const response = await listIngredientMarketplace();
        if (response.status === 200) {
          setData(response.data);
        } else {

        }
      } catch (error) {
        console.error('Can not load news data!', error);
      }
    }

    useEffect(() => {
      
      getListIngreMarketplace();
    }, [data]);

  const processData = () => {
    const groupedData = {};
    data.forEach(item => {
      if (!groupedData[item.ingredientName]) {
        groupedData[item.ingredientName] = { ingredientId: item.ingredientId, ingredientName: item.ingredientName, marketplaceId: item.marketplaceId, marketplaceLogos: [] };
      }
      groupedData[item.ingredientName].marketplaceLogos.push(item.marketplaceLogo);
    });

    dataIngredients.forEach(item => {
      if (!groupedData[item.ingredientName]) {
        groupedData[item.ingredientName] = { ingredientId: item.ingredientId, ingredientName: item.ingredientName };
      }
    });

    setDataDisplay(Object.values(groupedData));
  }

  useEffect(() => {
    processData();
    setRows(dataDisplay.map(item => ({
      id: item.ingredientId,
      ingredientName: item.ingredientName,
      marketplaceId: item.marketplaceId,
      marketplaceLogo: item.marketplaceLogos,
    })));
  }, [dataDisplay]);

      const handleDeleteLink = async (id, url) => {
        const marketId = getMarketId(id, url);
        try {
          const response = await deleteMarketplaceLink(id, marketId);
          if (response.status === 200) {
            showSnackbar('Xóa đường dẫn thành công!', "success");
          } else {

          }
        } catch (error) {
          showSnackbar('Xóa đường dẫn không thành công!', "error");
        }
      };

      const getMarketId = (ingreId, url) => {
        const foundItem = data.find(item => item.ingredientId === ingreId && item.marketplaceLogo === url);
        return foundItem.marketplaceId;
      };


  const [openCreateLink, setOpenCreateLink] = React.useState(false);
  const [ingredientSelect, setIngredientSelect] = useState();
  const [marketplaceSelect, setMarketplaceSelect] = useState();
  const [marketplaceLink, setMarketplaceLink] = useState('');

  const handleClickOpenCreateLink = (id) => {
    setIngredientSelect(id);
    setOpenCreateLink(true);
  };

  const handleCloseCreateLink = () => {
    setOpenCreateLink(false);
  };

  const handleChangeMarketplaceName = (marketplaceId) => {
    setMarketplaceSelect(marketplaceId);
  };

  const handleCreateNewLink = async () => {
    try {
        const response = await createIngredientMarketplace(ingredientSelect, marketplaceSelect, marketplaceLink);
        if (response.status === 200) {
          handleCloseCreateLink();
          showSnackbar('Tạo liên kết mới thành công!', "success");
        } else {
  
        }
      } catch (error) {
        showSnackbar('Tạo liên kết mới thất bại!', "error");
      }
  }

    const columns = [
        { field: 'blank', headerName: '', width: 100 },
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'ingredientName', headerName: 'Tên Nguyên Liệu', width: 350, sortable: false},
        { field: 'marketplaceId', headerName: 'ID Cửa Hàng', width: 100, sortable: false},
        { field: 'marketplaceLogo', headerName: 'Logo Cửa Hàng', width: 750, sortable: false,
        renderCell: (params) => {
          return (
          <div style={{ position: 'relative' }}>
            {params.value && Array.isArray(params.value) && params.value.map((url, index) => (
              <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                {/* <img src={url} alt="Logo" style={{ width: 40, height: 40, marginRight: 20 }} onClick={() => handleGoToLinking(params.row.id, url)}/> */}
                <Link to={link} onClick={() => handleGoToLinking(params.row.id, url)}><img src={url} alt="Logo" style={{ width: 40, height: 40, marginRight: 20 }} /></Link>
                <button 
                  style={{
                    position: 'absolute',
                    top: -5,
                    right: 5,
                    background: 'red',
                    color: 'white',
                    fontWeight: 'bold',
                    border: '2px solid white', 
                    borderRadius: 15,
                    cursor: 'pointer',
                  }}
                  onClick={() => handleDeleteLink(params.row.id, url)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        );
      },    
    },

    {
        field: 'action',    
        headerName: 'Hành động',
        width: 250,
        renderCell: (params) => (
            <div>
            <Button
                variant="outlined"
                startIcon={<AddIcon sx={{marginLeft: '10px'}}/>}
                onClick={() => handleClickOpenCreateLink(params.row.id)}
                sx={{height: '37px'}}
            >
            </Button>
            </div>
        ),
      },
  ];

  return (
    <div>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                      pagination: {
                          paginationModel: { page: 0, pageSize: 5 },
                      },
                      columns: {
                        columnVisibilityModel: {
                          marketplaceId: false,
                        },
                      },
                    }}
                    pageSizeOptions={[5, 10]}
                />

<Dialog
        open={openCreateLink}
        onClose={handleCloseCreateLink}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            handleCloseCreateLink();
          },
        }}
      >
        <DialogTitle>Tạo liên kết mới</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{marginBottom: '5%'}}>
            Tạo thêm liên kết bằng cách chọn tên cửa hàng và điền link liên kết
          </DialogContentText>

            <Autocomplete
              disablePortal
              size="small"
              options={dataMarketplace}
              getOptionLabel={(option) => option.marketplaceName}
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

            <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Link liên kết đến nguyên liệu"
            type="name"
            fullWidth
            variant="standard"
            value={marketplaceLink}
            onChange={(e) => setMarketplaceLink(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateLink}>Hủy</Button>
          <Button type="submit" onClick={handleCreateNewLink}>Tạo</Button>
        </DialogActions>
            </Dialog>
    </div>
  )
}
