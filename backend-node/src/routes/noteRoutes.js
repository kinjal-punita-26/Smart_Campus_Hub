const express = require('express');
const router = express.Router();
const { getNotes, createNote } = require('../controllers/noteController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getNotes)
    .post(protect, authorizeRoles('Faculty', 'Admin'), createNote);

module.exports = router;
