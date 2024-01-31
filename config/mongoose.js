// require the library 
const mongoose = require('mongoose');
const env = require('dotenv').config();

// connect to the database
mongoose.connect(process.env.MONGODB_URI);

// acquire the connection
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'Error in connecting to the MongoDB'));

// Up and running then print the message
db.once('open', function () {
    console.log('Connected to the database');
})

// exporting the database
module.exports = db;