import React from 'react';
import { Space, Button, Skeleton,Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function Profile() {
  return (
    <div>
        <Space direction="vertical" size={16}>
    <Space wrap size={64}>
      <Avatar size={256} icon={<UserOutlined />} />
    </Space>
  </Space>
        <Button type="primary">Follow</Button>
        <Button type="default">Following</Button>
        <Button type="default">Followers</Button>
    </div>
  );
}

export default Profile;
