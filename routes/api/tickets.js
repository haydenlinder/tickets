const express = require("express");
const router = express.Router();
const passport = require('passport')

router.get("/tickets", (req, res) => {
    Ticket
        .find()
        .sort({ createdDate: -1 })
        .then(tickets => res.json(tickets))
}
)
router.post('/tickets',
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

router.get("/ticket/:id", (req, res) => {
    Ticket
        .find({ id: req.params.id })
        .then(ticket => res.json(ticket))
        .catch(err => err.status(400).json(err))
})

router.patch("/ticket/:id", (req, res) => {
        Ticket.updateOne({ id: req.params.id })
        .then(ticket => res.json(ticket))
        .catch(err => err.status(400).json(err))
})



module.exports = router;
