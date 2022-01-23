import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import * as api from '../lib/api';
import './LoginPage.scss';

const LoginForm = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    inputId: '',
    inputPw: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const baseUrl = `https://freshrimpsushi.com/dashboard/data_api/api/auth/login.php`;
    const formData = api.getFormData({
      admin_id: inputs.inputId,
      admin_password: inputs.inputPw,
    });
    axios
      .post(baseUrl, formData, { 'Content-Type': 'multipart/form-data' })
      .then((response) => {
        const result = response.data;
        if (result.msg) {
          setAuth({
            userId: inputs.inputId,
            isLogin: true,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
    handleReset();
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleReset = () => {
    setInputs({
      inputId: '',
      inputPw: '',
    });
  };

  return (
    <div className="loginForm">
      <h1>
        <img src={require('../../assets/img/logo.png')} alt="logo" />
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="txt_field">
          <input type="text" name="inputId" value={inputs.inputId} onChange={handleChange} placeholder="username" />
          <span></span>
          <label>Username</label>
        </div>
        <div className="txt_field">
          <input type="password" name="inputPw" value={inputs.inputPw} onChange={handleChange} placeholder="******" />
          <span></span>
          <label>Password</label>
        </div>
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
};

const LoginPage = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLogin) {
      sessionStorage.setItem('userId', auth.userId);
      navigate('/');
    }
  }, [auth, navigate]);
  return (
    <div className="login-page">
      <LoginForm auth={auth} setAuth={setAuth} />
    </div>
  );
};

export default LoginPage;
