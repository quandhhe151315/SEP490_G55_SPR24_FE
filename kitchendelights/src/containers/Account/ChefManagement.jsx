import React, { useEffect , useState } from 'react';
import DashboardMenu from '../../components/Dashboard/Menu/DashboardMenu'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { getListBecomeChef, acceptVerifycationChef, changeRole } from '../../services/UserServices';
import { useSnackbar } from '../../components/Snackbar/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import CardMedia from "@mui/material/CardMedia";
export default function ChefManagement() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const { showSnackbar } = useSnackbar();

    const getListVerificationChef = async () => {
      try {
        const response = await getListBecomeChef();
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
        getListVerificationChef();
        setRows(data.map(item => ({
        id: item.verificationId,
        userId: item.userId,
        username: item.username,
        createDate: item.createDate,

        cardFront: item.cardFront,
        cardBack: item.cardBack,
        verificationFront: item.verificationFront,
        verificationBack: item.verificationBack,

        verificationStatus: item.verificationStatus,
        verificationDate: item.verificationDate,
    })));
}, [data]);

const [open, setOpen] = useState(false);
const [imageToShow, setImageToShow] = useState('');

const handleCloseDialog = () => {
  setOpen(false);
};
    const handleViewVerification = (image) => {
      setImageToShow(image);
      setOpen(true);
      
      };

      const handleAccept = async (id, userId) => {
        try {
          const response = await acceptVerifycationChef(id, 1);
          if (response.status === 200) {
            handleChangeRole(userId);
          } else {
          }
        } catch (error) {
        }
      }

      const handleChangeRole = async (userId) => {
        try {
          const response = await changeRole(userId, 4);
          if (response.status === 200) {
            showSnackbar('Duyệt thành công!', "success");
          } else {
    
          }
        } catch (error) {
            showSnackbar('Duyệt không thành công!', "error");
        }
      };

      const handleReject = async (id) => {
        try {
          const response = await acceptVerifycationChef(id, 2);
          if (response.status === 200) {
            showSnackbar('Từ chối thành công!', "success");
          } else {

          }
        } catch (error) {
          showSnackbar('Từ chối không thành công!', "error");
        }
      }

    const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'userId', headerName: 'Id người dùng', width: 150 },
    { field: 'username', headerName: 'Username', width: 250 },
    { field: 'cardFront', headerName: 'CCCD Mặt trước', width: 150, sortable: false,
    renderCell: (params) => (
        <div>
        <Button
            variant="outlined"
            startIcon={<VisibilityIcon sx={{marginLeft: '10px'}}/>}
            onClick={() => handleViewVerification(params.row.cardFront)}
            sx={{height: '37px'}}
        >
        </Button>
        </div>
        ),
      },
      { field: 'cardBack', headerName: 'CCCD Mặt sau', width: 150, sortable: false,
    renderCell: (params) => (
        <div>
        <Button
            variant="outlined"
            startIcon={<VisibilityIcon sx={{marginLeft: '10px'}}/>}
            onClick={() => handleViewVerification(params.row.cardBack)}
            sx={{height: '37px'}}
        >
        </Button>
        </div>
        ),
      },
      { field: 'verificationFront', headerName: 'Xác nhận mặt trước', width: 150, sortable: false,
      renderCell: (params) => (
          <div>
          <Button
              variant="outlined"
              startIcon={<VisibilityIcon sx={{marginLeft: '10px'}}/>}
              onClick={() => handleViewVerification(params.row.verificationFront)}
              sx={{height: '37px'}}
          >
          </Button>
          </div>
          ),
        },
        { field: 'verificationBack', headerName: 'Xác nhận mặt sau', width: 150, sortable: false,
    renderCell: (params) => (
        <div>
        <Button
            variant="outlined"
            startIcon={<VisibilityIcon sx={{marginLeft: '10px'}}/>}
            onClick={() => handleViewVerification(params.row.verificationBack)}
            sx={{height: '37px'}}
        >
        </Button>
        </div>
        ),
      },
    { field: 'verificationStatus', headerName: 'Trạng thái', width: 150, 
        renderCell: (params) => (
          <div style={{ color: 
            params.row.verificationStatus === 1 ? 'green' : 
            params.row.verificationStatus === 0 ? 'gray' : 
            params.row.verificationStatus === 2 ? 'red' : ''
          }}>
            {params.row.verificationStatus === 1 ? 'Đã duyệt' : 
            params.row.verificationStatus === 0 ? 'Chờ duyệt' : 
            params.row.verificationStatus === 2 ? 'Từ chối' : ''
            }
          </div>
        ),
       },
    {field: 'verificationDate', headerName: 'Ngày duyệt', width: 110},
    {
        field: 'action',
        headerName: 'Hành động',
        width: 330,
        sortable: false,
        renderCell: (params) => (
            <div>
            {
            params.row.verificationStatus === 0 ? <Button variant="outlined" sx={{marginLeft: '20px'}} onClick={() => handleAccept(params.row.id, params.row.userId)}>Duyệt</Button> : 
            <Button variant="outlined" disabled>Đã duyệt</Button>
            }
            {
            params.row.verificationStatus === 0 ? <Button
            variant="outlined"
   
            onClick={() => handleReject(params.row.id)}
            sx={{height: '37px',marginLeft: '20px'}}
        >Từ chối</Button> : 
        <Button
        variant="outlined"
        
        onClick={() => handleReject(params.row.id)}
        sx={{height: '37px',marginLeft: '20px'}} disabled
    >Từ chối</Button>
            }
            </div>
        ),
      },
      
  ];
  
  

  return (
    <div>
        <Box>
            <Box sx={{ display: 'flex' }}>
                
                <DashboardMenu dashboardTitle={"Quản lý đầu bếp"}/>
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
        onClose={handleCloseDialog}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            // setNewMarketplaceName(formJson.name);

            handleCloseDialog();
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
          <Button onClick={handleCloseDialog}>Xong</Button>

        </DialogActions>
            </Dialog>

        </Box>
    </div>
  )
}
