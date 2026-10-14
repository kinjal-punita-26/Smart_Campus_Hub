const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'Please add a note title'] },
    description: { type: String, required: [true, 'Please add a description'] },
    fileUrl: { type: String, required: [true, 'Please add a file URL/Link'] },
    subject: { type: String, required: [true, 'Please specify the subject'] },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', noteSchema);
