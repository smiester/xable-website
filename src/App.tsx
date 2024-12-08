import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { PublicLayout } from './components/layout/PublicLayout';
import { CMSLayout } from './components/cms/CMSLayout';
import { LoginPage } from './components/auth/LoginPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicLayout />} />
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/cms" replace /> : <LoginPage />
        } />
        <Route path="/cms/*" element={
          <ProtectedRoute>
            <CMSLayout />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}