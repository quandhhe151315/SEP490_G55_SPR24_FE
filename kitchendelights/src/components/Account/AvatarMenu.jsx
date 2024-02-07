import React, { useState, useContext } from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import PasswordIcon from '@mui/icons-material/Password';
import ContentCopy from '@mui/icons-material/ContentCopy';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import ContactsIcon from '@mui/icons-material/Contacts';
function AvatarMenu() {
    return (
      <div>
        <Paper sx={{ width: 280, maxWidth: '100%', marginTop: '30px', marginLeft: '280px', border: '1px solid #bfb8b8' }}>
        <MenuList>
            <MenuItem>
            <ListItemIcon>
                <AccountCircleIcon fontSize="small" sx={{ color: "#ff5e00" }}/>
            </ListItemIcon>
            <ListItemText>Xin chào ...</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem>
            <ListItemIcon>
                <ContactEmergencyIcon fontSize="small" sx={{ color: "#ff5e00" }}/>
            </ListItemIcon>
            <ListItemText sx={{  fontWeight: 'bold'}}>Thông tin cá nhân</ListItemText>
            </MenuItem>

            <MenuItem>
            <ListItemIcon>
                <PasswordIcon fontSize="small" sx={{ color: "#ff5e00" }}/>
            </ListItemIcon>
            <ListItemText>Đổi mật khẩu</ListItemText>
            </MenuItem>
        </MenuList>
        </Paper>
        <Paper sx={{ width: 280, maxWidth: '100%', marginTop: '20px', marginLeft: '280px', border: '1px solid #bfb8b8' }}>
        <MenuList>
            <MenuItem>
            <ListItemIcon>
                <FavoriteIcon fontSize="small" sx={{ color: "#ff5e00" }}/>
            </ListItemIcon>
            <ListItemText>Công thức yêu thích</ListItemText>
            </MenuItem>

            <MenuItem>
            <ListItemIcon>
                <LocalPizzaIcon fontSize="small" sx={{ color: "#ff5e00" }}/>
            </ListItemIcon>
            <ListItemText>Công thức của tôi</ListItemText>
            </MenuItem>

            <MenuItem>
            <ListItemIcon>
                <CommentIcon fontSize="small" sx={{ color: "#ff5e00" }}/>
            </ListItemIcon>
            <ListItemText>Đánh giá</ListItemText>
            </MenuItem>

            <MenuItem>
            <ListItemIcon>
                <ArtTrackIcon fontSize="small" sx={{ color: "#ff5e00" }}/>
            </ListItemIcon>
            <ListItemText>Blog</ListItemText>
            </MenuItem>
        </MenuList>
        </Paper>
        <Paper sx={{ width: 280, maxWidth: '100%', marginTop: '20px', marginLeft: '280px', border: '1px solid #bfb8b8' }}>
        <MenuList>
            <MenuItem>
            <ListItemIcon>
                <ContactsIcon fontSize="small" sx={{ color: "#ff5e00" }}/>
            </ListItemIcon>
            <ListItemText>Trở thành đầu bếp</ListItemText>
            </MenuItem>
        </MenuList>
        </Paper>
      </div>
    );
  }
  
  export default AvatarMenu;