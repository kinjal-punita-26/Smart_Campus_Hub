const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add an event title'],
    },
    description: {
        type: String,
        required: [true, 'Please add an event description'],
    },
    date: {
        type: Date,
        required: [true, 'Please add an event date'],
    },
    location: {
        type: String,
        required: [true, 'Please add an event location'],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Event', eventSchema);
