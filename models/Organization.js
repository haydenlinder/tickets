const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
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
})

Organization = mongoose.model('Organization', OrganizationSchema)
module.exports = Organization;
