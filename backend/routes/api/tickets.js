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
            .populate('creator', ['firstName', 'lastName', '_id'])
            .populate('owner', ['firstName', 'lastName', '_id'])
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
        
        Ticket.find({ [req.params.folder]: { $elemMatch: { _id: req.params.userId } } })
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
    } else {
        Ticket.find({ [req.params.folder]: req.params.userId })
        .populate('creator', ['firstName', 'lastName', '_id'])
        .populate('owner', ['firstName', 'lastName', '_id'])
        .populate('lastUpdateSeenBy', ['firstName', 'lastName', '_id'])
        .populate('subscribed', ['firstName', 'lastName', '_id'])
        .populate('updatedBy', ['firstName', 'lastName', '_id'])
        .then(tickets => {
            res.json(tickets)
        })
        .catch(err => res
            .status(404)
            .json({ noticketsfound: "No tickets found from that user" })
        );
    }
    
});

// router.get("/:folder/:userId", (req, res) => {
    
//     Ticket.find({ [req.params.folder]: { $elemMatch: {_id: req.params.userId } } })
//       .populate('subscribed')
//       .populate('starred')
//       .then(tickets => res.json(tickets))
//       .catch(err =>
//         res
//           .status(404)
//           .json({ noticketsfound: "No tickets found from that user" })
//       );
// });

// router.get("/owner/:userId", (req, res) => {
//     Ticket.find({ owner: req.params.userId })
//     .sort({ createdAt: -1 })
//     .then(tickets => res.json(tickets))
//     .catch(err =>
//         res.status(404).json({ noticketsfound: "No tickets found from that user" })
//     );
// });

// router.get("/starred/:userId", (req, res) => {
//     Ticket.find({ starred: req.params.userId })
//     .sort({ createdAt: -1 })
//     .then(tickets => res.json(tickets))
//     .catch(err =>
//         res.status(404).json({ noticketsfound: "No starred tickets found from that user" })
//     );
// });

// router.get("/subscribed/:userId", (req, res) => {
//     Ticket.find({ subscribed: req.params.userId })
//     // .populate('subscribed', ['firstName', 'lastName', '_id'])
//     .sort({ createdAt: -1 })
//     .then(tickets => res.json(tickets))
//     .catch(err =>
//         res.status(404).json({ noticketsfound: "No tickets found from that user" })
//     );
// });

module.exports = router;
