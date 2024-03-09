import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import GetInformationJWT from "../../components/JWT/GetInformationJWT";
import { createMenu } from "../../services/ApiServices";

function CreateNewMenu({ open, handleClose}) {

    const [menuName, setMenuName] = useState('');
    const [error, setError] = useState(false);
    const [id, setId] = useState('');

    const handleCreateMenu = async () => {
        if (menuName.trim() === '') {
            setError(true);
        } else {
            setError(false);
            try {
                const response = await createMenu(id, menuName);
                if (response.status === 200) {
                    handleClose();
                } else {
                    console.error('lỗi khi tạo menu');
                }
            } catch (error) {
                console.error('lỗi API createMenu', error);
            }
        }
    };
    
    return (

        <div>
            <GetInformationJWT setId={setId}/>
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
                    <Typography sx={{ fontSize: '14px', marginTop: '10px', marginLeft: '5px', marginBottom: '15px' }}>Tên menu: </Typography>
                    <TextField
                        value={menuName}
                        onChange={(e) => setMenuName(e.target.value)}
                        error={error}
                        helperText={error ? 'Tên menu không được để trống' : ''}
                        variant="standard"
                        size="small"
                        type="input"
                        placeholder="Điền tên menu muốn tạo"
                        sx={{ width: '100%', height: '20%', fontSize: '14px', fontWeight: 'bold', marginLeft: '5px', backgroundColor: '#FFFFFF' }}>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateMenu} >Tạo </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CreateNewMenu;