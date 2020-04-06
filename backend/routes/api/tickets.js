const express = require("express");
const router = express.Router();
const passport = require('passport');
const validateTicketInput = require('../../validation/ticket')
const Ticket = require('../../models/ticket')

router.post("/",
    // passport.authenticate('jwt', { session: false }),
    (req, res) => {
        
        const { errors, isValid } = validateTicketInput(req.body);
    
        if (!isValid) {
            return res.status(422).json(errors);
        }
        const newTicket = new Ticket({
            title: req.body.title,
            owner: req.body.owner,
            body: req.body.body,
            status: req.body.status,
            priority: req.body.priority,
            tags: req.body.tags,
            subscribed: req.body.subscribed,
            dependsOn: req.body.dependsOn,
            blocks: req.body.blocks,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            creator: req.body.creator
        });

        newTicket.save()
        .then(ticket => {
            Ticket.findById(ticket._id)
            .populate('creator', ['starred', 'firstName', 'lastName', '_id'])
            .populate('owner', ['starred', 'firstName', 'lastName', '_id'])
            .populate('updatedBy', ['firstName', 'lastName', '_id'])
            .populate('lastUpdateSeenBy', ['firstName', 'lastName', '_id'])
            .populate('subscribed', ['firstName', 'lastName', '_id'])  
            .populate('updatedBy', ['firstName', 'lastName', '_id'])          
            .then(
                populated => res.json(populated)
            )
        });
    }
);

router.get("/:ticketId", (req, res) => {
    Ticket
    .findById(req.params.ticketId)
    .populate('creator', ['firstName', 'lastName', '_id'])
    .populate('owner', ['firstName', 'lastName', '_id'])
    .populate('lastUpdateSeenBy', ['firstName', 'lastName', '_id'])
    .populate('subscribed', ['firstName', 'lastName', '_id'])
    .populate('updatedBy', ['firstName', 'lastName', '_id'])
    .then(ticket => {
        return res.json(ticket)
    })
    .catch(err => err.status(400).json(err))
})

router.patch("/:ticketId", (req, res) => {

      const { errors, isValid } = validateTicketInput(req.body);

      if (!isValid) {
        return res.status(422).json(errors);
      }

    Ticket.findByIdAndUpdate(
        req.params.ticketId,
        req.body,
        { new: true }
    )
    .populate('creator', ['firstName', 'lastName', '_id'])
    .populate('owner', ['firstName', 'lastName', '_id'])
    .populate('lastUpdateSeenBy', ['firstName', 'lastName', '_id'])
    .populate('subscribed', ['firstName', 'lastName', '_id'])
    .populate('updatedBy', ['firstName', 'lastName', '_id'])
    .then(ticket => res.json(ticket))
    .catch(err => {
        return res.status(422).json({ badrequest: err })
    })
})

router.get("/:folder/:userId", (req, res) => {
    if (req.params.folder === 'subscribed') {
        Ticket.find({ [req.params.folder]: { $in: [req.params.userId] } })
        .populate('creator', ['firstName', 'lastName', '_id'])
        .populate('owner', ['firstName', 'lastName', '_id'])
        .populate('lastUpdateSeenBy', ['firstName', 'lastName', '_id'])
        .populate('subscribed', ['firstName', 'lastName', '_id'])
        .populate('updatedBy', ['firstName', 'lastName', '_id'])
        .then(tickets => res.json(tickets))
        .catch(err => res
            .status(404)
            .json({ noticketsfound: "No tickets found from that user" })
        );
    } else if (req.params.folder === "starred") {
        let starredIds 
        User.findById(req.params.userId)
        .exec((err, user) => {
            starredIds = Array.from(user.starred)
            Ticket.find({ _id: { $in: starredIds } })
            .populate("creator", ["firstName", "lastName", "_id"])
            .populate("owner", ["firstName", "lastName", "_id"])
            .populate("lastUpdateSeenBy", ["firstName", "lastName", "_id"])
            .populate("subscribed", ["firstName", "lastName", "_id"])
            .populate("updatedBy", ["firstName", "lastName", "_id"])
            .then(tickets => {
                res.json(tickets)
            })
            .catch(err =>
                res
                .status(404)
                .json({ noticketsfound: "No tickets found from that user" })
            );
        })
    } else {
        Ticket.find({ [req.params.folder]: req.params.userId })
        .populate("creator", ["firstName", "lastName", "_id"])
        .populate("owner", ["firstName", "lastName", "_id"])
        .populate("lastUpdateSeenBy", ["firstName", "lastName", "_id"])
        .populate("subscribed", ["firstName", "lastName", "_id"])
        .populate("updatedBy", ["firstName", "lastName", "_id"])
        .then(tickets => {
            res.json(tickets);
        })
        .catch(err =>
            res
            .status(404)
            .json({ noticketsfound: "No tickets found from that user" })
        );
    }
    
});

module.exports = router;
