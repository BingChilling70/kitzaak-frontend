// src/components/NavigationBar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/nav.css';

const NavigationBar = ({ handleLogout }) => {
  return (
    <nav className="nav">
      <div className="nav__brand">Kitzaak</div>
      <ul className="nav__list">
        {/* Make sure these paths exist in App.jsx */}
        <li><NavLink to="/tickets">Tickets</NavLink></li>
        <li><NavLink to="/create-ticket">Create Ticket</NavLink></li>
        <li><NavLink to="/stats">Statistics</NavLink></li>
        <li><button className="btn btn--ghost" onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
