import React from 'react';
import { NavLink } from 'react-router-dom';

const CustomerNavBar = () => {
    return (
        <nav className="customer-navbar">
            <ul>
                <li>
                    <NavLink to="/create-ticket" activeClassName="active">Create a Ticket</NavLink>
                </li>
                <li>
                    <NavLink to="/my-tickets" activeClassName="active">View My Tickets</NavLink>
                </li>
                <li>
                    <NavLink to="/profile" activeClassName="active">Profile</NavLink>
                </li>
                <li>
                    <button onClick={() => {
                        localStorage.clear();
                        window.location.href = '/login';
                    }}>Log Out</button>
                </li>
            </ul>
        </nav>
    );
};

export default CustomerNavBar;
