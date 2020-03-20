const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Array,
        default: []
    },
    tags: {
        type: Array,
        default: []
    },
    subscribers: {
        type: Array,
        default: []
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: false
    },
    lastUpdateSeenBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    updatedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    status: {
        type: String,
        default: "No Progress"
    },
    priority: {
        type: String,
        default: "Low"
    },
    dependsOn: {
        type: Array,
        default: []
    },
    blocks: {
        type: Array,
        default: []
    },
    startDate: {
        type: Date,
        default: undefined
    },
    endDate: {
        type: Date,
        default: undefined
    },
});

Ticket = mongoose.model('Ticket', ticketSchema, "tickets");
module.exports = Ticket;