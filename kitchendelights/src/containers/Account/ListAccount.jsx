import React from 'react'
import DashboardMenu from '../../components/Dashboard/Menu/DashboardMenu'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

export default function ListAccount() {
    const handleEdit = (id) => {
        console.log(`Chỉnh sửa ID: ${id}`);
      };

      const handleBan = (id) => {
        console.log(`Ban ID: ${id}`);
      };

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
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.middleName || ''} ${params.row.lastName || ''}`,
    },
    { field: 'phone', headerName: 'Số điện thoại', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
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
  
  const rows = [
    { id: 1, lastName: 'Snow', middleName: 'SnowOake', firstName: 'Jon', age: 35},
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 33 },
    { id: 6, lastName: 'Melisandre', firstName: 'Nguyen', age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 10, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 11, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 12, lastName: 'Phan', firstName: 'Linh', age: 24 },
    { id: 13, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 14, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 15, lastName: 'Targaryen', firstName: 'Daenerys', age: 33 },
    { id: 16, lastName: 'Mark', firstName: 'Nguyen', age: 150 },
    { id: 17, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 18, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 19, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
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
                >
                Tạo tài khoản mới
            </Button>
        </Box>
    </div>
  )
}
