import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import PostCommentPage from '../pages/PostCommentPage';
import Sidebar from '../sidebar/Sidebar';
import './Layout.scss';

const Layout = () => {
  const { auth } = useContext(AuthContext);
  return (
    <div className="layout-container">
      {auth.isLogin ? <Sidebar /> : ''}
      <div className="layout-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post" element={<PostCommentPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
