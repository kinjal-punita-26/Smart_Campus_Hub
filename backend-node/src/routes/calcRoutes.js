const express = require('express');
const router = express.Router();
const { calculateSGPA } = require('../controllers/calcController');
const { protect } = require('../middleware/authMiddleware');

router.post('/sgpa', protect, calculateSGPA);

module.exports = router;
