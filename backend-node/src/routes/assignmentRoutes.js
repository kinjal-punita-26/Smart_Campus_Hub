const express = require('express');
const router = express.Router();
const { getAssignments, createAssignment } = require('../controllers/assignmentController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getAssignments)
    .post(protect, authorizeRoles('Faculty', 'Admin'), createAssignment);

module.exports = router;
