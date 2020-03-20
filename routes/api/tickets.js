const express = require("express");
const router = express.Router();
const passport = require('passport');
const validateTicketInput = require('../../validation/ticket')
const Ticket = require('../../models/ticket')

router.get("/", (req, res) => {
    Ticket
        .find()
        .sort({ createdDate: -1 })
        .then(tickets => res.json(tickets))
}
)
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
            subscribers: req.body.subscribers,
            dependsOn: req.body.dependsOn,
            blocks: req.body.blocks,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            creator: req.body.creator
        });

        newTicket.save()
        .then(ticket => {
            Ticket.findById(ticket._id)
            .populate('creator')
            .populate('updatedBy')
            .populate('lastUpdateSeenBy')
            .populate('subscribers')            
            .then(
                populated => res.json(populated)
            )
        });
    }
);

router.get("/:ticketId", (req, res) => {
    Ticket
    .findById(req.params.ticketId)
    .populate('creator')
    .populate('updatedBy')
    .populate('lastUpdateSeenBy')
    .populate('subscribers')
    .then(ticket => {
        return res.json(ticket)
    })
    .catch(err => err.status(400).json(err))
})

router.patch("/:ticketId", (req, res) => {
    Ticket.updateOne({id: req.params.ticketId})
    .populate('creator')
    .populate('updatedBy')
    .populate('lastUpdateSeenBy')
    .populate('subscribers')
    .then(ticket => res.json(ticket))
    .catch(err => err.status(400).json(err))
})



router.get("/creator/:userId", (req, res) => {
  Ticket.find({ creator: req.params.userId})
    .populate('creator')
    .sort({ createdAt: -1 })
    .then(tickets => res.json(tickets))
    .catch(err =>
      res.status(404).json({ noticketsfound: "No tickets found from that user" })
    );
});

router.get("/owner/:userId", (req, res) => {
    Ticket.find({ owner: req.params.userId })
        .sort({ createdAt: -1 })
        .then(tickets => res.json(tickets))
        .catch(err =>
            res.status(404).json({ noticketsfound: "No tickets found from that user" })
        );
});



module.exports = router;
