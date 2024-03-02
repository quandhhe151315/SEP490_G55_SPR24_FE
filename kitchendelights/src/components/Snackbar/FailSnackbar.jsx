import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function FailSnackbar(props) {
    const { open, text } = props;
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setSnackbarOpen(open);
  }, [open]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

    return (
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
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
