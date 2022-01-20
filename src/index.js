import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { AuthContextProvider } from './contexts/AuthContext';
import { CommentContextProvider } from './contexts/CommentContext';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CommentContextProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </CommentContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('freshrimpsushi'),
);
