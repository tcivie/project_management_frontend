import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
const RegisterPage = ({ onClose }) => {
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
        const isVerified = values.email && values.username && values.password;
        if (!isVerified) {
            // Return or show an error message indicating verification failed
            console.log('Verification failed');
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
                console.log('Registration successful');
                onClose(); // Close the modal
            } else {
                // Registration failed
                console.log('Registration failed');
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
    const createValidator = (lookupStr) => {
        let old_val = null;
        function warpped(rule, value, promise) {
            if (old_val && old_val !== value) {
                promise();
            } else if (error && error.includes(lookupStr)) {
                old_val = value;
                promise(error);
            } else {
                promise(); // No error
            }
        }
        return warpped;
    };

    return (
        <GoogleOAuthProvider clientId='52742900129-knrfhr5i59undpt03jet637c2lrcp9oi.apps.googleusercontent.com'>
            <div style={{ maxWidth: 400, margin: '0 auto' }}>
                <h2 style={{ textAlign: 'center' }}>Sign up</h2>
                <Form form={form} onFinish={onFinish}>
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
                            { validator: createValidator('email') },
                        ]}
                    >
                        <Input placeholder='Enter your email here' />
                    </Form.Item>

                    <Form.Item
                        label='Username'
                        name='username'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your username',
                            },
                            { validator: createValidator('username') },
                        ]}
                    >
                        <Input placeholder='Enter your username here' />
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
                        <Input.Password placeholder='Enter your password here' />
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
                                    Sign up
                                </Button>
                                <span style={{ margin: '0 8px' }}>Or</span>
                                <GoogleLogin
                                    onSuccess={(credentialResponse) => {
                                        console.log(credentialResponse);
                                        onClose();
                                    }}
                                    onError={() => {
                                        setError(
                                            'Could not sign in with Google',
                                        );
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
