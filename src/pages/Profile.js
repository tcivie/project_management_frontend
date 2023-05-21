import React from 'react';
import {
  Space,
  Button,
  Avatar,
  Menu,
} from 'antd';
import {
  UserOutlined,
  DeleteOutlined,
  SaveOutlined,
  EditOutlined,
  ProfileOutlined,
  StockOutlined,
} from '@ant-design/icons';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Edit post', 'sub1', <EditOutlined />, []),
  getItem('Delete post', 'sub2', <DeleteOutlined />, []),
  getItem('Saved content', 'sub4', <SaveOutlined />, []),
  getItem('Edit Profile', 'sub5', <ProfileOutlined />, []),
  getItem('Statics', 'sub5', <StockOutlined />, []),
];

function Profile() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
    >
      <div>
        <Space direction="vertical" size={16}>
          <Space wrap size={64}>
            <Avatar size={256} icon={<UserOutlined />} />
          </Space>
          <Button type="primary">Follow</Button>
          <Button type="default">Following</Button>
          <Button type="default">Followers</Button>
          <Menu
            style={{
              width: 256,
            }}
            mode="vertical"
            items={items}
          />
        </Space>
      </div>
    </div>
  );
}

export default Profile;
