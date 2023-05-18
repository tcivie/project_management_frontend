import React, { useState } from 'react';
import { Menu, Modal } from 'antd';
import { LoginOutlined, UserOutlined, FormOutlined } from '@ant-design/icons';
import RegisterPage from '../pages/Register';
import LoginForm from './Login';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const userState = useSelector((state) => state.user);
    console.log(userState);
    const [isRegisterVisible, setRegisterVisible] = useState(false);
    const [openKeys, setOpenKeys] = useState([]);
    const openRegisterModal = () => {
        setOpenKeys(['register']);
        setRegisterVisible(true);
    };

    const closeRegisterModal = () => {
        setRegisterVisible(false);
    };

    const closLoginForm = () => {
        setOpenKeys([]);
        console.log(openKeys);
    };
    const openLoginForm = () => {
        if (openKeys.includes('login')) setOpenKeys([]);
        else setOpenKeys(['login']);
        console.log(openKeys);
    };

    return (
        <div>
            <Menu
                mode='horizontal'
                triggerSubMenuAction={'click'}
                openKeys={openKeys}
            >
                <Menu.Item key='home' style={{ marginRight: 'auto' }}>
                    InterTourist
                </Menu.Item>

                <Menu.Item
                    key='register'
                    icon={
                        userState.isAuthenticated ? (
                            <UserOutlined />
                        ) : (
                            <FormOutlined />
                        )
                    }
                    onClick={openRegisterModal}
                >
                    {' '}
                    {userState.isAuthenticated
                        ? 'Hello ' + userState.userData
                        : 'Sign Up'}{' '}
                </Menu.Item>

                {!userState.isAuthenticated && (
                    <Menu.SubMenu
                        key='login'
                        icon={<LoginOutlined />}
                        title='Login'
                        onTitleClick={openLoginForm}
                    >
                        <div style={{ margin: '10px' }}>
                            <LoginForm onClose={closLoginForm} />
                        </div>
                    </Menu.SubMenu>
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
};

export default Navbar;
