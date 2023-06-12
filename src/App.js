import React from 'react';
import {
  BrowserRouter, Navigate, Route, Routes, useLocation,
} from 'react-router-dom';
import Cookies from 'js-cookie';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import ChatPage from './pages/ChatPage';
import Navbar from './components/Navbar';
import Message from './components/Message';
import LoginPage from './pages/LoginPage';

function isTokenExpired() {
  const token = Cookies.get('token');
  if (!token) return true;
  const decoded = jwt_decode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
}

function ProtectedRoute({ element }) {
  const location = useLocation();

  // Check if the token has expired
  if (isTokenExpired()) {
    // If the token has expired, redirect to the login page
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // If the token is still valid, render the route
  return element;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Message />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/chat" element={<ProtectedRoute element={<ChatPage />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
