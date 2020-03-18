const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    handle: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    motto: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

Organization = mongoose.model('Organization', organizationSchema, 'organizations');
module.exports = Organization;
