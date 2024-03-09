import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Typography from "@mui/material/Typography";
import GetInformationJWT from "../../components/JWT/GetInformationJWT";
import { getMenus } from "../../services/ApiServices";

function AddRecipeToMenuDialog({ open, handleClose, onOpenCreate,listMenu }) {

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
              <FormControlLabel control={<Checkbox />} label={<Typography sx={{ marginLeft: '20px' }}>{menu.menuName}</Typography>} />
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