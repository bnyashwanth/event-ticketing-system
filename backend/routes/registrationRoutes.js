const express = require('express');
const router = express.Router();
const {
    registerForEvent,
    getEventRegistrations,
    updateRegistrationStatus,
    getTicket
} = require('../controllers/registrationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/:eventId', registerForEvent);
router.get('/event/:eventId', protect, getEventRegistrations);
router.put('/:id/status', protect, updateRegistrationStatus);
router.get('/ticket/:ticketId', getTicket);

module.exports = router;
