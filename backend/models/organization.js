const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationSchema = new Schema(
    {
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
    },
    { timestamps: true }
);

Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;
