import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Typography from "@mui/material/Typography";
import GetInformationJWT from "../../components/JWT/GetInformationJWT";
import { getMenus } from "../../services/ApiServices";
import { addRecipeToMenu, removeRecipeFromMenu } from "../../services/ApiServices";


function AddRecipeToMenuDialog({ open, handleClose, onOpenCreate,listMenu,recipeId }) {

  const handleAddRecipeToMenu = async (menuId, recipeId) => {
    try {
      const response = await addRecipeToMenu(menuId, recipeId);
      if (response.status === 200) {
        console.log('add recipe to menu', menuId, recipeId);
      }else{
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
      }else{
        console.log('ko remove thanh cong', response);
      }
    } catch (error) {
      console.error('loi khi remove recipe from menu', error);
    }
  };
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
          <FormGroup>
            {listMenu.map((menu) => (
              <FormControlLabel control={<Checkbox 
                onChange={(e) => {
                  if(e.target.checked){
                    handleAddRecipeToMenu(menu.menuId, recipeId);
                  }else{
                    handleRemoveRecipeFromMenu(menu.menuId, recipeId);
                  }
                }}
              />
            } 
            label={<Typography sx={{ marginLeft: '20px' }}>{menu.menuName}</Typography>} />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={onOpenCreate} >Tạo menu mới</Button>
        </DialogActions>
      </Dialog>


    </div>
  );
}
export default AddRecipeToMenuDialog;