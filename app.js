require('dotenv').config();
console.log('MONGO_URI from .env:', process.env.MONGO_URI); // Add this line

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Database connection error:', err));


// Middleware
app.use(express.static('public'));

// Body parsers to read data from forms and JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session management middleware
app.use(session({
  secret: 'your_super_secret_key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI
  })
}));

app.use(cookieParser());

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


// Routes
app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/auth'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});