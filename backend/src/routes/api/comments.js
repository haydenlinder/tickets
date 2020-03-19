const passport = require('passport')
const validateCommentInput = require("../../validation/comment")
const express = require('express')
const commentsRouter = express.Router()
const Comment = require("../../models/Comment")


commentsRouter.post("/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { errors, isValid } = validateCommentInput(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        const newComment = new Comment({
            body: req.body.body
        })

        newComment.save().then(comment => res.json(comment))
    }
)

commentsRouter.get("/tickets/:ticket_id", (req, res) => {
    Comment
        .find({ ticket: req.params.ticket_id })
        .sort({ createdAt: -1 })
        .then(comments => res.send(comments))
        .catch(err =>
            res
                .status(404)
                .json({ nocommentsfound: "No comments found for that ticket" }))
})



commentsRouter.patch("/:id",
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Comment
            .findById(req.params.id)
            .then(comment => {
                if (comment.user.equals(req.user.id)) {
                    comment.update(req.body.body)
                } else {
                    res
                        .status(403)
                        .json({
                            permissionconflict:
                                "You do not have permission to delete"
                        });
                }
            })
    }
)

commentsRouter.delete("/:id",
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Comment
            .findById(req.params.id)
            .then(comment => {
                if (comment.user.equals(req.user.id)) {
                    comment.remove()
                } else {
                    res
                        .status(403)
                        .json({
                            permissionconflict:
                                "You do not have permission to delete"
                        })
                }
            })
    }
)

module.exports = commentsRouter;