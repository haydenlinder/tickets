const passport = require('passport');
const validateTicketInput = require('../../validation/ticket')
const express = require("express");
const ticketsRouter = express.Router();
const Ticket = require('../../models/ticket');

ticketsRouter.get("/", (req, res) => {
    Ticket
        .find()
        .sort({ createdDate: -1 })
        .then(tickets => res.json(tickets))
}
)
ticketsRouter.post('/',
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

ticketsRouter.get("/:id", (req, res) => {
    Ticket
        .find({ id: req.params.id })
        .then(ticket => res.json(ticket))
        .catch(err => err.status(400).json(err))
})

ticketsRouter.patch("/:id", (req, res) => {
    Ticket.updateOne({ id: req.params.id })
        .then(ticket => res.json(ticket))
        .catch(err => err.status(400).json(err))
})

module.exports = ticketsRouter;
