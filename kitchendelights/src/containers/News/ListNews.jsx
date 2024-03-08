import React, { useEffect , useState } from 'react';
import DashboardMenu from '../../components/Dashboard/Menu/DashboardMenu'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { listNews } from '../../services/ApiServices';
import DoneIcon from '@mui/icons-material/Done';
import Typography from '@mui/material/Typography';
export default function ListNews() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);


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

    const handleEdit = (id) => {
        console.log(`Chỉnh sửa ID: ${id}`);
      };

      const handleBan = (id) => {
        console.log(`Ban ID: ${id}`);
      };

      const goToCreateAccount = () => {
        navigate('/CreateAccount');
      }

    const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'userName', headerName: 'Tác giả', width: 300, sortable: false },
    { field: 'featuredImage', headerName: 'Ảnh', width: 300, sortable: false },
    { field: 'newsTitle', headerName: 'Tiêu đề', width: 520, sortable: false },
    { field: 'createDate', headerName: 'Ngày tạo', width: 110, sortable: false },
    {
      field: 'newsStatus',
      headerName: 'Trạng thái',
      width: 120,
      sortable: false,
        renderCell: (params) => (
            <div style={{ color: params.row.newsStatus ? 'green' : 'red' }}>
                {params.row.newsStatus ? 'Xuất bản' : 'Chờ duyệt'}
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
                startIcon={<EditIcon sx={{marginLeft: '10px'}}/>}
                onClick={() => handleEdit(params.row.id)}
                sx={{height: '37px'}}
            >
            </Button>
            <Button variant="outlined" color="error" sx={{marginLeft: '5%'}} onClick={() => handleBan(params.row.id)}>
            Xóa
            </Button>
            <Button
                variant="outlined"
                startIcon={<DoneIcon sx={{marginLeft: '10px'}}/>}
                onClick={() => handleEdit(params.row.id)}
                sx={{height: '37px', marginLeft: '5%'}}
            >
            </Button>
            </div>
        ),
      },
  ];

  return (
    <div>
        <Box>
            <Box sx={{ display: 'flex' }}>
                
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
            <Button 
                variant="contained" 
                sx={{ 
                    bgcolor: "#ff5e00", 
                    borderRadius: '15px' , 
                    marginTop: '40px',
                    marginLeft: '1720px',
                    color: 'white' 
                }}
                onClick={goToCreateAccount}
                >
                Tạo tài khoản mới
            </Button>
        </Box>
    </div>
  )
}
