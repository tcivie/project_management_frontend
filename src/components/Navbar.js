import React, { useState, useEffect } from 'react';
import { Menu, Modal, Avatar, message } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  FormOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import RegisterPage from '../pages/Register';
import LoginPage from '../pages/Login';
import axios from 'axios';

const Navbar = () => {
  const [isRegisterVisible, setRegisterVisible] = useState(false);
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from the server and update the user state
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_SERVER}/api/user`);
        if (response.status === 200) {
          const user = response.data.user;
          setUser(user);
        }
      } catch (error) {
        console.error('Error retrieving user:', error);
      }
    };

    fetchUser();
  }, []);

  const openRegisterModal = () => {
    setRegisterVisible(true);
  };

  const closeRegisterModal = () => {
    setRegisterVisible(false);
  };

  const openLoginModal = () => {
    setLoginVisible(true);
  };

  const closeLoginModal = () => {
    setLoginVisible(false);
  };

  const handleLogout = () => {
    // Perform logout logic
    setUser(null);
    message.success('Logged out successfully.');
  };

  const handleLogin = async (values) => {
    try {
      // Perform login logic
      const response = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/api/login`,
        values
      );

      if (response.status === 200) {
        const user = response.data.user;
        setUser(user);
        message.success('Logged in successfully.');
        closeLoginModal();
      } else {
        const error = response.data?.message || 'Login failed.';
        message.error(error);
      }
    } catch (error) {
      message.error('An error occurred during login.');
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home" style={{ marginRight: 'auto' }}>
          InterTourist
        </Menu.Item>
        <Menu.SubMenu
          key="userSettings"
          icon={
            user && user.profileImage ? (
              <Avatar src={user.profileImage} />
            ) : (
              <Avatar icon={<UserOutlined />} />
            )
          }
          title={user ? user.username : 'User'}
        >
          {user ? (
            <>
              <Menu.Item key="accountSettings" icon={<SettingOutlined />}>
                Account Settings
              </Menu.Item>
              <Menu.Item key="definitions" icon={<UserOutlined />}>
                Definitions
              </Menu.Item>
              <Menu.Item key="history" icon={<UserOutlined />}>
                History
              </Menu.Item>
              <Menu.Item key="disengagement" icon={<UserOutlined />}>
                Disengagement
              </Menu.Item>
              <Menu.Item
                key="logout"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                Logout
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item
                key="register"
                icon={<FormOutlined />}
                onClick={openRegisterModal}
              >
                Sign up
              </Menu.Item>
              <Menu.Item
                key="login"
                icon={<LoginOutlined />}
                onClick={openLoginModal}
              >
                Login
              </Menu.Item>
            </>
          )}
        </Menu.SubMenu>
      </Menu>
      <Modal
        visible={isRegisterVisible}
        onCancel={closeRegisterModal}
        footer={null}
        maskClosable={false}
        destroyOnClose
        width={500}
        centered
      >
        <RegisterPage onClose={closeRegisterModal} />
      </Modal>
      <Modal
        visible={isLoginVisible}
        onCancel={closeLoginModal}
        footer={null}
        maskClosable={false}
        destroyOnClose
        width={500}
        centered
      >
        <LoginPage onClose={closeLoginModal} onLogin={handleLogin} />
      </Modal>
    </div>
  );
};

export default Navbar;
