import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { AuthContextProvider } from './contexts/AuthContext';
import { CommentContextProvider } from './contexts/CommentContext';
import { PageContextProvider } from './contexts/PageContext';
import './index.scss';

ReactDOM.render(
  <AuthContextProvider>
    <PageContextProvider>
      <CommentContextProvider>
        <HashRouter>
          <Layout />
        </HashRouter>
      </CommentContextProvider>
    </PageContextProvider>
  </AuthContextProvider>,
  document.getElementById('freshrimpsushi'),
);
