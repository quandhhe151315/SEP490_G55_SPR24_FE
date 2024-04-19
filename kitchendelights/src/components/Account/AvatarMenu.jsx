import React, { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import PasswordIcon from "@mui/icons-material/Password";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import ContactsIcon from "@mui/icons-material/Contacts";
import { useNavigate } from "react-router-dom";
import GetInformationJWT from '../JWT/GetInformationJWT';
import { MenuListItems } from './MenuListItem';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { deleteAccount } from '../../services/UserServices';
import Cookies from 'js-cookie';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ListAltIcon from "@mui/icons-material/ListAlt";
import FastfoodIcon from "@mui/icons-material/Fastfood";

function AvatarMenu({ handleClick, onMenuSelect }) {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setRole(Cookies.get("role"));
  }, [id]);

  const logout = () => {
    Cookies.remove("jwt");
    Cookies.remove("userId");
    Cookies.remove("role");
    Cookies.remove("userFullname");
    navigate("/KitchenDelights");
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteAccount(id);
      if (response.status === 200) {
        logout();
      } else {
      }
    } catch (error) {
      //   showSnackbar('Ban tài khoản không thành công!', "error");
    }
  };

  const goToMyProfile = () => {
    navigate("/MyProfile");
  };

  const goToChangePassword = () => {
    navigate("/ChangePassword");
  };

  const goToBecomeChef = () => {
    navigate("/BecomeChef");
  };
  const goToMyBlog = () => {
    navigate("/myblog");
  };
  const goToHistory = () => {
    navigate("/HistoryPayment");
  };
  const goToMyBookMark = () => {
    navigate("/BookMark/");
  };
  const goToMyRecipe = () => {
    navigate("/MyRecipe");
  };
  const goToRecipeBought = () => {
    navigate("/PurchasedRecipe");
  };

  return (
    <div>
      <GetInformationJWT setId={setId} />
      <Paper
        sx={{
          width: 250,
          maxWidth: "100%",
          marginTop: "30px",
          border: "1px solid #bfb8b8",
        }}
      >
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" sx={{ color: "#ff5e00" }} />
            </ListItemIcon>
            <ListItemText>Xin chào ...</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={goToMyProfile}>
            <ListItemIcon>
              <ContactEmergencyIcon
                fontSize="small"
                sx={{ color: "#ff5e00" }}
              />
            </ListItemIcon>
            <ListItemText sx={{ fontWeight: "bold" }}>
              Thông tin cá nhân
            </ListItemText>
          </MenuItem>

          <MenuItem onClick={goToChangePassword}>
            <ListItemIcon>
              <PasswordIcon fontSize="small" sx={{ color: "#ff5e00" }} />
            </ListItemIcon>
            <ListItemText>Đổi mật khẩu</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>

      <Paper
        sx={{
          maxHeight: "500px",
          overflow: "auto",
          width: 250,
          maxWidth: "100%",
          marginTop: "20px",
          border: "1px solid #bfb8b8",
        }}
      >
        <MenuList>
          <MenuItem onClick={goToMyBookMark}>
            <ListItemIcon>
              <FavoriteIcon fontSize="small" sx={{ color: "#ff5e00" }} />
            </ListItemIcon>
            <ListItemText>Công thức yêu thích</ListItemText>
          </MenuItem>

          <MenuItem onClick={goToMyRecipe}>
            <ListItemIcon>
              <LocalPizzaIcon fontSize="small" sx={{ color: "#ff5e00" }} />
            </ListItemIcon>
            <ListItemText>Công thức của tôi</ListItemText>
          </MenuItem>

          <MenuItem onClick={goToRecipeBought}>
            <ListItemIcon>
              <FastfoodIcon fontSize="small" sx={{ color: "#ff5e00" }} />
            </ListItemIcon>
            <ListItemText>Công thức đã mua</ListItemText>
          </MenuItem>

          <MenuItem>
            <ListItemIcon>
              <CommentIcon fontSize="small" sx={{ color: "#ff5e00" }} />
            </ListItemIcon>
            <ListItemText>Đánh giá</ListItemText>
          </MenuItem>

          <MenuItem onClick={goToMyBlog}>
            <ListItemIcon>
              <ArtTrackIcon fontSize="small" sx={{ color: "#ff5e00" }} />
            </ListItemIcon>
            <ListItemText>Blog của tôi</ListItemText>
          </MenuItem>
          <MenuItem onClick={goToHistory}>
            <ListItemIcon>
              <ListAltIcon fontSize="small" sx={{ color: "#ff5e00" }} />
            </ListItemIcon>
            <ListItemText>Lịch sử mua hàng</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>

      <Paper sx={{ maxHeight:'500px', overflow:'auto', width: 250, maxWidth: '100%', marginTop: '20px', border: '1px solid #bfb8b8' }}>
            <MenuList>
                    <MenuItem>
                        <ListItemIcon>
                            <KeyboardDoubleArrowDownIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Menu của bạn</ListItemText>
                    </MenuItem>
                </MenuList>
                <MenuListItems handleClick={handleClick} onMenuSelect={onMenuSelect}/>
            </Paper>

      



      {(role === "user") && (
        <>
        <Paper
        sx={{
          width: 250,
          maxWidth: "100%",
          marginTop: "20px",
          border: "1px solid #bfb8b8",
        }}
      >
        <MenuList>
          <MenuItem onClick={goToBecomeChef}>
            <ListItemIcon>
              <ContactsIcon fontSize="small" sx={{ color: "#ff5e00" }} />
            </ListItemIcon>
            <ListItemText>Trở thành đầu bếp</ListItemText>
          </MenuItem>
        </MenuList> 
        </Paper>
        </>
      )}

      

      <Paper
        sx={{
          width: 250,
          maxWidth: "100%",
          marginTop: "20px",
          border: "1px solid #bfb8b8",
        }}
      >
        <MenuList>
          <MenuItem onClick={handleClickOpen}>
            <ListItemIcon>
              <PersonRemoveIcon fontSize="small" sx={{ color: "#ff5e00" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "red" }}>Xóa tài khoản</ListItemText>
          </MenuItem>
        </MenuList>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Bạn có chắc muốn xóa tài khoản?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Sau khi xóa tài khoản sẽ không thể khôi phục lại được. Nhấn "Xóa"
              để xóa tài khoản hoặc nhấn "Hủy"
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleDeleteAccount}>
              Xóa
            </Button>
            <Button onClick={handleClose} autoFocus>
              Hủy
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
}

export default AvatarMenu;
