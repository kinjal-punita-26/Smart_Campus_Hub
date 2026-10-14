const express = require('express');
const router = express.Router();
const { getUsers, deleteUser } = require('../controllers/userController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Mount Admin-Exclusive guard middleware
router.route('/')
    .get(protect, authorizeRoles('Admin'), getUsers);

router.route('/:id')
    .delete(protect, authorizeRoles('Admin'), deleteUser);

module.exports = router;
