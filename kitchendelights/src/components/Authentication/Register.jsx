import Button from '@mui/material/Button'
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import '../../assets/css/Login.css';
import { Login } from './Login';
import { ForgotPassword } from './ForgotPassword';
import { useNavigate } from "react-router-dom";
import {register} from '../../services/ApiServices'

const Register = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

  const [forgotPasswordForm, setForgotPasswordForm] = useState(false);
  const [registerForm, setRegisterForm] = useState(true);
  const handleRegister = async () => {
    try {
      const response = await register(username, email, password);
      if (response.status === 200) {
        openLoginForm();
        navigate('/KitchenDelights');
      } else {
        console.error('Username or password is not correct!');
      }
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  const openLoginForm = () => {
    setRegisterForm(false);
    setLoginForm(true);
  }

  const openForgotPasswordForm = () => {
    setRegisterForm(false)
    setForgotPasswordForm(true);
  }

  return (
    <div>
        {registerForm && (
        <div className="login-overlay">
          <div className="login-form-container-overlay">
            <div className="login-form">
              <div className="login-container">
                <input type="text" value={username} placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
                <input type="text" value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                <input type="password" value={repassword} placeholder="Re-enter your password" onChange={(e) => setRepassword(e.target.value)} />
                <br />
                <Button sx={{ marginTop: "20px", marginLeft: "6px", width: "96%" }} variant="contained" onClick={handleRegister}>Register</Button>
                <div className="bottom-text">
                  Have account? <Button color="secondary" onClick={openLoginForm}>Sign in</Button>
                  <h4><Button variant="text" onClick={openForgotPasswordForm}>Forgot your password?</Button></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
        {loginForm && <Login />}
      {forgotPasswordForm && <ForgotPassword />}
    </div>
  );
};

export { Register }; 