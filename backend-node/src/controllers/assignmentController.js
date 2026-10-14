const Assignment = require('../models/Assignment');

// @desc    Get all active assignments
// @route   GET /api/assignments
// @access  Private (All Roles)
const getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find().populate('author', 'name role').sort({ deadline: 1 });
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create an assignment
// @route   POST /api/assignments
// @access  Private (Faculty, Admin)
const createAssignment = async (req, res) => {
    try {
        const { title, description, deadline, subject } = req.body;
        const assignment = await Assignment.create({
            title, description, deadline, subject, author: req.user._id
        });
        res.status(201).json(assignment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAssignments, createAssignment };
