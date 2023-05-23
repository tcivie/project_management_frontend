import React, { useState } from 'react';
import { Space, Button, Skeleton, Avatar, Menu, Row, Col, List } from 'antd';
import { ProfileOutlined, DeleteOutlined, SaveOutlined, EditOutlined, StockOutlined, UserOutlined } from '@ant-design/icons';

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

const onClick = (e) => {
  console.log('click', e);
};

function Profile() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersVisible, setFollowersVisible] = useState(false);
  const [followingVisible, setFollowingVisible] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowing((prevState) => !prevState);
  };

  const handleFollowersClick = () => {
    setFollowersVisible(!followersVisible);
    setFollowingVisible(false); // Close following list
  };

  const handleFollowingClick = () => {
    setFollowingVisible(!followingVisible);
    setFollowersVisible(false); // Close followers list
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Space size={128} align="center">
            <Avatar size={256} icon={<UserOutlined />} />
          </Space>
          <Space>
            <Button type={isFollowing ? 'default' : 'primary'} onClick={handleFollowToggle}>
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
            <Button type="default" onClick={handleFollowingClick}>
              Following
            </Button>
            <Button type="default" onClick={handleFollowersClick}>
              Followers
            </Button>
          </Space>
        </div>
        {followersVisible && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
            <List
              header={<div>Followers</div>}
              bordered
              dataSource={['No followers']} // Replace with your follower data
              renderItem={(item) => <List.Item>{item}</List.Item>}
              style={{ width: 300 }}
            />
          </div>
        )}
        {followingVisible && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
            <List
              header={<div>Following</div>}
              bordered
              dataSource={['No following content']} // Replace with your following data
              renderItem={(item) => <List.Item>{item}</List.Item>}
              style={{ width: 300 }}
            />
          </div>
        )}
      </Col>
      <Col span={18}>
        <Menu onClick={onClick} style={{ width: 256 }} mode="vertical" items={items} />
      </Col>
    </Row>
  );
}

export default Profile;
