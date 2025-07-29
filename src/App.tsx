import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import CoordinatorDashboard from './CoordinatorDashboard';
import ProjectManagerDashboard from './ProjectManagerDashboard';

function App() {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');

  const handleLogin = (token: string, role: string) => {
    setToken(token);
    setRole(role);
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Routes>
        {role === 'coordinator' && (
          <Route path="/" element={<CoordinatorDashboard token={token} />} />
        )}
        {role === 'project_manager' && (
          <Route path="/" element={<ProjectManagerDashboard token={token} />} />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
