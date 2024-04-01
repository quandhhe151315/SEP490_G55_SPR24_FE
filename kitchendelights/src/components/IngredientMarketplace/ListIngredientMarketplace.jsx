import React, { useEffect , useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from '../../components/Snackbar/Snackbar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { listIngredientMarketplace } from '../../services/MarketPlaceService';
import { getAllIngredient } from '../../services/RecipeServices';


export default function ListIngredientMarketplace({ dataIngredients }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [dataDisplay, setDataDisplay] = useState([]);

  const { showSnackbar } = useSnackbar();

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
    }, []);

  const processData = () => {
    const groupedData = {};
    data.forEach(item => {
      if (!groupedData[item.ingredientName]) {
        groupedData[item.ingredientName] = { ingredientId: item.ingredientId, ingredientName: item.ingredientName, marketplaceLogos: [] };
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
      marketplaceLogo: item.marketplaceLogos,
    })));
  }, [dataDisplay]);

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
        { field: 'ingredientName', headerName: 'Tên Nguyên Liệu', width: 350, sortable: false },

        { field: 'marketplaceLogo', headerName: 'Logo Cửa Hàng', width: 550, sortable: false,
        renderCell: (params) => (
            <div>
              {params.value && Array.isArray(params.value) && params.value.map((url, index) => (
            <img key={index} src={url} alt="Logo" style={{ width: 40, height: 40, marginRight: 5 }} />
          ))}
            </div>
          ),
    },

    {
        field: 'action',    
        headerName: 'Hành động',
        width: 550,
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

  return (
    <div>
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
    </div>
  )
}
