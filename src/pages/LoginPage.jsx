import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

        try {
            const response = await fetch(`${process.env.REACT_APP_APIURL}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier, password }),
            }).then((res) => res.json());
            if (response.login === true) {
                setMessage('Successfully logged in!');
                // Perform further actions like storing the token
                // and redirecting to a protected page
            } else {
                const data = await response.json();
                setMessage(data.message || 'Invalid username or password.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-page">
            <h2>Login</h2>
            {message && <p className="login-message">{message}</p>}
            <form onSubmit={handleSubmit} className="login-form">
                <label htmlFor="identifier">
                    Username or Email:
                    <input
                        type="text"
                        id="identifier"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                    />
                </label>
                <label htmlFor="password">
                    Password:
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Login</button>
            </form>
            <p>
                Don&apos;t have an account?
                <Link to="/register">Register</Link>
            </p>
        </div>
    );
}

export default LoginPage;
