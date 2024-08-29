const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const userRoute = require('./routes/user');
const { checkForAuthenticationCookie } = require('./middleware/auth');

// Connect to MongoDB
mongoose.connect('mongodb+srv://rastogisahil20:TgKN1rF9TDVx9f4m@cluster0.3cojm.mongodb.net/mydb')
  .then(() => console.log('mongodb connected'))
  .catch((err) => console.error('mongodb connection error:', err));

// Middleware configuration
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.use(session({
  secret: "$uperMan@123",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://rastogisahil20:TgKN1rF9TDVx9f4m@cluster0.3cojm.mongodb.net/mydb' }),
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(checkForAuthenticationCookie('token'));

app.use(cors((req, callback) => {
  const origin = req.header('Origin');
  const corsOptions = {
    origin: origin,
    credentials: true
  };
  callback(null, corsOptions);
}));

app.use('/user', userRoute);

app.post('/user/logout', (req, res) => {
  if (!req.session) {
    return res.status(500).send('Session not initialized');
  }
  
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Could not log out');
    }
    res.clearCookie('connect.sid'); 
    res.status(200).send('Logout successful');
  });
});

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));