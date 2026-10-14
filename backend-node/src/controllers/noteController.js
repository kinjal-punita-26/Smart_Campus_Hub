const Note = require('../models/Note');

// @desc    Get all notes
// @route   GET /api/notes
// @access  Private (All Roles)
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find().populate('author', 'name role').sort('-createdAt');
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Upload a new note link
// @route   POST /api/notes
// @access  Private (Faculty, Admin)
const createNote = async (req, res) => {
    try {
        const { title, description, fileUrl, subject } = req.body;
        const note = await Note.create({
            title, description, fileUrl, subject, author: req.user._id
        });
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getNotes, createNote };
