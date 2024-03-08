import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Typography from "@mui/material/Typography";

function AddRecipeToMenuDialog({open, handleClose, onOpenCreate}) {
 
  // const [openDialogMenu, setOpenDialogMenu] = useState(false);

  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  // const handleOpenDialogMenu = () => {
  //   setOpenDialogMenu(true);
  // };

  // const handleCloseDialogMenu = () => {
  //   setOpenDialogMenu(false);
  // };
 
  return (

    <div>
      {/* nút add to menu
      <Button
        onClick={handleOpenDialogMenu}
        size="small"
        variant="contained"
        sx={{
          bgcolor: "#ff5e00",
          borderRadius: "15px",
          width: "150px",
          height: "35px",
          color: "white",
          size: "20px",
          fontSize: "12px",
        }}
        endIcon={<MenuBookIcon />}
      >
        Thêm vào menu
      </Button>
      <AddRecipeToMenuDialog
        open={openDialogMenu}
        handleClose={handleCloseDialogMenu}
      /> */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        sx={{ borderRadius: "20px", maxWidth: "300px", margin: "auto"}}
      >
        <DialogTitle>
          {"Thêm recipe vào .."}
          <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }} >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ overflowY: 'auto', maxHeight: '20vh' }}>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label={<Typography sx={{ marginLeft: '20px' }}>menu 1</Typography>} />
            <FormControlLabel control={<Checkbox />} label={<Typography sx={{ marginLeft: '20px' }}>menu 2</Typography>} />
            <FormControlLabel control={<Checkbox />} label={<Typography sx={{ marginLeft: '20px' }}>menu 3</Typography>} />
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