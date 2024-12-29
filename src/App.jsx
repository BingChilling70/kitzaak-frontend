import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Tickets from './components/Tickets.jsx';
import TicketForm from './components/TicketForm.jsx';
import Login from './components/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './App.css';

function NavigationBar() {
    const navigate = useNavigate(); // Correctly initialize useNavigate

    const isLoggedIn = !!localStorage.getItem('access_token');

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            navigate('/login'); // Navigate to the login page
        }
    };

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/tickets">View Tickets</Link>
                </li>
                <li>
                    <Link to="/create-ticket">Create Ticket</Link>
                </li>
                {!isLoggedIn && (
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                )}
                {isLoggedIn && (
                    <li>
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
}

function App() {
    return (
        <Router>
            <header>
                <NavigationBar /> {/* NavigationBar is now inside Router */}
            </header>
            <main>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/tickets"
                        element={
                            <ProtectedRoute>
                                <Tickets />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/create-ticket"
                        element={
                            <ProtectedRoute>
                                <TicketForm />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
