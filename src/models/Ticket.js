const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    title : {
        required: true,
        type : String,
    },

    description: {
        type: String, 
        required: true,
    },

    status: {
        type: String,
        enum: ['open', 'in-progress', 'closed'], 
        default: 'open',
    },

    assignedTo: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    },

    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
