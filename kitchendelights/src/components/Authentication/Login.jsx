import Button from '@mui/material/Button'
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../../assets/css/Login.css'
import { Register } from './Register';
import { ForgotPassword } from './ForgotPassword';

const Login = ({ loginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginForm, setLoginForm] = useState(true);
  const [registerForm, setRegisterForm] = useState(false);
  const [forgotPasswordForm, setForgotPasswordForm] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL_LOGIN, {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        Cookies.set('jwt', response.data);
        loginSuccess();
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

  return (
    <div>
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