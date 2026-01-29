const mongoose = require('mongoose');

const registrationSchema = mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Event',
    },
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    },
    ticketId: { type: String }, // UUID generated on approval
}, { timestamps: true });

module.exports = mongoose.model('Registration', registrationSchema);
