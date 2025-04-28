import React from 'react';
import axios from 'axios';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await axios.post('https://e-jewellery-shop-.glitch.me/user/logout', {}, { withCredentials: true });
      alert('Logged out');
    } catch {
      alert('Logout failed');
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
