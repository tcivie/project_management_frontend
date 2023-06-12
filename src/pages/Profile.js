import React, { useState, useEffect } from 'react';
import {
  Button, Avatar, Upload, message, Modal, Skeleton, List, Empty, Menu, Input, Form,
} from 'antd';
import {
  UserOutlined,
  UploadOutlined,
  SaveOutlined,
  EditOutlined,
  ProfileOutlined,
  StockOutlined,
  HistoryOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';

const EditProfileForm = ({ formData, onCancel, onSave }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData, form]);


  const handleSubmit = async (values) => {
    try {
      const formValues = await form.validateFields();
      console.log(formValues);

      // Extract the nickname, password, and passwordConfirmation from the form values
      const { nickname, password, passwordConfirmation } = formValues;

      // Validate password and passwordConfirmation locally
      if (password !== passwordConfirmation) {
        // Return or show an error message indicating password verification failed
        return;
      }

      // Retrieve the email and username from the Redux state
      const { email, username } = userSelector.userData;

      // Construct the updated data object
      const updatedData = {
        email,
        username,
        nickname,
        password,
      };

      // Send the updated data to the backend
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/users`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify(updatedData),
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
      <Form.Item name="email" style={{ display: 'none' }}>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item name="username" style={{ display: 'none' }}>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item name="avatar" label="Avatar">
        <Upload>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item name="password" label="Password">
        <Input.Password />
      </Form.Item>
      <Form.Item name="passwordConfirmation" label="Confirm Password">
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
};


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
  const [followingList, setFollowingList] = useState([]);
  const userSelector = useSelector((state) => state.user);
  const userId = userSelector.userData.id;

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/chat/posts/city/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
      } else {
        message.error('Failed to fetch posts.');
      }
    } catch (error) {
      message.error('Failed to fetch posts.');
    }
  };

  const fetchSearchHistory = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/chat/${userId}`, {
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
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/users/${userId}`, {
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
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/users/${userId}`, {
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

  const fetchFollowingList = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/users/${userId}/following`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setFollowingList(data);
      } else {
        message.error('Failed to fetch following list.');
      }
    } catch (error) {
      message.error('Failed to fetch following list.');
    }
  };

  const handleUploadChange = (info) => {
    const { status, originFileObj } = info.file;
    if (status === 'done') {
      handleProfilePictureUpload(originFileObj);
    } else if (status === 'error') {
      message.error('Profile picture upload failed.');
    }
  };
  
  const handleProfilePictureUpload = async (file) => {
    try {
      // Upload the file to the server or cloud storage
      const formData = new FormData();
      formData.append('profilePicture', file);
  
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/users/${userId}/profile-picture`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        setProfilePicture(file);
        message.success(`Profile picture uploaded: ${file.name}`);
      } else {
        message.error('Failed to upload profile picture.');
      }
    } catch (error) {
      message.error('Failed to upload profile picture.');
    }
  };
  
  const handleDeletePicture = async () => {
    try {
      // Send a request to the server to delete the profile picture
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/users/${userId}/profile-picture`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
  
      if (response.ok) {
        setProfilePicture(null);
        setDeleteModalVisible(false);
        message.success('Profile picture deleted.');
      } else {
        message.error('Failed to delete profile picture.');
      }
    } catch (error) {
      message.error('Failed to delete profile picture.');
    }
  };

  const handleDeleteProfilePicture = () => {
    setProfilePicture(null);
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

  const handlePostsClick = () => {
    fetchPosts();
  };

  const handleSearchHistoryClick = () => {
    fetchSearchHistory();
  };

  const handleUploadHistoryClick = () => {
    fetchUploadHistory();
  };

  const handleSavedContentsClick = () => {
    fetchSavedContents();
  };

  const handleDeleteProfileClick = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
  
      if (response.ok) {
        // Profile successfully deleted
        // You may perform any additional actions after deleting the profile
        // For example, redirecting the user to a different page
        message.success('Profile deleted successfully.');
      } else {
        // Failed to delete profile
        message.error('Failed to delete profile.');
      }
    } catch (error) {
      // Error occurred while deleting profile
      message.error('Failed to delete profile.');
    }
  };

  const followersData = [];
  const followingData = [];

  return (
    <div style={{ display: 'flex' }}>
      <Menu style={{ width: 256, marginRight: 20, marginTop: 100 }} defaultSelectedKeys={['1']} mode="vertical">
        <Menu.Item key="1" icon={<EditOutlined />} onClick={() => handlePostsClick()}>
          Posts
        </Menu.Item>
        <Menu.Item key="2" icon={<SaveOutlined />} onClick={() => handleSavedContentsClick()}>
          Saved content
        </Menu.Item>
        <Menu.Item key="3" icon={<ProfileOutlined />} onClick={() => setEditFormVisible(true)}>
          Edit Profile
        </Menu.Item>
        <Menu.Item key="4" icon={<StockOutlined />}>
          Statistics
        </Menu.Item>
        <Menu.Item key="5" icon={<HistoryOutlined />} onClick={() => handleSearchHistoryClick()}>
          Search History
        </Menu.Item>
        <Menu.Item key="6" icon={<DeleteOutlined />} onClick={handleDeleteProfileClick}>
          Delete Profile
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
              <Button type="link" onClick={handleDeleteProfilePicture}>
                Delete Picture
              </Button>
            )}
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <Skeleton active paragraph={{ rows: 20 }} />
        </div>

        <Modal
          visible={deleteModalVisible}
          onOk={handleDeletePicture}
          onCancel={hideDeleteModal}
          centered
        >
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
      </div>
    </div>
  );
}

export default Profile;
