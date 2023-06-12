import {
  LoadingOutlined, LockOutlined, LoginOutlined, UserOutlined,
} from '@ant-design/icons';
import {
  Button, Checkbox, Divider, Form, Input, message,
} from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import MyGoogleLogin from '../utils/gooleSSOlogin';
import { userLoginFailure, userLoginRequest, userLoginSuccess } from '../redux/actions/userActions';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loginFailed, setLoginFailed] = useState(false);
  const userState = useSelector((state) => state.user);
  const onFinish = async (values) => {
    const isVerified = values.usermail && values.password;
    if (!isVerified) {
      // Return or show an error message indicating verification failed
      return;
    }
    dispatch(userLoginRequest());
    try {
      // sending register reuqest to server
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/api/auth`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: values.usermail,
            password: values.password,
          }),
        },
      );
      if (response.ok) {
        // login successful
        const data = await response.json();
        dispatch(
          userLoginSuccess(data.accessToken, data.UserInfo),
        );
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } else {
        // login failed failed
        setLoginFailed(true);
        message.warning('Could not login, check the input.');
        const responseData = await response.json();
        const msg = responseData?.message;
        dispatch(userLoginFailure(msg));
      }
    } catch (err) {
      // Handle any network or request error
      // eslint-disable-next-line no-console
      console.log('Error occurred:', err);
    }
  };
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        style={{
          // width: '300px', // this controls the form width
          padding: '20px', // add some padding
          border: '1px solid #eee', // add a border
          borderRadius: '5px', // add some border radius to smooth the corners
          boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', // add some shadow
        }}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          noStyle
        >
          <Checkbox>Remember me</Checkbox>

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
                icon={!userState.loading ? (
                  <LoginOutlined />
                ) : (
                  <LoadingOutlined />
                )}
                onClick={onFinish}
              >
                Login
              </Button>
              <span style={{ margin: '0 8px' }}>Or</span>
              <MyGoogleLogin funcOnSuccess={() => {
                const { from } = location.state || { from: { pathname: '/' } };
                navigate(from);
              }}
              />
            </div>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
export default App;
