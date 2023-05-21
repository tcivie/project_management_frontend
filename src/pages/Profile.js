import React from 'react';
import { Space, Button, Skeleton, Avatar, Menu, Row, Col } from 'antd';
import { UserOutlined, DeleteOutlined, SaveOutlined, EditOutlined } from '@ant-design/icons';

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
  getItem('Edit post', 'sub1', <EditOutlined />, [
  ]),
  getItem('Delete post', 'sub2', <DeleteOutlined />, [
  ]),
  getItem('Saved content', 'sub4', <SaveOutlined />, [
  ]),
];
const onClick = (e) => {
  console.log('click', e);
};
function Profile() {
  return (
    <div>
    <Space direction="vertical" size={16}>
      <Space wrap size={64}>
        <Avatar size={256} icon={<UserOutlined />} />
      </Space>
      <Button type="primary">Follow</Button>
      <Button type="default">Following</Button>
      <Button type="default">Followers</Button>
      <Menu
        onClick={onClick}
        style={{
          width: 256,
        }}
        mode="vertical"
        items={items}
      />
    </Space>
  </div>
  );
}

export default Profile;
