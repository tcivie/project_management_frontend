import React, { useState, useEffect } from 'react';
import { Space, Button, Avatar, Menu, Form, Input, Modal } from 'antd';
import {
  UserOutlined,
  DeleteOutlined,
  SaveOutlined,
  EditOutlined,
  ProfileOutlined,
  StockOutlined,
} from '@ant-design/icons';
import Statistics from './Statistics';
import { updateUser } from './api'; // Import the API function

const { Item } = Menu;
const { confirm } = Modal;

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
  getItem('Statistics', 'sub6', <StockOutlined />, [], 'statistics'),
];

function Profile() {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [editFormData, setEditFormData] = useState({
    username: '',
    email: '',
    nickname: '',
  });
  const [securityFormVisible, setSecurityFormVisible] = useState(false);
  const [securityFormData, setSecurityFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    // Reset selected menu item when component unmounts
    return () => setSelectedMenuItem(null);
  }, []);

  const handleEditFormSubmit = async (formData) => {
    try {
      const updatedUser = await updateUser(formData); // Call the API function
      console.log('User information updated successfully:', updatedUser);
      setEditFormVisible(false); // Hide the form after successful submission
    } catch (error) {
      console.log('Error updating user information:', error);
    }
  };

  const handleSecurityFormSubmit = async (formData) => {
    try {
      // Send a request to update account security using formData
      console.log('Updating account security:', formData);
      // Handle success or error response accordingly
    } catch (error) {
      console.log('Error updating account security:', error);
    }
  };

  const showConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete your account?',
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        // Send a request to delete the user account
        console.log('Deleting user account...');
      },
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <Space direction="vertical" size={16}>
          <Space wrap size={64}>
            <Avatar size={256} icon={<UserOutlined />} />
          </Space>
          <Space>
            <Button type="primary">Follow</Button>
            <Button type="default">Following</Button>
            <Button type="default">Followers</Button>
          </Space>
          <Menu
            style={{ width: 256 }}
            mode="vertical"
            items={items}
            onSelect={(item) => {
              if (item.type === 'statistics') {
                setSelectedMenuItem('statistics');
              }
            }}
          />
          {selectedMenuItem === 'statistics' && <Statistics />}
          <Button type="default" onClick={() => setEditFormVisible(true)}>
            Edit Personal Information
          </Button>
          <Button type="default" onClick={() => setSecurityFormVisible(true)}>
            Manage Account Security
          </Button>
          <Button type="danger" onClick={showConfirm}>
            Delete Account
          </Button>
        </Space>
      </div>

      {/* Edit Personal Information Form */}
      <Modal
        title="Edit Personal Information"
        visible={editFormVisible}
        onCancel={() => setEditFormVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={editFormData}
          onFinish={handleEditFormSubmit}
        >
          <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please enter your username' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Nickname" name="nickname" rules={[{ required: true, message: 'Please enter your nickname' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Manage Account Security Form */}
      <Modal
        title="Manage Account Security"
        visible={securityFormVisible}
        onCancel={() => setSecurityFormVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={securityFormData}
          onFinish={handleSecurityFormSubmit}
        >
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[{ required: true, message: 'Please enter your current password' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: 'Please enter your new password' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: 'Please confirm your new password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Profile;
