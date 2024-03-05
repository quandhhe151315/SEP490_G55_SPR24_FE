import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


function AddRecipeToMenuDialog({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth maxWidth="xs"
    >
    <DialogTitle>
      {"Thêm recipe vào .."}
      <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }} >
        <CloseIcon/>
      </IconButton>
    </DialogTitle>
    <DialogContent style={{ overflowY:'auto', maxHeight:'20vh'}}>
      <FormGroup>
        <FormControlLabel control={<Checkbox/>} label="menu1"/>
        <FormControlLabel control={<Checkbox/>} label="menu2"/>
        <FormControlLabel control={<Checkbox/>} label="menu3"/>
      </FormGroup>
    </DialogContent>
    <DialogActions>
      <Button>Tạo menu mới</Button>
    </DialogActions>
    </Dialog>
  );
}
export default AddRecipeToMenuDialog;