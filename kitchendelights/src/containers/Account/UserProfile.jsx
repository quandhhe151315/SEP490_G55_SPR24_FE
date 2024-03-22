import React from "react";
import AvatarMenu from "../../components/Account/AvatarMenu";
import MyProfile from "./MyProfile";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import ChangePassword from "../Authentication/ChangePassword";
import Appbar from "../../components/Homepage/Appbar";
import MenuDetail from "../Menu/MenuDetail";

function UserProfile() {
    //render component được click
    const [currentComponent, setCurrentComponent] = useState(null);
    const [selectedMenuId, setSelectedMenuId] = useState('');

    const handleClick = (componentName) => {
        setCurrentComponent(componentName);
    };

    const handleMenuSelect = (menuId) => {
        setSelectedMenuId(menuId)
        console.log('menuId', menuId);
    };

    return (
        <div>
        <Appbar />
        <Grid container >
            <Grid item xs={2} sx={{marginLeft: '10%'}}>
                <AvatarMenu handleClick={handleClick} onMenuSelect={handleMenuSelect}/>
            </Grid>
            <Grid item xs={1}  ></Grid>
            <Grid item xs={7}  >
            {currentComponent === 'MyProfile' && <MyProfile />}
            {currentComponent === 'ChangePassword' && <ChangePassword />}
            {currentComponent === 'MenuDetail' && <MenuDetail menuId={selectedMenuId} />}
            </Grid>
        </Grid>
        </div>
    )
}

export default UserProfile;