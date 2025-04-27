import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import JewelleryManager from './components/JewelleryManager';
import Signup from './components/Signup';
import Login from './components/Login';
import UpdateJewellery from './components/UpdateJewellery';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route 
          path="/jewelleryManager" 
          element={isLoggedIn ? <JewelleryManager /> : <Navigate to="/login" />} 
        />
        <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
    </Router>
  );
}

export default App;
