import React, { useState, useEffect } from 'react';
import {
  Button, Avatar, Upload, message, Modal, Skeleton, List, Empty, Menu, Input, Form, Col, Row, Statistic, Layout,
} from 'antd';
import {
  UserOutlined,
  UploadOutlined,
  SaveOutlined,
  EditOutlined,
  ProfileOutlined,
  StockOutlined,
  HistoryOutlined,
  LikeOutlined,
} from '@ant-design/icons';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';

function EditProfileForm({ formData, onCancel, onSave }) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData, form]);

  const handleSubmit = async () => {
    try {
      const formValues = await form.validateFields();
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
        message.error('Failed to update profile ');
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
      <Form.Item name="email" label="Email">
        <Input />
      </Form.Item>
      <Form.Item name="username" label="Username">
        <Input />
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
  const [statisticsVisible, setStatisticsVisible] = useState(false);
  const [displayContent, setDisplayContent] = useState(false);
  const [posts, setPosts] = useState([]);
  const userSelector = useSelector((state) => state.user);
  const userId = userSelector.userData.id;
  const name = userSelector.userData.username;
  const { Header, Content, Sider } = Layout;

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/chat/posts/city/57438`, {
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
        setDisplayContent(true); // Set displayContent state to true
      } else {
        console.error('Failed to fetch posts.');
      }
    } catch (error) {
      console.error('Failed to fetch posts.', error);
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

  const handleProfilePictureUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/images/userAvatar`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        message.success(`Profile picture uploaded: ${file.name}`);
      } else {
        message.error('Failed to upload profile picture.');
      }
    } catch (error) {
      message.error('Failed to upload profile picture.');
    }
  };

  const handleUploadChange = async (info) => {
    const { status, originFileObj } = info.file;
    if (status === 'done') {
      try {
        const response = await handleProfilePictureUpload(originFileObj);
        if (response.ok) {
          // Assuming the response contains the new image URL
          const newImageUrl = await response.json();

          // Update the profilePicture state with the new image URL
          setProfilePicture(newImageUrl);

          message.success('Profile picture uploaded successfully.');
        } else {
          message.error('Failed to upload profile picture.');
        }
      } catch (error) {
        message.error('Failed to upload profile picture.');
      }
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

  const handleFollowToggle = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/users/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify({ id: userIdToFollow }), // Replace userIdToFollow with the appropriate user ID
        credentials: 'include',
      });

      if (response.ok) {
        message.success('User followed successfully.');
      } else {
        message.error('Failed to follow user.');
      }
    } catch (error) {
      message.error('Failed to follow user.');
    }
  };

  const handleUnfollowToggle = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/users/unfollow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify({ id: userIdToUnfollow }), // Replace userIdToUnfollow with the appropriate user ID
        credentials: 'include',
      });

      if (response.ok) {
        message.success('User unfollowed successfully.');
      } else {
        message.error('Failed to unfollow user.');
      }
    } catch (error) {
      message.error('Failed to unfollow user.');
    }
  };

  const handleFollowersClick = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/followers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setFollowersData(data);
        setFollowersVisible(true);
      } else {
        message.error('Failed to fetch followers.');
      }
    } catch (error) {
      message.error('Failed to fetch followers.');
    }
  };

  const handleFollowingClick = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/following`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setFollowingData(data);
        setFollowingVisible(true);
      } else {
        message.error('Failed to fetch following list.');
      }
    } catch (error) {
      message.error('Failed to fetch following list.');
    }
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

  const handleEditPost = async (postId) => {
    // Implement your code to handle the edit post functionality
    // Send a request to the server to update the post with the given postId
    // You can use the `fetch` function or a library like Axios to make the request
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/chat/update/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify({
          // Provide the updated post data here
          // Example: title, content, etc.
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle the successful update of the post
        message.success('Post updated successfully.');
      } else {
        // Handle the error case when the post update fails
        message.error('Failed to update post.');
      }
    } catch (error) {
      // Handle any network or server errors
      message.error('Failed to update post.');
    }
  };

  const handleDeleteProfileClick = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/users/${userSelector.userData.userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
          'X-User-Roles': 'admin',
        },
        credentials: 'include',
      });

      if (response.ok) {
        message.success('Profile deleted successfully.');
      } else {
        message.error('Failed to delete profile.');
      }
    } catch (error) {
      message.error('Failed to delete profile.');
    }
  };

  const handlePostsClick = () => {
    fetchPosts();
  };

  const handleSearchHistoryClick = () => {
    fetchSearchHistory();
  };

  function handleStatisticsClick() {
    setStatisticsVisible(true);
  }

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/chat/posts/delete/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        // Remove the deleted post from the posts array
        setPosts((prevPosts) => prevPosts.filter((post) => post.postId !== postId));
        message.success('Post deleted successfully.');
      } else {
        message.error('Failed to delete post.');
      }
    } catch (error) {
      message.error('Failed to delete post.');
    }
  };
  const followersData = [];
  const followingData = [];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: '#fff',
          padding: '24px',
          flex: '0 0 25%',
          marginTop: '8px',
          marginBottom: '32px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            size={150}
            icon={profilePicture ? null : <UserOutlined />}
            src={profilePicture && typeof profilePicture === 'string' ? profilePicture : undefined}
            onClick={() => document.getElementById('profilePictureUpload').click()}
          />
          <h2 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: '8px' }}>{name}</h2>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <Button type={followStatus ? 'default' : 'primary'} onClick={handleFollowToggle} size="large" style={{ marginRight: '8px' }}>
              {followStatus ? 'Unfollow' : 'Follow'}
            </Button>
            <Button type="default" onClick={handleFollowingClick} size="large" style={{ marginRight: '8px' }}>
              Following
            </Button>
            <Button type="default" onClick={handleFollowersClick} size="large">
              Followers
            </Button>
          </div>
          <input id="profilePictureUpload" type="file" style={{ display: 'none' }} onChange={(e) => handleUploadChange(e.target.files[0])} />
          {profilePicture && (
            <Button type="link" onClick={showDeleteModal}>
              Delete Picture
            </Button>
          )}
        </div>
      </Header>
      <Layout>
        <Sider width={256} style={{ background: '#fff' }}>
          <Menu defaultSelectedKeys={['1']} mode="vertical">
            <Menu.Item key="1" icon={<EditOutlined />} onClick={() => handlePostsClick()}>
              User Posts
            </Menu.Item>
            <Menu.Item key="2" icon={<ProfileOutlined />} onClick={() => setEditFormVisible(true)}>
              Edit Profile
            </Menu.Item>
            <Menu.Item key="3" icon={<StockOutlined />} onClick={handleStatisticsClick}>
              Statistics
            </Menu.Item>
            <Menu.Item key="4" icon={<HistoryOutlined />} onClick={() => handleSearchHistoryClick()}>
              Search History
            </Menu.Item>
            <Menu.Item key="5" icon={<ProfileOutlined />} onClick={handleDeleteProfileClick}>
              Delete Profile
            </Menu.Item>
          </Menu>
        </Sider>
        <Content>
      <div style={{ padding: 30, background: '#fff', minHeight: 360 }}>
        {posts.length > 0 ? (
          <List
            dataSource={posts}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button type="link" onClick={() => handleEditPost(item.postId)}>Edit</Button>,
                  <Button type="link" onClick={() => handleDeletePost(item.postId)}>Delete</Button>,
                ]}
              >
                <div>
                  <h3>{item.post.title}</h3>
                  {item.post.content}
                </div>
              </List.Item>
            )}
          />
        ) : (
          <Empty description="No posts found." />
        )}
      </div>

          <Skeleton active paragraph={{ rows: 20 }} />
        </Content>
      </Layout>
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
      <Modal visible={statisticsVisible} onCancel={() => setStatisticsVisible(false)} centered footer={null}>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Feedback" value={1500} prefix={<LikeOutlined />} />
          </Col>
          <Col span={12}>
            <Statistic title="Unmerged" value={93} suffix="/ 100" />
          </Col>
        </Row>
      </Modal>
    </Layout>
  );
}

export default Profile;

