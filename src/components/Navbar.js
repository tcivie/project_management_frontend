import React, { useState } from 'react';
import { Menu, Modal } from 'antd';
import { LoginOutlined, UserOutlined, FormOutlined } from '@ant-design/icons';
import RegisterPage from '../pages/Register';

const Navbar = () => {
    const [isRegisterVisible, setRegisterVisible] = useState(false);

    const openRegisterModal = () => {
        setRegisterVisible(true);
    };

    const closeRegisterModal = () => {
        setRegisterVisible(false);
    };

    return (
        <div>
            <Menu mode='horizontal'>
                <Menu.Item key='home' style={{ marginRight: 'auto' }}>
                    InterTourist
                </Menu.Item>
                <Menu.Item
                    key='register'
                    icon={<FormOutlined />}
                    onClick={openRegisterModal}
                >
                    Sign up
                </Menu.Item>
                <Menu.Item key='login' icon={<LoginOutlined />}>
                    Login
                </Menu.Item>
            </Menu>
            <Modal
                visible={isRegisterVisible}
                onCancel={closeRegisterModal}
                footer={null}
                maskClosable={false}
                destroyOnClose
                width={500}
                style={{ top: 20 }}
            >
                <RegisterPage onClose={closeRegisterModal} />
            </Modal>
        </div>
    );
};

export default Navbar;
