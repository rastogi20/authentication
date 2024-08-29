import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Our App</h1>
      <p>Experience the best services with us.</p>
      <div className="buttons">
        <Link to="/login" className="button">Login</Link>
        <Link to="/signup" className="button">Sign Up</Link>
      </div>
    </div>
  );
};

export default Home;
