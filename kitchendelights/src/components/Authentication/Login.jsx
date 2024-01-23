import Button from '@mui/material/Button'
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import '/SEP490_G55_SPR24_FE/SEP490_G55_SPR24_FE/kitchendelights/src/assets/css/Login.css';
import { Register } from './Register';
import { ForgotPassword } from './ForgotPassword';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginForm, setLoginForm] = useState(true);

  const [registerForm, setRegisterForm] = useState(false);
  const [forgotPasswordForm, setForgotPasswordForm] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL_LOGIN, {
        username: username,
        password: password,
      });

      if (response.data.jwt) {
        //check cookis -> mai lam
        Cookies.set('jwt', response.data.jwt);
        navigate(response.data.redirectUrl);
      } else {
        console.error('Username or password is not correct! ');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const openRegisterForm = () => {
    setLoginForm(false);
    setRegisterForm(true);
  }

  const openForgotPasswordForm = () => {
    setLoginForm(false);
    setForgotPasswordForm(true);
  }

  const closeForm = () => {
    setLoginForm(false);
  }

  return (
    <div>
      {loginForm && (
        <div className="login-overlay">
          <div className="login-form-container-overlay">
            <div className="login-form">
              <div className="login-container">
                <input type="text" value={username} placeholder="Email" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" onClick={handleLogin}>Login</Button>
                <div className="bottom-text">
                  No account yet? <Button color="secondary" onClick={openRegisterForm}>Register</Button>
                  <CancelPresentationIcon onClick={closeForm}/>
                  <h4><Button variant="text" onClick={openForgotPasswordForm}>Forgot your password?</Button></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
      {registerForm && <Register />}
      {forgotPasswordForm && <ForgotPassword />}
    </div>
  );
};

export { Login }; 