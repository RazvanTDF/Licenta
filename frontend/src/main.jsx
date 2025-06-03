import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import AuthPage from './pages/AuthPage.jsx';
import UserProfilePage from './pages/UserProfilePage.jsx';
import AdminDispeceriPage from './pages/AdminDispeceriPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Workspace from './pages/Workspace.jsx';
import Help from './pages/Help';




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />

        <Route path="/help" element={<Help />} />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <UserProfilePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/dispeceri"
          element={
            <PrivateRoute>
              <AdminDispeceriPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/workspace"
          element={
            <PrivateRoute>
              <Workspace />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
