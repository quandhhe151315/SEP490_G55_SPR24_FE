import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function CreateNewMenu({open, handleClose}) {
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
                    {"Tạo 1 menu mới"}
                    <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }} >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent style={{ overflowY: 'auto', maxHeight: '20vh' }}>
                    <Typography sx={{ fontSize: '14px', marginTop: '10px', marginLeft: '45px' }}>Thời gian nấu: </Typography>
                    <TextField size="small" type="input" placeholder="Thời gian nấu" sx={{ width: '80%', height: '10%', fontSize: '14px', fontWeight: 'bold', marginLeft: '45px', backgroundColor: '#FFFFFF' }}>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button >Tạo menu mới</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CreateNewMenu;