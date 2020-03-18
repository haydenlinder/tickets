const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
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
        type: String
    },
    body: {
        type: String,
        required: false
    },
    lastUpdateSeenBy: {
        type: Array,
        default: []
    },
    status: {
        type: String,
        default: "No Progress"
    },
    prority: {
        type: String,
        default: "Low"
    },
    dependsOn: {
        type: Schema.Types.ObjectId,
        ref: 'Ticket'
    },
    blocks: {
        type: Schema.Types.ObjectId,
        ref: 'Ticket'
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

Ticket = mongoose.model('Ticket', ticketSchema, 'tickets');
module.exports = Ticket;