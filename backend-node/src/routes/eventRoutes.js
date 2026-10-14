const express = require('express');
const router = express.Router();
const { getEvents, createEvent } = require('../controllers/eventController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getEvents)
    .post(protect, authorizeRoles('Faculty', 'Admin'), createEvent);

module.exports = router;
