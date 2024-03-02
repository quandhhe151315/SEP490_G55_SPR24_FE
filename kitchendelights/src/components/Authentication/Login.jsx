import Button from '@mui/material/Button'
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../../assets/css/Login.css'
import { Register } from './Register';
import { ForgotPassword } from './ForgotPassword';
import SuccessSnackbar from '../Snackbar/SuccessSnackbar';
import FailSnackbar from '../Snackbar/FailSnackbar';
import {login} from '../../services/ApiServices'

const Login = ({ loginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginForm, setLoginForm] = useState(true);
  const [registerForm, setRegisterForm] = useState(false);
  const [forgotPasswordForm, setForgotPasswordForm] = useState(false);

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
  const [openFailSnackbar, setOpenFailSnackbar] = React.useState(false);
  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      if (response.status === 200) {
        Cookies.set('jwt', response.data);
        setOpenSuccessSnackbar(true);
        loginSuccess();
      } else {
        setOpenFailSnackbar(true);
        console.error('Username or password is not correct! ');
      }
    } catch (error) {
      setOpenFailSnackbar(true);
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

  return (
    <div>
      <FailSnackbar open={openFailSnackbar} text="Username or password is not correct!" />
      <SuccessSnackbar open={openSuccessSnackbar} text="Login successful!" />
      {loginForm && (
        <div className="login-overlay">
          <div className="login-form-container-overlay">
            <div className="login-form">
              <div className="login-container">
                <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <br />
                <Button sx={{ marginTop: "20px", marginLeft: "6px", width: "96%" }} variant="contained" onClick={handleLogin}>Login</Button>
                <div className="bottom-text">
                  No account yet? <Button color="secondary" onClick={openRegisterForm}>Register</Button>
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