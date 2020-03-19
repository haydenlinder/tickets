const express = require("express");
const router = express.Router();
const passport = require('passport');
const validateTicketInput = require('../../validation/ticket')

router.get("/", (req, res) => {
    Ticket
        .find()
        .sort({ createdDate: -1 })
        .then(tickets => res.json(tickets))
}
)
router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateTicketInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newTicket = new Ticket({
            title: req.body.title,
            body: req.body.body,
            status: req.body.status,
            priority: req.body.priority,
            dependsOn: req.body.dependsOn,
            blocks: req.body.blocks,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            user: req.user.id
        });

        newTicket.save().then(ticket => res.json(ticket));
    }
);

router.get("/:id", (req, res) => {
    Ticket
        .find({ id: req.params.id })
        .then(ticket => res.json(ticket))
        .catch(err => err.status(400).json(err))
})

router.patch("/:ticketId", (req, res) => {
        Ticket.updateOne({ id: req.params.ticketId })
        .then(ticket => res.json(ticket))
        .catch(err => err.status(400).json(err))
})



router.get("/creator/:userId", (req, res) => {
  Ticket.find({ creatorId: req.params.userId})
    .sort({ createdAt: -1 })
    .then(tickets => res.json(tickets))
    .catch(err =>
      res.status(404).json({ noticketsfound: "No tickets found from that user" })
    );
});

router.get("/owner/:userId", (req, res) => {
    Ticket.find({ ownerId: req.params.userId })
        .sort({ createdAt: -1 })
        .then(tickets => res.json(tickets))
        .catch(err =>
            res.status(404).json({ noticketsfound: "No tickets found from that user" })
        );
});



module.exports = router;
