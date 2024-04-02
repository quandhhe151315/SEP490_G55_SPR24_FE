import React, { useEffect , useState } from 'react';
import DashboardMenu from '../../components/Dashboard/Menu/DashboardMenu'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from '../../components/Snackbar/Snackbar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import Grid from '@mui/material/Grid';
import ListIngredientMarketplace from '../../components/IngredientMarketplace/ListIngredientMarketplace';
import Autocomplete from '@mui/material/Autocomplete';
import { getAllIngredient } from '../../services/RecipeServices';
import { getListIngredientMarketplaceById } from '../../services/MarketPlaceService';
import {useParams} from "react-router-dom";

export default function DetailMarketplace() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);

  const { showSnackbar } = useSnackbar();
  const params = useParams();

    const getListIngredientById = async () => {
      try {
        const id = Number.parseInt(params.id, 10);
        const response = await getListIngredientMarketplaceById(id);
        if (response.status === 200) {
            setData(response.data);
        } else {
          console.error('Can not Load news! ');
        }
      } catch (error) {
        console.error('Can not load news data!', error);
      }
    };

    useEffect(() => {
        getListIngredientById();
      setRows(data.map(item => ({
        id: item.ingredientId,
        ingredientName: item.ingredientName,
        marketplaceLogo: item.marketplaceLogo,
        marketplaceLink: item.marketplaceLink,
    })));
}, [data]);

    const columns = [
    { field: 'blank', headerName: '', width: 100 },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'ingredientName', headerName: 'Tên nguyên liệu', width: 400, sortable: false },
    { field: 'marketplaceLogo', headerName: 'Ảnh Logo', width: 100, sortable: false,
    renderCell: (params) => (
        <img src={params.value} alt="Logo" style={{ width: 40, height: 40}} />
      ), 
    },
    { field: 'marketplaceLink', headerName: 'Link liên kết', width: 900, sortable: false},
  ];

  return (
    <div>

        <Box sx={{marginTop: '60px'}}>
            <Grid container spacing={0} >
            <Grid item xs={1}>
            <DashboardMenu dashboardTitle={"Quản lý cửa hàng liên kết"}/>
            </Grid>
            
            <Grid item xs={11} sx={{ position: 'sticky', }}>
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
            </Grid>
            </Grid>
        </Box>
    </div>
  )
}
