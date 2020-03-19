const mongoose = require("mongoose")
const Schema = mongoose.Schema

const commentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    ticket: {
        type: Schema.Types.ObjectId,
        ref: "Ticket"
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

Comment = mongoose.model('Comment', commentSchema, "comments");
module.exports = Comment;