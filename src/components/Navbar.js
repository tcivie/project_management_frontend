import React, { useState } from 'react';
import { Menu, Modal, Dropdown, Avatar } from 'antd';
import {
  LoginOutlined,
  UserOutlined,
  FormOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import RegisterPage from '../pages/Register';
import LoginPage from '../pages/Login';

const Navbar = () => {
  const [isRegisterVisible, setRegisterVisible] = useState(false);
  const [isLoginVisible, setLoginVisible] = useState(false);

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
    // Perform logout logic here
    console.log('Logged out');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="account" icon={<UserOutlined />}>
        Account Settings
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home" style={{ marginRight: 'auto' }}>
          InterTourist
        </Menu.Item>
        <Menu.Item
          key="register"
          icon={<FormOutlined />}
          onClick={openRegisterModal}
        >
          Sign up
        </Menu.Item>
        <Menu.Item key="login" icon={<LoginOutlined />} onClick={openLoginModal}>
          Login
        </Menu.Item>
        <Menu.Item key="user" style={{ marginLeft: 'auto' }}>
          <Dropdown overlay={userMenu} placement="bottomRight" arrow>
            <Avatar icon={<UserOutlined />} />
          </Dropdown>
        </Menu.Item>
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
        <LoginPage onClose={closeLoginModal} />
      </Modal>
    </div>
  );
};

export default Navbar;
