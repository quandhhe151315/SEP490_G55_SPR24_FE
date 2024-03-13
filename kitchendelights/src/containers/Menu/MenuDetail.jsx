import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import styled from "@emotion/styled";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { deleteMenu } from "../../services/ApiServices";
import { useNavigate } from "react-router-dom";
import { getMenuById } from "../../services/ApiServices";

function MenuDetail({ menuId }) {

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [menu, setMenu] = useState({});

  const getMenuInFomation = async (menuId) => {
    try {
      const response = await getMenuById(menuId);
      if (response.status === 200) {
        setMenu(response.data);
      } else {
        console.log('ko get thanh cong', response);
      }
    } catch (error) {
      console.error('loi khi get menu', error);
    }
  };
  const handleEditClick = () => {
    setIsEditing(true);
    console.log('edit', isEditing);
  };

  //mở đóng dialog xác nhận xóa menu
  const handleOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteMenu(menuId);
      if (response.status === 200) {
        navigate('/UserProfile');
        console.log('xoa thanh cong', response);
        setOpenDialog(false);
      }else{
        console.log(menuId);
        console.log('ko xoa thanh cong', response);
      }
    } catch (error) {
      console.error('loi khi xoa menu', error);
    }
  };

  const CustomTextField = styled(TextField)({
    '& input': {
      fontSize: '46px',
      color: '#000000'
    },
    '& label': {
      fontSize: '46px',
      fontWeight: 'bold',
      color: '#000000'
    }
  });

  useEffect(() => {
    setIsEditing(false);
    getMenuInFomation(menuId);
  }, [menuId]);

  return (

    <Paper elevation={2} style={{ marginLeft: '20px', marginTop: '32px', minHeight: '700px' }}>
      {isEditing ? (
        <>
          <CustomTextField sx={{ display: "block", fontSize: '46px', fontWeight: '', marginLeft: '5%', marginTop: '20px', color: '#000000' }}
            defaultValue="MenuName"
            variant="standard"
            size="medium"
            type="input"
            placeholder="Tên menu"
          ></CustomTextField>
          <TextField sx={{ display: 'block', fontSize: '20px', marginLeft: '5%', marginTop: '20px', color: '#000000' }}
            defaultValue="Menu description"
            variant="standard"
            size="small"
            type="input"
            placeholder="Mô tả về menu của bạn"
          ></TextField>
        </>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '5%' }}>
              <Typography sx={{ fontSize: '46px', fontWeight: '', marginLeft: '5%', marginTop: '20px', color: '#000000' }}>
                {menu.menuName}
              </Typography>
              <Typography sx={{ fontSize: '20px', marginLeft: '5%', marginTop: '20px', color: '#000000' }}>
                {menu.menuDescription}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', marginRight: '10%', marginTop: '5%' }}>
              <IconButton sx={{ marginRight: '40%' }}>
                <EditIcon sx={{ fontSize: '30px' }} onClick={handleEditClick} />
              </IconButton>
              <IconButton sx={{ marginRight: '5%' }}>
                <DeleteForeverOutlinedIcon sx={{ fontSize: '30px' }} onClick={handleOpen} />
              </IconButton>
            </Box>
          </Box>

        </>
      )}

      <Divider sx={{ marginTop: '10px' }} />
      <Box>

      </Box>




      {/* Dialog to confirm delete menu */}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xác nhận xóa Menu"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa Menu này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDelete}>Có</Button>
          <Button onClick={handleClose} autoFocus>
            Không
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>

  );
}

export default MenuDetail;