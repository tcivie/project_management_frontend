import React, { useEffect } from 'react';
import { Form, Input, Button, message, Checkbox } from 'antd';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import {
    LoginOutlined,
    UserOutlined,
    FormOutlined,
    LockOutlined,
} from '@ant-design/icons';

const LoginForm = ({ onClose }) => {
    const onFinish = async (values) => {
        onClose();
    };
    return (
        <GoogleOAuthProvider clientId='52742900129-knrfhr5i59undpt03jet637c2lrcp9oi.apps.googleusercontent.com'>
            <div style={{ margin: 20 }}>
                <Form
                    name='login;ogin'
                    className='login-form'
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name='usermail'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username or Email!',
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <UserOutlined className='site-form-item-icon' />
                            }
                            placeholder='Username or Email'
                        />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <LockOutlined className='site-form-item-icon' />
                            }
                            type='password'
                            placeholder='Password'
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item
                            name='remember'
                            valuePropName='checked'
                            noStyle
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a className='login-form-forgot' href=''>
                            Forgot password
                        </a>
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
                                    type='primary'
                                    htmlType='submit'
                                    onClick={onFinish}
                                >
                                    Login
                                </Button>
                                <span style={{ margin: '0 8px' }}>Or</span>
                                <GoogleLogin
                                    onSuccess={(credentialResponse) => {
                                        console.log(credentialResponse);
                                    }}
                                    onError={() => {
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

export default LoginForm;
