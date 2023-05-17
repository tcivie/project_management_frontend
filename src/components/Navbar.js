import React from 'react';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Navbar = () => {
    return (
        <Menu mode="horizontal">
            <Menu.Item key="home" style={{ marginRight: 'auto' }}>
                InterTourist
            </Menu.Item>
            <Menu.Item key="profile" >
                <UserOutlined />
            </Menu.Item>
        </Menu>
    );
}

export default Navbar;