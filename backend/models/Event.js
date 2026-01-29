const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    ticketLimit: { type: Number, required: true },
    approvalMode: {
        type: String,
        required: true,
        enum: ['Auto', 'Manual'],
        default: 'Auto'
    },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
