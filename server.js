
// Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const userController = require('./controllers/users');
const mongoose = require('mongoose');

// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));

// Routes / Controllers

app.use('/users', userController);

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    }));

// Routes / Controllers
const sessionsController = require('./controllers/sessions');
app.use('/sessions', sessionsController);

// Database Configuration
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});



// Database Connection Error / Success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));




// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));