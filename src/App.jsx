import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';
import RecoverPassword from './components/recoverPassword/RecoverPassword';

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/forgot-password" element={<RecoverPassword />}/>
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
