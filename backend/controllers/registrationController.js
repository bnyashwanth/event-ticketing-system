const Registration = require('../models/Registration');
const Event = require('../models/Event');
const crypto = require('crypto');

// @desc    Register for an event
// @route   POST /api/registrations/:eventId
// @access  Public
const registerForEvent = async (req, res) => {
    const { userEmail, userName } = req.body;
    const eventId = req.params.eventId;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check ticket limit
        const currentCount = await Registration.countDocuments({ event: eventId, status: 'Approved' });
        if (currentCount >= event.ticketLimit) {
            return res.status(400).json({ message: 'Event is fully booked' });
        }

        // Determine Status
        let status = 'Pending';
        let ticketId = undefined;

        if (event.approvalMode === 'Auto') {
            status = 'Approved';
            ticketId = crypto.randomUUID();
        }

        const registration = await Registration.create({
            event: eventId,
            userEmail,
            userName,
            status,
            ticketId,
        });

        res.status(201).json(registration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get registrations for an event (Organizer only)
// @route   GET /api/registrations/event/:eventId
// @access  Private
const getEventRegistrations = async (req, res) => {
    const eventId = req.params.eventId;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check ownership
        if (event.organizer.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to view registrations for this event' });
        }

        const registrations = await Registration.find({ event: eventId }).sort({ createdAt: -1 });
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update registration status (Approve/Reject)
// @route   PUT /api/registrations/:id/status
// @access  Private
const updateRegistrationStatus = async (req, res) => {
    const { status } = req.body; // 'Approved' or 'Rejected'
    const registrationId = req.params.id;

    try {
        const registration = await Registration.findById(registrationId).populate('event');
        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }

        // Check ownership of the event
        if (registration.event.organizer.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        registration.status = status;

        if (status === 'Approved' && !registration.ticketId) {
            // Check limit again strictly if approving manually? 
            // Simplified: Just generate ticket.
            registration.ticketId = crypto.randomUUID();
        }

        await registration.save();
        res.json(registration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get ticket details
// @route   GET /api/registrations/ticket/:ticketId
// @access  Public
const getTicket = async (req, res) => {
    try {
        const registration = await Registration.findOne({ ticketId: req.params.ticketId }).populate('event');

        if (registration) {
            res.json(registration);
        } else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerForEvent, getEventRegistrations, updateRegistrationStatus, getTicket };
