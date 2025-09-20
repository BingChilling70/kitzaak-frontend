import React from 'react';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
    return (
        <div className="customer-dashboard">
            <h1>Welcome, Hazin</h1>
            <div className="dashboard-actions">
                <Link to="/create-ticket" className="action-card">
                    Create a Ticket
                </Link>
                <Link to="/my-tickets" className="action-card">
                    View My Tickets
                </Link>
                <Link to="/profile" className="action-card">
                    Profile
                </Link>
            </div>
        </div>
    );
};

export default CustomerDashboard;
