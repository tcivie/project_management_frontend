import React from 'react';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

const navBar = <Navbar />;
const home = <HomePage />;
function App() {
  return (
    <div>
      {navBar}
      {home}
    </div>
  );
}

export default App;
