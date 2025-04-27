
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
//import { Link } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/user/login', form, { withCredentials: true });
      setMessage(res.data.message);
      setIsLoggedIn(true);
      navigate('/jewelleryManager');
    } catch (error) {
      setMessage('Login failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button className="btn btn-primary w-100">Login</button>
          {message && <p className="mt-3 text-danger text-center">{message}</p>}
        </form>
  
        {/* Signup redirect link */}
        <p className="mt-3 text-center">
          Not registered? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}  

export default Login;
