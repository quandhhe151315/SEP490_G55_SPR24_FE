import Button from '@mui/material/Button'
import React, { useState, useContext, useEffect } from 'react';
import '/SEP490_G55_SPR24_FE/SEP490_G55_SPR24_FE/kitchendelights/src/assets/css/Login.css';
import { Login } from './Login';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [loginForm, setLoginForm] = useState(false);
  const [forgotPasswordForm, setForgotPasswordForm] = useState(true);

  const handleForgotPassword = async () => {

  }

  const openLoginForm = () => {
    setForgotPasswordForm(false);
    setLoginForm(true);
  }

  const closeForm = () => {
    setForgotPasswordForm(false);
  }
  return (
    <div>
        {forgotPasswordForm && (
        <div className="login-overlay">
          <div className="login-form-container-overlay">
            <div className="login-form">
              <div className="login-container">
                <input type="text" value={username} placeholder="Enter your email" onChange={(e) => setUsername(e.target.value)} />
                <Button variant="contained" onClick={handleForgotPassword}>Get code by your email</Button>
                <div className="bottom-text">
                  Remember your password? <Button color="secondary" onClick={openLoginForm}>Sign in</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
        {loginForm && <Login />}
    </div>
  );
};

export { ForgotPassword }; 