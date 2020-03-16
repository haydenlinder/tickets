const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag