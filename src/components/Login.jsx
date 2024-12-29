import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import API from '../utils/api'; // Axios instance to make requests to the backend

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        try {
            const response = await API.post('token/', {
                username,
                password,
            }); // Send POST request with username and password
            localStorage.setItem('access_token', response.data.access); // Save tokens in localStorage
            localStorage.setItem('refresh_token', response.data.refresh);
            alert('Login successful!');
            navigate('/tickets'); // Redirect to tickets page
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            alert('Login failed!');
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
