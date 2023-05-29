import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import ChatPage from './pages/ChatPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div style={{ height: '100vh' }}>
        <div style={{ height: '5vh' }}>
          <Navbar />
        </div>
        <div style={{ height: '95vh' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
