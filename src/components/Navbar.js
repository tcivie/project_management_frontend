import React, { useEffect, useState } from 'react';
import { Menu, Modal } from 'antd';
import {
  LoginOutlined,
  UserOutlined,
  FormOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RegisterPage from '../pages/Register';
import LoginForm from './Login';
import { userLogout } from '../redux/actions/userActions';

function Navbar() {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isRegisterVisible, setRegisterVisible] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const navigate = useNavigate();

  const openRegisterModal = () => {
    setOpenKeys(['register']);
    setRegisterVisible(true);
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(userState));
  }, [userState]);

  const closeRegisterModal = () => {
    setRegisterVisible(false);
  };

  const closLoginForm = () => {
    setOpenKeys([]);
  };

  const openLoginForm = () => {
    if (openKeys.includes('login')) setOpenKeys([]);
    else setOpenKeys(['login']);
  };

  const logOut = () => {
    dispatch(userLogout());
  };

  const profileButtonClick = () => {
    navigate('/profile');
  };

  return (
    <Menu
      mode="horizontal"
      triggerSubMenuAction="click"
      openKeys={openKeys}
      style={{ position: 'fixed', width: '100%' }}
    >
      <Menu.Item key="home" onClick={() => { navigate('/'); }} style={{ marginRight: 'auto' }}>
        InterTourist
      </Menu.Item>

      <Menu.Item
        key="register"
        icon={userState.isAuthenticated ? <UserOutlined /> : <FormOutlined />}
        onClick={!userState.isAuthenticated ? openRegisterModal : closeRegisterModal}
      >
        {userState.isAuthenticated ? (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <span role="presentation" onClick={profileButtonClick}>Hello {userState.userData.username}</span>
        ) : (
          'Sign Up'
        )}
      </Menu.Item>

      {!userState.isAuthenticated && (
      <Menu.SubMenu
        key="login"
        icon={<LoginOutlined />}
        title="Login"
        onTitleClick={openLoginForm}
      >
        <div>
          <LoginForm onClose={closLoginForm} />
        </div>
      </Menu.SubMenu>
      )}
      {userState.isAuthenticated && (
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logOut}>
        Log Out
      </Menu.Item>
      )}
      <Menu.Item>
        <Modal
          open={isRegisterVisible}
          onCancel={closeRegisterModal}
          footer={null}
          maskClosable={false}
          destroyOnClose
          width={500}
          centered
        >
          <RegisterPage onClose={closeRegisterModal} />
        </Modal>
      </Menu.Item>
    </Menu>
  );
}

export default Navbar;
