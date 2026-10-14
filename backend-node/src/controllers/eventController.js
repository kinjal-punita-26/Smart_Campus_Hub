const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
// @access  Private (All Roles)
const getEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate('author', 'name role')
            .sort('date'); // sorted by upcoming date
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Private (Faculty, Admin)
const createEvent = async (req, res) => {
    try {
        const { title, description, date, location } = req.body;

        const event = await Event.create({
            title,
            description,
            date,
            location,
            author: req.user._id,
        });

        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getEvents, createEvent };
