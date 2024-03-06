import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function FailSnackbar(props) {
    const { open, text, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="error"
                variant="filled"
                sx={{ width: '100%' }}
              >
                {text}
              </Alert>
            </Snackbar>
    );
}

export default FailSnackbar
