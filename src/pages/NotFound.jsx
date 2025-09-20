// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div style={{ padding: 24 }}>
    <h2>Page not found</h2>
    <p>The page you’re looking for doesn’t exist.</p>
    <div style={{ marginTop: 12 }}>
      <Link className="btn" to="/tickets">Go to Tickets</Link>
    </div>
  </div>
);

export default NotFound;
