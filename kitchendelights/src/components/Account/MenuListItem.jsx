import React, { useState, useContext, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MyProfile from '../../containers/Account/MyProfile';
import GetInformationJWT from '../JWT/GetInformationJWT';
import { getMenus } from '../../services/ApiServices';
const MenuListItems = ({ handleClick, onMenuSelect }) => {
    const [id, setId] = useState('');
    const [listMenu, setListMenu] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const maxDisplay = 4;

    useEffect(() => {
        if (id) {
            getListMenu();
        }
    }, [id]);

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
    return (
      <React.Fragment>
        <GetInformationJWT setId={setId} />
        <MenuList>
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
      </React.Fragment>
    );
  };

  export { MenuListItems }; 