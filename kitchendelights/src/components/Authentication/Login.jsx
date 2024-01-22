import Button from '@mui/material/Button'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import '/SEP490_G55_SPR24_FE/SEP490_G55_SPR24_FE/kitchendelights/src/assets/css/Login.css';

const Login = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setshowRegister] = useState(false);
  const [showForgotPassword, setshowForgotPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

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
        closeLoginForm();
      } else {
        console.error('Username or password is not correct! ');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL_REGISTER, {
        username: username,
        password: password,
        repassword: repassword,
      });

    } catch (error) {
      console.error('Register error:', error);
    }
  };

  const handleForgotPassword = async () => {

  }

  const showLoginForm = () => {
    closeForgotPasswordForm();
    closeRegisterForm();
    setShowLogin(true);
  };

  const closeLoginForm = () => {
    setShowLogin(false);
  };

  const showRegisterForm = () => {
    closeLoginForm();
    closeForgotPasswordForm();
    setshowRegister(true);
  };

  const closeRegisterForm = () => {
    setshowRegister(false);
  };

  const showForgotPasswordForm = () => {
    closeLoginForm();
    closeRegisterForm();
    setshowForgotPassword(true);
  };

  const closeForgotPasswordForm = () => {
    setshowForgotPassword(false);
  };

  return (
    <div>
      <button className='btnLogin' onClick={showLoginForm}>Login</button>
      {showLogin && (
        <div className="login-overlay">
          <div className="login-form-container-overlay">
            <div className="login-form">
              <div className="login-container">
                <input type="text" value={username} placeholder="Email" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" onClick={handleLogin}>Login</Button>
                <div className="bottom-text">
                  No account yet? <Button color="secondary" onClick={showRegisterForm}>Register</Button>
                  <h4><Button variant="text" onClick={showForgotPasswordForm}>Forgot your password?</Button></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showRegister && (
        <div className="login-overlay">
          <div className="login-form-container-overlay">
            <div className="login-form">
              <div className="login-container">
                <input type="text" value={username} placeholder="Enter your email" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                <input type="password" value={repassword} placeholder="Re-enter your password" onChange={(e) => setRepassword(e.target.value)} />
                <Button variant="contained" onClick={handleRegister}>Register</Button>
                <div className="bottom-text">
                  Have account? <Button color="secondary" onClick={showLoginForm}>Sign in</Button>
                  <h4><Button variant="text" onClick={showForgotPasswordForm}>Forgot your password?</Button></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showForgotPassword && (
        <div className="login-overlay">
          <div className="login-form-container-overlay">
            <div className="login-form">
              <div className="login-container">
                <input type="text" value={username} placeholder="Enter your email" onChange={(e) => setUsername(e.target.value)} />
                <Button variant="contained" onClick={handleForgotPassword}>Get code by your email</Button>
                <div className="bottom-text">
                  Remember your password? <Button color="secondary" onClick={showLoginForm}>Sign in</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { Login }; 