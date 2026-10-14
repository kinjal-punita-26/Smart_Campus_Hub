const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'Please add an assignment title'] },
    description: { type: String, required: [true, 'Please add a description'] },
    deadline: { type: Date, required: [true, 'Please provide a deadline'] },
    subject: { type: String, required: [true, 'Please specify the subject'] },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assignment', assignmentSchema);
