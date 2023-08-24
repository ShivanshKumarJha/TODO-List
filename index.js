// requires express for setting up the express server 
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//Setting up the port number
const port = 800;

// Importing the database 
const db = require('./config/mongoose');

// Importing the schema for tasks
const Task = require('./models/task');

// using express
const app = express();

// using static files
app.use(express.static('./assets'));

// To use encrypted data
app.use(bodyParser.urlencoded({ extended: false }));

// Set up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rendering the App Page
app.get('/', function (request, response) {
    Task.find({})
        .then(task => {
            return response.render('home', {
                title: 'Home',
                task: task
            });
        })
        .catch(err => {
            console.log('Error in fetching the data from the database', err);
            // Handle the error appropriately, e.g., send an error response
        });
});

// Creating tasks
app.post('/create-task', function (request, response) {
    Task.create({
        description: request.body.description,
        category: request.body.category,
        date: request.body.date
    })
        .then(newTask => {
            return response.redirect('back');
        })
        .catch(err => {
            console.log('Error in creating the task', err);
            // Handle the error appropriately, e.g., send an error response
        });
});


// Deleting tasks
app.get('/delete-task', function (request, response) {
    // get the id from the query
    const id = request.query;

    // checking the number of tasks to be deleted
    const count = Object.keys(id).length;

    // Creating an array of promises for deletion
    const deletionPromises = [];
    for (let i = 0; i < count; i++) {
        // Push each deletion promise into the array
        deletionPromises.push(Task.findByIdAndDelete(Object.keys(id)[i]));
    }

    // Using Promise.all to wait for all deletions to complete
    Promise.all(deletionPromises)
        .then(() => {
            return response.redirect('back');
        })
        .catch((err) => {
            console.log('Error in deleting tasks', err);
            return response.redirect('back');
        });
});

// make the app to listen on assigned port number
app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});