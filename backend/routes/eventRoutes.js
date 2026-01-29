const express = require('express');
const router = express.Router();
const { createEvent, getMyEvents, getEventById } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createEvent);
router.get('/my-events', protect, getMyEvents);
router.get('/:id', getEventById);

module.exports = router;
