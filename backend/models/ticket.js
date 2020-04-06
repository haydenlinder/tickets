const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: [{
        type: Date
    }],
    tags: {
        type: Array,
        default: []
    },
    subscribed: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
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

Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
