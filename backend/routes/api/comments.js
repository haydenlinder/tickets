const passport = require("passport")
const express = require("express")
const router = express.Router()
const validateCommentInput = require("../../validation/comment")
const Comment = require("../../models/Comment")


router.post("/",  
    // passport.authenticate("jwt", {session: false})
    (req, res) => {
        const { errors, isValid } = validateCommentInput(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        const newComment = new Comment ({
            body: req.body.body,
            author: req.body.author,
            ticket: req.body.ticketId
        })

        newComment.save()
        .then(comment => {
            Comment.findById(comment._id)
            .populate("author", ['firstName', 'lastName', '_id'])
            .populate("ticket")
            .then(
                populated => res.json(populated)
            )
        })

    }
)

router.get("/tickets/:ticketId", (req, res) => {
    Comment
        .find({ ticket: req.params.ticketId })
        .sort({ createdAt: -1 })
        .then(comments => res.send(comments))
        .catch(err => 
            res
                .status(404)
                .json({ nocommentsfound: "No comments found for that ticket" }))
})

router.get("/author/:userId", (req, res) => {
  Comment.find({ author: req.params.userId })
    .sort({ createdAt: -1 })
    .populate('author', ['firstName', 'lastName', '_id'])
    .populate('ticket')
    .then(comments => res.json(comments))
    .catch(err =>
      res
        .status(400)
        .json({ noticketsfound: "No comments found from that user" })
    );
});


router.patch("/:id",
        // passport.authenticate('jwt', { session: false }),

        (req, res) => {
            Comment.findByIdAndUpdate( req.params.id, req.body, {new: true})
            .then((comment) => res.json(comment))
            .catch((err) => res.status(422).json(err))
                // if (comment.user.equals(req.user._id)) {
       
                // } else {
                //     res
                //         .status(403)
                //         .json({
                //         permissionconflict:
                //         "You do not have permission to delete"
                //       });
            ;
        })
        


router.delete("/:id",

    // passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Comment
            .findById(req.params.id)
            .then(comment => {
                comment.remove()
                return res.json("success")
                // } else {
                //     res
                //     .status(403)
                //     .json({permissionconflict: 
                //     "You do not have permission to delete"})
                // }
            })
            .catch((errors) => {console.log(errors)})
    }
)
 
module.exports = router;