const Event = require('../models/Event');

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (Organizer)
const createEvent = async (req, res) => {
    const { title, description, date, venue, ticketLimit, approvalMode } = req.body;

    try {
        const event = new Event({
            organizer: req.user._id,
            title,
            description,
            date,
            venue,
            ticketLimit,
            approvalMode,
        });

        const createdEvent = await event.save();
        res.status(201).json(createdEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user's events
// @route   GET /api/events/my-events
// @access  Private
const getMyEvents = async (req, res) => {
    try {
        const events = await Event.find({ organizer: req.user._id }).sort({ createdAt: -1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('organizer', 'name email');

        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createEvent, getMyEvents, getEventById };
