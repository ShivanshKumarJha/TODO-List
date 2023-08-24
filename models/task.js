// require the libraryBN  
const mongoose = require('mongoose');

// creating the schema for the tasks
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const Task = mongoose.model('Task', taskSchema);

// exporting the scheme
module.exports = Task;