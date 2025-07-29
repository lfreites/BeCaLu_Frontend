import React, { useState } from 'react';
import axios from 'axios';

interface LoginProps {
  onLogin: (token: string, role: string) => void;
}

interface LoginResponse {
  access_token: string;
  role: string;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await axios.post<LoginResponse>('http://192.168.0.73:8000/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const token = response.data.access_token;
      //const role = response.data.role || 'project_manager'; // fallback role if not returned
      const role = response.data.role;

      console.log('Login response:', response.data);
      console.log('Parsed role:', role);

      if (role !== 'coordinator' && role !== 'project_manager') {
        throw new Error('Invalid user role');
      }

      onLogin(token, role);
    } catch (err: any) {
      console.error(err);
      setError('Invalid credentials. Please try again.');
    }
  };

  /*return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url("/joakim-nadell-K67sBVqLLuw-unsplash.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="card shadow p-4 bg-white bg-opacity-75" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-3">Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Log In</button>
        </form>
      </div>
    </div>
  );
  */

  return (
  <div
    className="d-flex flex-column justify-content-center align-items-center vh-100"
    style={{
      backgroundImage: `url("/joakim-nadell-K67sBVqLLuw-unsplash.jpg")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    {/* Logo image on top */}
    <img
      src="/LuBeCa.png"
      alt="Logo"
      style={{ maxWidth: '200px', marginBottom: '20px' }}
    />

    {/* Login Card */}
    <div className="card shadow p-4 bg-white bg-opacity-75" style={{ width: '100%', maxWidth: '400px' }}>
      <h3 className="text-center mb-3">Login</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Log In</button>
      </form>
    </div>
  </div>
);


};

export default Login;
