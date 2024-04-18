import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import CategoryIcon from "@mui/icons-material/Category";
import SellIcon from "@mui/icons-material/Sell";
import DiscountIcon from "@mui/icons-material/Discount";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ContactsIcon from "@mui/icons-material/Contacts";
import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import Cookies from "js-cookie";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from "@mui/icons-material/Logout";

const ItemButton = ({ goToManager, text, Icon }) => {
  return (
    <ListItemButton onClick={goToManager}>
      <ListItemIcon>{Icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
};

const DashboardItems = () => {
  const navigate = useNavigate();

  const goToDashboardManager = () => {
    navigate("/DashBoardMenu");
  };

  return (
    <React.Fragment>
      <ItemButton
        goToManager={goToDashboardManager}
        text="Dashboard"
        Icon={<DashboardIcon />}
      />
    </React.Fragment>
  );
};

const MainListItems = () => {
  const navigate = useNavigate();

  const goToAccountManager = () => {
    navigate("/ListAccount");
  };

  const goToChefManager = () => {
    navigate("/ChefVerificationManagement");
  };

  const goToRecipeManager = () => {
    navigate("/ListRecipeDashBoard");
  };

  const goToCategoryManager = () => {
    navigate("/ViewListCategory");
  };

  const goToNewsManager = () => {
    navigate("/ListNews");
  };

  const goToBlogsManager = () => {
    navigate("/blog/management");
  };
  const goToCommentManager = () => {
    navigate("/comment/list");
  };

  return (
    <React.Fragment>
      <ItemButton
        goToManager={goToAccountManager}
        text="Quản lý Người dùng"
        Icon={<PeopleIcon />}
      />
      <ItemButton
        goToManager={goToChefManager}
        text="Quản lý Đầu bếp"
        Icon={<ContactsIcon />}
      />
      <ItemButton
        goToManager={goToRecipeManager}
        text="Quản lý Công thức"
        Icon={<SellIcon />}
      />
      <ItemButton
        goToManager={goToCategoryManager}
        text="Quản lý Category"
        Icon={<CategoryIcon />}
      />
      <ItemButton
        goToManager={goToNewsManager}
        text="Quản lý Tin tức"
        Icon={<NewspaperIcon />}
      />
      <ItemButton
        goToManager={goToBlogsManager}
        text="Quản lý Blog"
        Icon={<ArtTrackIcon />}
      />
      <ItemButton
        goToManager={goToCommentManager}
        text="Quản lý Bình luận"
        Icon={<CommentIcon />}
      />
    </React.Fragment>
  );
};

const SecondaryListItems = () => {
  const navigate = useNavigate();

  const goToDiscountManager = () => {
    // Link toi duong dan
    // navigate('/ListAccount');
  };

  const goToAdsManager = () => {
    navigate("/AdsManagement");
  };

  const goToStoreManager = () => {
    navigate("/Marketplace");
  };

  return (
    <React.Fragment>
      {/* <ListSubheader component="div" inset>
      Dịch vụ
    </ListSubheader> */}
      <ItemButton
        goToManager={goToAdsManager}
        text="Quản lý quảng cáo"
        Icon={<MonetizationOnIcon />}
      />
      <ItemButton
        goToManager={goToStoreManager}
        text="Quản lý cửa hàng liên kết"
        Icon={<StoreIcon />}
      />
    </React.Fragment>
  );
};

const PersonalListItems = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/KitchenDelights');
  };

  const logout = () => {
    Cookies.remove("jwt");
    Cookies.remove("userId");
    Cookies.remove("role");
    navigate("/KitchenDelights");
  };

  return (
    <React.Fragment>
      <ItemButton
        goToManager={goToHomePage}
        text="Kitchen Delights"
        Icon={<ArrowBackIcon />}
      />
      <ItemButton goToManager={logout} text="Đăng xuất" Icon={<LogoutIcon />} />
    </React.Fragment>
  );
};

export { DashboardItems, MainListItems, SecondaryListItems, PersonalListItems };
