import React, { useEffect , useState } from 'react';
import DashboardMenu from '../../components/Dashboard/Menu/DashboardMenu'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { listUsers } from '../../services/ApiServices';


export default function ListAccount() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);


    const getListUser = async () => {
      try {
        const response = await listUsers();
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
        id: item.userId,
        email: item.email,
        lastName: item.lastName,
        middleName: item.middleName,
        firstName: item.firstName,
        phone: item.phone,
        address: item.address,
        role: item.role.roleName,
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
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'firstName', headerName: 'Tên Họ', width: 130 },
    { field: 'middleName', headerName: 'Tên Đệm', width: 130 },
    { field: 'lastName', headerName: 'Tên', width: 130 },
    
    {
      field: 'fullName',
      headerName: 'Tên đầy đủ',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 220,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.middleName || ''} ${params.row.lastName || ''}`,
    },
    { field: 'phone', headerName: 'Số điện thoại', width: 130 },
    // {
    //   field: 'age',
    //   headerName: 'Age',
    //   type: 'number',
    //   width: 90,
    // },
    { field: 'address', headerName: 'Địa chỉ', width: 270 },
    { field: 'role', headerName: 'Role', width: 130 },
    {
        field: 'action',
        headerName: 'Hành động',
        width: 185,
        renderCell: (params) => (
            <div>
            <Button
                variant="outlined"
                startIcon={<EditIcon sx={{marginLeft: '10px'}}/>}
                onClick={() => handleEdit(params.row.id)}
                sx={{height: '37px'}}
            >
            </Button>
            <Button variant="outlined" color="error" sx={{marginLeft: '20px'}} onClick={() => handleBan(params.row.id)}>
            Ban
            </Button>
            </div>
        ),
      },
      
  ];
  
  

  return (
    <div>
        <Box>
            <Box sx={{ display: 'flex' }}>
                
                <DashboardMenu dashboardTitle={"Quản lý người dùng"}/>
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
