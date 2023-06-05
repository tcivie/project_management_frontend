import React, { useState } from 'react';
import { Space, Button, Avatar, Upload, message, Modal, Skeleton, List, Empty, Menu } from 'antd';
import {
  UserOutlined,
  DeleteOutlined,
  SaveOutlined,
  EditOutlined,
  ProfileOutlined,
  StockOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

function Profile() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [followStatus, setFollowStatus] = useState(false);
  const [followersVisible, setFollowersVisible] = useState(false);
  const [followingVisible, setFollowingVisible] = useState(false);

  const handleProfilePictureUpload = (file) => {
    setProfilePicture(file);
    message.success(`Profile picture uploaded: ${file.name}`);
  };

  const handleUploadChange = (info) => {
    const { status, originFileObj } = info.file;
    if (status === 'done') {
      handleProfilePictureUpload(originFileObj);
    } else if (status === 'error') {
      message.error('Profile picture upload failed.');
    }
  };

  const handleDeletePicture = () => {
    setProfilePicture(null);
    setDeleteModalVisible(false);
    message.success('Profile picture deleted.');
  };

  const showDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const handleFollowToggle = () => {
    setFollowStatus((prevStatus) => !prevStatus);
  };

  const handleFollowersClick = () => {
    setFollowersVisible(true);
  };

  const handleFollowingClick = () => {
    setFollowingVisible(true);
  };

  const handleFollowersClose = () => {
    setFollowersVisible(false);
  };

  const handleFollowingClose = () => {
    setFollowingVisible(false);
  };

  const followersData = [];
  const followingData = [];

  return (
    <div style={{ display: 'flex' }}>
      <Menu
        style={{ width: 256, marginRight: 20, marginTop: 100 }}
        defaultSelectedKeys={['1']}
        mode="vertical"
      >
        <Menu.Item key="1" icon={<EditOutlined />}>
          Edit post
        </Menu.Item>
        <Menu.Item key="2" icon={<DeleteOutlined />}>
          Delete post
        </Menu.Item>
        <Menu.Item key="3" icon={<SaveOutlined />}>
          Saved content
        </Menu.Item>
        <Menu.Item key="4" icon={<ProfileOutlined />}>
          Edit Profile
        </Menu.Item>
        <Menu.Item key="5" icon={<StockOutlined />}>
          Statistics
        </Menu.Item>
      </Menu>
      <div style={{ flex: 1 }}>
        <div style={{ textAlign: 'center' }}>
          <Avatar size={200} icon={profilePicture ? null : <UserOutlined />} src={profilePicture && URL.createObjectURL(profilePicture)} />
          <div style={{ marginTop: 10 }}>
            <Button type={followStatus ? 'default' : 'primary'} onClick={handleFollowToggle}>
              {followStatus ? 'Unfollow' : 'Follow'}
            </Button>
            <Button type="default" onClick={handleFollowingClick}>
              Following
            </Button>
            <Button type="default" onClick={handleFollowersClick}>
              Followers
            </Button>
            <Upload
              name="profilePicture"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleUploadChange}
            >
              <Button>
                {profilePicture ? 'Change Picture' : 'Upload Picture'}
              </Button>
            </Upload>
            {profilePicture && (
              <Button type="link" onClick={showDeleteModal}>
                Delete Picture
              </Button>
            )}
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <Skeleton active paragraph={{ rows: 20 }} />
        </div>

        <Modal visible={deleteModalVisible} onOk={handleDeletePicture} onCancel={hideDeleteModal} centered>
          <p>Are you sure you want to delete your profile picture?</p>
        </Modal>

        <Modal visible={followersVisible} onCancel={handleFollowersClose} centered footer={null}>
          {followersData.length > 0 ? (
            <List
              dataSource={followersData}
              renderItem={(item) => (
                <List.Item>{item}</List.Item>
              )}
            />
          ) : (
            <Empty description="No followers." />
          )}
        </Modal>

        <Modal visible={followingVisible} onCancel={handleFollowingClose} centered footer={null}>
          {followingData.length > 0 ? (
            <List
              dataSource={followingData}
              renderItem={(item) => (
                <List.Item>{item}</List.Item>
              )}
            />
          ) : (
            <Empty description="Not following anyone." />
          )}
        </Modal>
      </div>
    </div>
  );
}

export default Profile;
