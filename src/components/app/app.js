import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../header';
import Contacts from '../pages/contacts';
import GalleryPage from '../pages/gallery-page';
import MainPage from '../pages/main-page';
import Studio from '../pages/studio';
import AdminCodePage from '../pages/admin-code';
import './app.scss';
import ProjectsDetails from '../project-details';
import LoginPage from '../pages/login-page';
import UserManagementPage from '../pages/user-management';
import * as actions from '../../store/actions';

function App() {
  const dispatch = useDispatch();
  const [refreshToken, setRefreshToken] = useState(true);
  const { authorization } = useSelector(state => state);
  const storageKey = localStorage.getItem(process.env.REACT_APP_STORAGE_VARIABLE);
  const csrfToken = sessionStorage.getItem('csrfToken');

  useEffect(() => {
    if (
      storageKey &&
      storageKey === process.env.REACT_APP_ADMIN_VIEW_KEY &&
      authorization.accessToken === null &&
      csrfToken &&
      refreshToken
    ) {
      dispatch(actions.refreshToken());
      setRefreshToken(false);
    }
  }, []);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/projects" element={<GalleryPage />} />
        <Route path="/projects/:projectId" element={<ProjectsDetails />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/admin-screen-code" element={<AdminCodePage />} />
        {storageKey === authorization.loginScreenCode && <Route path="/login" element={<LoginPage />} />}
        {authorization.isAuthorized && authorization.isAdmin && authorization.isMainAdmin && (
          <Route path="/user-management" element={<UserManagementPage />} />
        )}
        {/* <Route path="/user-management" element={<UserManagementPage />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
