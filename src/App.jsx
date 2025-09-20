// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Tickets from './components/Tickets.jsx';
// import TicketForm from './components/TicketForm.jsx'; // ← keep if you still need it elsewhere
import Login from './components/Login.jsx';
import Stats from './components/Stats.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import NavigationBar from './components/NavigationBar.jsx';
import TicketDetails from './pages/TicketDetails.jsx';

// NEW: make sure this file exists
import CreateTicketFlow from './pages/CreateTicketFlow.jsx';

import './App.css';

function App() {
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  };

  return (
    <Router>
      <header>
        <NavigationBar handleLogout={handleLogout} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/tickets" replace />} />
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
            path="/tickets/:id"
            element={
              <ProtectedRoute>
                <TicketDetails />
              </ProtectedRoute>
            }
          />
          {/* use the stepper flow here */}
          <Route
            path="/create-ticket"
            element={
              <ProtectedRoute>
                <CreateTicketFlow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stats"
            element={
              <ProtectedRoute>
                <Stats />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/tickets" replace />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
