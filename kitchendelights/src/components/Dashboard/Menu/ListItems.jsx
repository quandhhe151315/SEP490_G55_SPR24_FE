import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import CategoryIcon from '@mui/icons-material/Category';
import SellIcon from '@mui/icons-material/Sell';
import DiscountIcon from '@mui/icons-material/Discount';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ContactsIcon from '@mui/icons-material/Contacts';
import ListIcon from '@mui/icons-material/List';
export const dashboardItems = (
    <React.Fragment>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </React.Fragment>
  );

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon/>
      </ListItemIcon>
      <ListItemText primary="Quản lý Người dùng" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ContactsIcon/>
      </ListItemIcon>
      <ListItemText primary="Quản lý Đầu bếp" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SellIcon />
      </ListItemIcon>
      <ListItemText primary="Quản lý Công thức" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <CategoryIcon />
      </ListItemIcon>
      <ListItemText primary="Quản lý Category" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="Quản lý SubCategory" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <NewspaperIcon/>
      </ListItemIcon>
      <ListItemText primary="Quản lý Tin tức" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ArtTrackIcon/>
      </ListItemIcon>
      <ListItemText primary="Quản lý Blog" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Dịch vụ
    </ListSubheader> */}
    <ListItemButton>
      <ListItemIcon>
        <DiscountIcon />
      </ListItemIcon>
      <ListItemText primary="Quản lý mã giảm giá" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <MonetizationOnIcon />
      </ListItemIcon>
      <ListItemText primary="Quản lý quảng cáo" />
    </ListItemButton>
  </React.Fragment>
);