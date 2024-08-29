import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Loginsucess from './pages/Loginsucess'
// import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginsuccess" element={<Loginsucess />} />

        {/* <PrivateRoute path="/profile" element={<Profile />} /> */}
        {/* Add other protected routes here */}
      </Routes>
    </Router>
  );
};

export default App;
