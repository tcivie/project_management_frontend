import React, { useState, useEffect } from 'react';
import { Space, Button, Avatar, Upload, message, Modal, Skeleton, List, Empty, Menu, Input, Form } from 'antd';
import {
  UserOutlined,
  UploadOutlined,
  DeleteOutlined,
  SaveOutlined,
  EditOutlined,
  ProfileOutlined,
  StockOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import Cookies from 'js-cookie';

const { SubMenu } = Menu;
const { TextArea } = Input;

function EditProfileForm({ formData, onCancel, onSave }) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData, form]);


  const handleSubmit = async (values) => {
    const isVerified = values.nickname && values.newPassword && values.confirmPassword;
    if (!isVerified) {
      // Return or show an error message indicating verification failed
      return;
    }
    try {
      const formValues = await form.validateFields();
      // Send the updated data to the backend
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/users`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        const data = await response.json();
        onSave(data);
        message.success('Profile updated successfully.');
      } else {
        message.error('Failed to update profile.');
      }
    } catch (error) {
      message.error('Failed to update profile.');
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item name="nickname" label="Nickname">
        <Input />
      </Form.Item>
      <Form.Item name="newPassword" label="New Password">
        <Input.Password />
      </Form.Item>
      <Form.Item name="confirmPassword" label="Confirm Password">
        <Input.Password />
      </Form.Item>
      <div style={{ marginTop: 10 }}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
        <Button style={{ marginLeft: 10 }} onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Form>
  );
}

function Profile() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [followStatus, setFollowStatus] = useState(false);
  const [followersVisible, setFollowersVisible] = useState(false);
  const [followingVisible, setFollowingVisible] = useState(false);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [editFormData, setEditFormData] = useState({
    username: '',
    email: '',
    nickname: '',
  });
  const [searchHistory, setSearchHistory] = useState([]);
  const [uploadHistory, setUploadHistory] = useState([]);
  const [savedContents, setSavedContents] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/chat`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setSearchHistory(data);
        } else {
          message.error('Failed to fetch search history.');
        }
      } catch (error) {
        message.error('Failed to fetch search history.');
      }
    };

    const fetchUploadHistory = async () => {
      try {
        const response = await fetch('/api/upload-history', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setUploadHistory(data);
        } else {
          message.error('Failed to fetch upload history.');
        }
      } catch (error) {
        message.error('Failed to fetch upload history.');
      }
    };

    const fetchSavedContents = async () => {
      try {
        const response = await fetch('/api/saved-contents', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setSavedContents(data);
        } else {
          message.error('Failed to fetch saved contents.');
        }
      } catch (error) {
        message.error('Failed to fetch saved contents.');
      }
    };

    fetchSearchHistory();
    fetchUploadHistory();
    fetchSavedContents();

    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/chat/posts/city/:cityId`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          message.error('Failed to fetch posts.');
        }
      } catch (error) {
        message.error('Failed to fetch posts.');
      }
    };

    fetchPosts();
  }, []);

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

  const handleEditProfileSave = (updatedData) => {
    setEditFormVisible(false);
    setEditFormData((prevData) => ({
      ...prevData,
      ...updatedData,
    }));
  };

  const handleSearchHistoryClick = () => {
    console.log('Search History clicked');
  };

  const handlePostsClick = () => {
    console.log('Posts clicked');
    console.log(posts);
    // You can perform further logic to display the posts in the UI
  };

  const followersData = [];
  const followingData = [];

  return (
    <div style={{ display: 'flex' }}>
      <Menu style={{ width: 256, marginRight: 20, marginTop: 100 }} defaultSelectedKeys={['1']} mode="vertical">
        <Menu.Item key="1" icon={<EditOutlined />} onClick={handlePostsClick}>
          Posts
        </Menu.Item>
        <Menu.Item key="2" icon={<SaveOutlined />}>
          Saved content
        </Menu.Item>
        <Menu.Item key="3" icon={<ProfileOutlined />} onClick={() => setEditFormVisible(true)}>
          Edit Profile
        </Menu.Item>
        <Menu.Item key="4" icon={<StockOutlined />}>
          Statistics
        </Menu.Item>
        <Menu.Item key="5" icon={<HistoryOutlined />} onClick={handleSearchHistoryClick}>
          Search History
        </Menu.Item>
      </Menu>
      <div style={{ flex: 1 }}>
        <div style={{ textAlign: 'center' }}>
          <Avatar
            size={200}
            icon={profilePicture ? null : <UserOutlined />}
            src={profilePicture && URL.createObjectURL(profilePicture)}
          />
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
              <Button icon={<UploadOutlined />}>
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
            <List dataSource={followersData} renderItem={(item) => <List.Item>{item}</List.Item>} />
          ) : (
            <Empty description="No followers." />
          )}
        </Modal>

        <Modal visible={followingVisible} onCancel={handleFollowingClose} centered footer={null}>
          {followingData.length > 0 ? (
            <List dataSource={followingData} renderItem={(item) => <List.Item>{item}</List.Item>} />
          ) : (
            <Empty description="Not following anyone." />
          )}
        </Modal>

        <Modal visible={editFormVisible} onCancel={() => setEditFormVisible(false)} footer={null}>
          <EditProfileForm
            formData={editFormData}
            onCancel={() => setEditFormVisible(false)}
            onSave={handleEditProfileSave}
          />
        </Modal>

        <div style={{ marginTop: 40 }}>
          {savedContents.length > 0 ? (
            <List dataSource={savedContents} renderItem={(item) => <List.Item>{item}</List.Item>} />
          ) : (
            <Empty description="No saved contents." />
          )}
        </div>

        <div style={{ marginTop: 40 }}>
          {searchHistory.length > 0 ? (
            <List dataSource={searchHistory} renderItem={(item) => <List.Item>{item}</List.Item>} />
          ) : (
            <Empty description="No search history." />
          )}
        </div>

        <div style={{ marginTop: 40 }}>
          {uploadHistory.length > 0 ? (
            <List dataSource={uploadHistory} renderItem={(item) => <List.Item>{item}</List.Item>} />
          ) : (
            <Empty description="No upload history." />
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
