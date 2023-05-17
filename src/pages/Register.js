import React from 'react';
import { Form, Input, Button } from 'antd';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

const RegisterPage = () => {
    const onFinish = (values) => {
        console.log('Sign up form submitted:', values);
        // Perform registration logic here
    };

    return (
        <GoogleOAuthProvider clientId='52742900129-knrfhr5i59undpt03jet637c2lrcp9oi.apps.googleusercontent.com'>
            <div style={{ maxWidth: 400, margin: '0 auto' }}>
                <h2 style={{ textAlign: 'center' }}>Sign up</h2>
                <Form onFinish={onFinish}>
                    <Form.Item
                        label='Email'
                        name='email'
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
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Username'
                        name='username'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your username',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Password'
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your password',
                            },
                        ]}
                    >
                        <Input.Password />
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
                                <Button type='primary'>Sign up</Button>
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

export default RegisterPage;
