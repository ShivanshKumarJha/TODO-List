// require the library 
const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost/todos');

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