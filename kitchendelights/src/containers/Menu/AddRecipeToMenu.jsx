import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Typography from "@mui/material/Typography";
import GetInformationJWT from "../../components/JWT/GetInformationJWT";
import { getMenus } from "../../services/ApiServices";
import { addRecipeToMenu, removeRecipeFromMenu } from "../../services/ApiServices";

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { set } from "date-fns";

function AddRecipeToMenuDialog({ open, handleClose, onOpenCreate, listMenu, recipeId }) {

  const [checkedMenus, setCheckedMenus] = useState([]);

  const handleCheckboxChange = (event, menuId) => {
    let newCheckedMenus = [...checkedMenus];
    if (event.target.checked) {
      newCheckedMenus.push(menuId);
      handleAddRecipeToMenu(menuId, recipeId);
    } else {
      newCheckedMenus = newCheckedMenus.filter(id => id !== menuId);
      handleRemoveRecipeFromMenu(menuId, recipeId);
    }
    setCheckedMenus(newCheckedMenus);
  };

  const handleAddRecipeToMenu = async (menuId, recipeId) => {
    try {
      const response = await addRecipeToMenu(menuId, recipeId);
      if (response.status === 200) {
        console.log('add recipe to menu', menuId, recipeId);
      } else {
        console.log('ko add thanh cong', response);
      }
    } catch (error) {
      console.error('loi khi add recipe to menu', error);
    }
  };

  const handleRemoveRecipeFromMenu = async (menuId, recipeId) => {
    try {
      const response = await removeRecipeFromMenu(menuId, recipeId);
      if (response.status === 200) {
        console.log('remove recipe from menu', menuId, recipeId);
      } else {
        console.log('ko remove thanh cong', response);
      }
    } catch (error) {
      console.error('loi khi remove recipe from menu', error);
    }
  };
  
  useEffect(() => {
    setCheckedMenus(listMenu.filter(menu => menu.isExistRecipe).map(menu => menu.menuId));
  }, [listMenu]);

  
  return (

    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        sx={{ borderRadius: "20px", maxWidth: "300px", margin: "auto" }}
      >
        <DialogTitle>
          {"Thêm recipe vào .."}
          <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }} >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ overflowY: 'auto', maxHeight: '20vh' }}>
          
          {listMenu.map((menu) => (
            <FormControlLabel
            key={menu.menuId}
            control={
              <Checkbox
              checked={checkedMenus.includes(menu.menuId)}
              value={menu.menuId}
              onChange={(e) => handleCheckboxChange(e, menu.menuId)}
              />
            }
            label={menu.menuName}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={onOpenCreate} >Tạo menu mới</Button>
        </DialogActions>
      </Dialog>


    </div>
  );
}
export default AddRecipeToMenuDialog;