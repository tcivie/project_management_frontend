import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

const LoginPage = ({ onClose }) => {
  const [form] = Form.useForm();
  const [error, setError] = useState(null);

  useEffect(() => {
    async function validate() {
      try {
        await form.validateFields();
      } catch (error) {}
    }
    if (error) validate();
  }, [error, form]);

  const onFinish = async (values) => {
    const isVerified = values.email && values.password;
    if (!isVerified) {
      // Return or show an error message indicating verification failed
      console.log('Verification failed');
      return;
    }

    try {
      // sending login request to the server
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Login successful
        console.log('Login successful');
        onClose(); // Close the modal or perform any desired action
      } else {
        // Login failed
        console.log('Login failed');
        const responseData = await response.json();
        const message = responseData?.message;
        console.log(message);
        if (message) {
          setError(message);
        }
      }
    } catch (err) {
      // Handle any network or request error
      console.log('Error occurred:', err);
    }
  };

  return (
    <GoogleOAuthProvider clientId="52742900129-knrfhr5i59undpt03jet637c2lrcp9oi.apps.googleusercontent.com">
      <div style={{ maxWidth: 400, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please enter your email',
              },
              {
                type: 'email',
                message: 'Please enter a valid email',
              },
            ]}
          >
            <Input placeholder="Enter your email here" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password',
              },
            ]}
          >
            <Input.Password placeholder="Enter your password here" />
          </Form.Item>

          <Form.Item>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Button type="primary" htmlType="submit" onClick={onFinish}>
                  Login
                </Button>
                <span style={{ margin: '0 8px' }}>Or</span>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                    onClose(); // Close the modal or perform any desired action
                  }}
                  onError={() => {
                    setError('Could not sign in with Google');
                    console.log('Login Failed');
                  }}
                />
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
