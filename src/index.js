import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { AuthContextProvider } from './contexts/AuthContext';
import { CommentContextProvider } from './contexts/CommentContext';
import { PageContextProvider } from './contexts/PageContext';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PageContextProvider>
        <CommentContextProvider>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </CommentContextProvider>
      </PageContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('freshrimpsushi'),
);
