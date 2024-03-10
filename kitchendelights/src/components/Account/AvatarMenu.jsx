import React, { useState, useContext, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import PasswordIcon from '@mui/icons-material/Password';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import ContactsIcon from '@mui/icons-material/Contacts';
import { Link, useNavigate } from "react-router-dom";
import { getMenus } from '../../services/ApiServices';
import GetInformationJWT from '../JWT/GetInformationJWT';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MyProfile from '../../containers/Account/MyProfile';

function AvatarMenu({ handleClick, onMenuSelect }) {
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [listMenu, setListMenu] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const maxDisplay = 4;

    const goToMyProfile = () => {
        navigate('/MyProfile');
    }

    const goToChangePassword = () => {
        navigate('/ChangePassword');
    }

    const getListMenu = async () => {
        try {
            const response = await getMenus(id);
            if (response.status === 200) {
                setListMenu(response.data);
            } else {
                console.error('lỗi khi tải danh sách menu');
            }
        } catch (error) {
            console.error('lỗi API getMenu', error);
        }
    };

    

    useEffect(() => {
        if (id) {
            getListMenu();
        }
    }, [id]);
    return (
        <div>
            <GetInformationJWT setId={setId} />
            <Paper sx={{ width: 280, maxWidth: '100%', marginTop: '30px', marginLeft: '46%', border: '1px solid #bfb8b8' }}>
                <MenuList>
                    <MenuItem>
                        <ListItemIcon>
                            <AccountCircleIcon fontSize="small" sx={{ color: "#ff5e00" }} />
                        </ListItemIcon>
                        <ListItemText>Xin chào ...</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => handleClick('MyProfile')}>
                        <ListItemIcon>
                            <ContactEmergencyIcon fontSize="small" sx={{ color: "#ff5e00" }} />
                        </ListItemIcon>
                        <ListItemText sx={{ fontWeight: 'bold' }}>Thông tin cá nhân</ListItemText>
                    </MenuItem>

                    <MenuItem onClick={() => handleClick('ChangePassword')}>
                        <ListItemIcon>
                            <PasswordIcon fontSize="small" sx={{ color: "#ff5e00" }} />
                        </ListItemIcon>
                        <ListItemText>Đổi mật khẩu</ListItemText>
                    </MenuItem>
                </MenuList>
            </Paper>

            <Paper sx={{ maxHeight:'500px', overflow:'auto', width: 280, maxWidth: '100%', marginTop: '20px', marginLeft: '46%', border: '1px solid #bfb8b8' }}>
                <MenuList>
                    <MenuItem>
                        <ListItemIcon>
                            <FavoriteIcon fontSize="small" sx={{ color: "#ff5e00" }} />
                        </ListItemIcon>
                        <ListItemText>Công thức yêu thích</ListItemText>
                    </MenuItem>

                    <MenuItem>
                        <ListItemIcon>
                            <LocalPizzaIcon fontSize="small" sx={{ color: "#ff5e00" }} />
                        </ListItemIcon>
                        <ListItemText>Công thức của tôi</ListItemText>
                    </MenuItem>

                    <MenuItem>
                        <ListItemIcon>
                            <CommentIcon fontSize="small" sx={{ color: "#ff5e00" }} />
                        </ListItemIcon>
                        <ListItemText>Đánh giá</ListItemText>
                    </MenuItem>

                    <MenuItem>
                        <ListItemIcon>
                            <ArtTrackIcon fontSize="small" sx={{ color: "#ff5e00" }} />
                        </ListItemIcon>
                        <ListItemText>Blog</ListItemText>
                    </MenuItem>
                    {listMenu.slice(0, showAll ? undefined : maxDisplay).map((menu, index) => (
                        <MenuItem key={index} onClick={(e)=>{
                            onMenuSelect(menu.menuId);
                            handleClick('MenuDetail');
                        }}>
                            <ListItemIcon>
                            <MenuBookIcon fontSize="small" sx={{ color: "#ff5e00" }} />
                            </ListItemIcon>{menu.menuName}
                        </MenuItem>
                    ))}

                    {listMenu.length > maxDisplay && (
                        <MenuItem onClick={() => setShowAll(!showAll)}>
                            <ListItemIcon>
                            {showAll ? <ExpandLessIcon fontSize="small" sx={{ color: "#ff5e00" }} /> : <ExpandMoreIcon fontSize="small" sx={{ color: "#ff5e00" }} />}
                            </ListItemIcon> {showAll ? 'Thu gọn' : 'Xem thêm'}
                        </MenuItem>
                    )}
                </MenuList>
            </Paper> 

            <Paper sx={{ width: 280, maxWidth: '100%', marginTop: '20px', marginLeft: '46%', border: '1px solid #bfb8b8' }}>
                <MenuList>
                    <MenuItem>
                        <ListItemIcon>
                            <ContactsIcon fontSize="small" sx={{ color: "#ff5e00" }} />
                        </ListItemIcon>
                        <ListItemText>Trở thành đầu bếp</ListItemText>
                    </MenuItem>
                </MenuList>
            </Paper>

            
        </div>
    );
}

export default AvatarMenu;