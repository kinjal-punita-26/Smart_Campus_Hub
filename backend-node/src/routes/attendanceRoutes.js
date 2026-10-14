const express = require('express');
const router = express.Router();
const { getAttendance, submitAttendance } = require('../controllers/attendanceController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getAttendance)
    .post(protect, authorizeRoles('Faculty', 'Admin'), submitAttendance);

module.exports = router;
