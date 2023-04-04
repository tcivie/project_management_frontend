import React, { useState } from 'react';
import './RegisterPage.css';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');

        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_APIURL}/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username, nickname, email, password,
                }),
            }).then((res) => res.json());

            if (response.register === true) {
                setMessage('Successfully registered!');
                // Perform further actions like redirecting to a protected page
            } else {
                const data = await response.json();
                setMessage(data.message || 'Failed to register. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="register-page">
            <h2>Register</h2>
            {message && <p className="register-message">{message}</p>}
            <form onSubmit={handleSubmit} className="register-form">
                <label htmlFor="username">
                    Username:
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label htmlFor="nickname">
                    Nickname:
                    <input
                        type="text"
                        id="nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        required
                    />
                </label>
                <label htmlFor="email">
                    Email:
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <label htmlFor="confirm-password">
                    Confirm Password:
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;
