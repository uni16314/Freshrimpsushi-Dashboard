import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

const HomePage = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.userId && !auth.isLogin) {
      navigate('/login');
    }
  }, [auth, navigate]);

  return (
    <>
      <h2>Home Page!!!</h2>
    </>
  );
};

export default HomePage;
