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
    <div style={{
      position: 'fixed', zIndex: 1, width: '100%', top: 0,
    }}
    >
      <Menu mode="horizontal" triggerSubMenuAction="click" openKeys={openKeys}>
        <Menu.Item key="home" style={{ marginRight: 'auto' }}>
          InterTourist
        </Menu.Item>

        <Menu.Item
          key="register"
          icon={userState.isAuthenticated ? <UserOutlined /> : <FormOutlined />}
          onClick={!userState.isAuthenticated ? openRegisterModal : closeRegisterModal}
        >
          {userState.isAuthenticated ? (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <span role="presentation" onClick={profileButtonClick}>Hello {userState.userData}</span>
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
            <div style={{ margin: '10px' }}>
              <LoginForm onClose={closLoginForm} />
            </div>
          </Menu.SubMenu>
        )}
        {userState.isAuthenticated && (
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logOut}>
            Log Out
          </Menu.Item>
        )}
      </Menu>

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
    </div>
  );
}

export default Navbar;
