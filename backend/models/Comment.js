const mongoose = require("mongoose")
const Schema = mongoose.Schema

const commentSchema = new Schema(
    {
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
    },
    { timestamps: true }
);

Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
