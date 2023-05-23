import React, { useEffect, useState } from 'react';
import {
  Form, Input, Button, message,
} from 'antd';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

import { UserOutlined, FormOutlined, LockOutlined } from '@ant-design/icons';

function RegisterPage({ onClose }) {
  const [form] = Form.useForm();
  const [vError, setVerror] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    async function validate() {
      try {
        await form.validateFields();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
    if (vError) validate();
  }, [vError, form]);
  const onFinish = async (values) => {
    const isVerified = values.email && values.username && values.password;
    if (!isVerified) {
      // Return or show an error message indicating verification failed
      return;
    }

    try {
      // sending register reuqest to server
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/api/users`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        },
      );

      if (response.ok) {
        // Registration successful
        message.success('Signed up successfully!');
        onClose(); // Close the modal
      } else {
        // Registration failed
        const responseData = await response.json();
        const responseMessage = responseData?.message;
        if (responseMessage) {
          setVerror(responseMessage);
        }
      }
    } catch (err) {
      // Handle any network or request error
      // eslint-disable-next-line no-console
      console.log('Error occurred:', err);
    }
  };
  const createValidator = (lookupStr) => {
    let oldVal = null;
    function warpped(rule, value, promise) {
      if (oldVal && oldVal !== value) {
        promise();
      } else if (vError && vError.toLowerCase().includes(lookupStr.toLowerCase())) {
        oldVal = value;
        promise(vError);
      } else {
        promise(); // No error
      }
    }
    return warpped;
  };

  return (
    <GoogleOAuthProvider clientId="52742900129-knrfhr5i59undpt03jet637c2lrcp9oi.apps.googleusercontent.com">
      <div style={{ maxWidth: 400, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center' }}>Sign up</h2>
        <Form name="registerForm" form={form} onFinish={onFinish}>
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
              { validator: createValidator('email') },
            ]}
          >
            <Input
              placeholder="Enter Email"
              prefix={
                <FormOutlined className="site-form-item-icon" />
                            }
            />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please enter Username!',
              },
              { validator: createValidator('username') },
            ]}
          >
            <Input
              placeholder="Enter Username"
              prefix={
                <UserOutlined className="site-form-item-icon" />
                            }
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter Password',
              },
            ]}
          >
            <Input.Password
              placeholder="Enter Password"
              prefix={
                <LockOutlined className="site-form-item-icon" />
                            }
            />
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
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={onFinish}
                >
                  Sign up
                </Button>
                <span style={{ margin: '0 8px' }}>Or</span>
                <GoogleLogin
                  onSuccess={() => {
                    onClose();
                  }}
                  onError={() => {
                    setVerror(
                      'Could not sign in with Google',
                    );
                  }}
                />
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </GoogleOAuthProvider>
  );
}

export default RegisterPage;
