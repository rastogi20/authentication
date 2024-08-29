import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Loginsuccess.css';

const Loginsuccess = () => {
  const [user, setUser] = useState(null);
  const [quote, setQuote] = useState('');

  const motivationalQuotes = [
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "Your limitation—it’s only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Success doesn’t just find you. You have to go out and get it.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://authentication-1-4vc7.onrender.com/user/profile', { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('https://authentication-1-4vc7.onrender.com/user/logout', {}, { withCredentials: true });
      localStorage.removeItem('token'); 
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="welcome-container">
      <h2>Welcome, {user.username}</h2>
      <img
        src='/photo.jpg'
        alt="Profile"
        className="profile-picture"
      />
      <p>{quote}</p>
      <button onClick={handleLogout} className="logout-button">Logout</button>
      {/* <iframe
        src="https://other-react-app.com" // Replace with the URL of your other React app
        title="Other React App"
        style={{ width: '100%', height: '600px', border: 'none' }}
      /> */}
    </div>
  );
};

export default Loginsuccess;
