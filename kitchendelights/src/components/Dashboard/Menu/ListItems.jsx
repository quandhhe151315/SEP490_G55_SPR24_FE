import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CategoryIcon from '@mui/icons-material/Category';
import SellIcon from '@mui/icons-material/Sell';
import DiscountIcon from '@mui/icons-material/Discount';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ContactsIcon from '@mui/icons-material/Contacts';
import ListIcon from '@mui/icons-material/List';
import CommentIcon from '@mui/icons-material/Comment';
import { useNavigate } from "react-router-dom";

const ItemButton = ({goToManager, text, Icon}) => {
  return (
  <ListItemButton onClick={goToManager}>
      <ListItemIcon>
        {Icon}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
};

const DashboardItems = () => {
  const navigate = useNavigate();

  const goToDashboardManager = () => {
    // Link toi duong dan
    // navigate('/ListAccount');
  }

  return(
    <React.Fragment>
      <ItemButton goToManager={goToDashboardManager} text="Dashboard" Icon={<DashboardIcon/>}/>
    </React.Fragment>
  );
};

const MainListItems = () => {
  const navigate = useNavigate();

  const goToAccountManager = () => {
    navigate('/ListAccount');
  }

  const goToChefManager = () => {
    // Link toi duong dan
    // navigate('/ListAccount');
  }

  const goToRecipeManager = () => {
    navigate('/ListRecipeDashBoard');
  }

  const goToCategoryManager = () => {
    navigate('/ViewListCategory');
  }

  const goToSubCategoryManager = () => {
    // Link toi duong dan
    // navigate('/ListAccount');
  }

  const goToNewsManager = () => {
    navigate('/ListNews');
  }
  
  const goToBlogsManager = () => {
    // Link toi duong dan
    // navigate('/ListAccount');
  }
  const goToCommentManager = () => {
    navigate('/comment/list');
  }

  return(
    <React.Fragment>
      <ItemButton goToManager={goToAccountManager} text="Quản lý Người dùng" Icon={<PeopleIcon/>}/>
      <ItemButton goToManager={goToChefManager} text="Quản lý Đầu bếp" Icon={<ContactsIcon/>}/>
      <ItemButton goToManager={goToRecipeManager} text="Quản lý Công thức" Icon={<SellIcon/>}/>
      <ItemButton goToManager={goToCategoryManager} text="Quản lý Category" Icon={<CategoryIcon/>}/>
      <ItemButton goToManager={goToSubCategoryManager} text="Quản lý SubCategory" Icon={<ListIcon/>}/>
      <ItemButton goToManager={goToNewsManager} text="Quản lý Tin tức" Icon={<NewspaperIcon/>}/>
      <ItemButton goToManager={goToBlogsManager} text="Quản lý Blog" Icon={<ArtTrackIcon/>}/>
      <ItemButton goToManager={goToCommentManager} text="Quản lý Bình luận" Icon={<CommentIcon/>}/>
    </React.Fragment>
  );
};

const SecondaryListItems = () => {
  const navigate = useNavigate();

  const goToDiscountManager = () => {
    // Link toi duong dan
    // navigate('/ListAccount');
  }

  const goToAdsManager = () => {
    // Link toi duong dan
    // navigate('/ListAccount');
  }

  return (
    <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Dịch vụ
    </ListSubheader> */}
      <ItemButton goToManager={goToDiscountManager} text="Quản lý mã giảm giá" Icon={<DiscountIcon/>}/>
      <ItemButton goToManager={goToAdsManager} text="Quản lý quảng cáo" Icon={<MonetizationOnIcon/>}/>
    </React.Fragment>
  );
};

export {DashboardItems, MainListItems, SecondaryListItems};