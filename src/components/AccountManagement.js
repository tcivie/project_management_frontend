import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountManagement = () => {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // Fetch user data from the backend
    axios.get('/api/user')
      .then(response => setUser(response.data))
      .catch(error => console.log(error));
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    // Handle logout functionality and clear user session
  };

  return (
    <div className="account-management">
      <div className="user-icon" onClick={toggleMenu}>
        {/* Render user avatar or initials */}
      </div>
      {showMenu && (
        <div className="menu">
          <ul>
            <li>Profile</li>
            <li>Settings</li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccountManagement;
