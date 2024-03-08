import React, { createContext, useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [stateSnackbar, setStateSnackbar] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const showSnackbar = (message, state) => {
    setText(message);
    setOpen(true);
    // stateSnackbar có 2 giá trị là "error" hoặc "success"
    setStateSnackbar(state);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={stateSnackbar}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {text}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error(
      'useSuccessSnackbar must be used within a SuccessSnackbarProvider'
    );
  }
  return context;
};
