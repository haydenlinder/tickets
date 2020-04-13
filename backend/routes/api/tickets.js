const express = require("express");
const router = express.Router();
const passport = require('passport');
const validateTicketInput = require('../../validation/ticket')
const Ticket = require('../../models/ticket')
const querymen = require('querymen')

router.get('/?search', (req, res) => {

        debugger
        // if (req.query.owner) {
          if (req.query.ownerInclusion === "is") {
            debugger
              // Ticket.find({owner: req.query.owner})
              //   .populate("creator", ["starred", "firstName", "lastName", "_id"])
              //   .populate("owner", ["starred", "firstName", "lastName", "_id"])
              //   .populate("updatedBy", ["firstName", "lastName", "_id"])
              //   .populate("lastUpdateSeenBy", ["firstName", "lastName", "_id"])
              //   .populate("subscribed", ["firstName", "lastName", "_id"])
              //   .populate("updatedBy", ["firstName", "lastName", "_id"])
              //   .then(tickets => {
              //     debugger
              //     res.json(tickets);
              //   })
              //   .catch(err =>
              //     res
              //       .status(404)
              //       .json({ noticketsfound: "No tickets found for that search" })
              //   );

              const ownerArray = req.query.owner ? {owner: req.query.owner} : {}
              const creatorArray = req.query.creator ? {creator: req.query.creator} : {}
              const subscribedArray = req.query.subscribed ? {subscribed: req.query.subscribed} : {}

              const all = await Ticket.find({...ownerArray, ...creatorArray, ...subscribedArray}).exec()
                .populate("creator", ["starred", "firstName", "lastName", "_id"])
                .populate("owner", ["starred", "firstName", "lastName", "_id"])
                .populate("updatedBy", ["firstName", "lastName", "_id"])
                .populate("lastUpdateSeenBy", ["firstName", "lastName", "_id"])
                .populate("subscribed", ["firstName", "lastName", "_id"])
                .populate("updatedBy", ["firstName", "lastName", "_id"])
                .then(tickets => {
                  debugger
                  res.json(tickets);
                })
                .catch(err =>
                  res
                    .status(404)
                    .json({ noticketsfound: "No tickets found for that search" })
                );
          } else {
            debugger
              Ticket.find({owner: { $nin: req.query.owner } })
                .populate("creator", ["starred", "firstName", "lastName", "_id"])
                .populate("owner", ["starred", "firstName", "lastName", "_id"])
                .populate("updatedBy", ["firstName", "lastName", "_id"])
                .populate("lastUpdateSeenBy", ["firstName", "lastName", "_id"])
                .populate("subscribed", ["firstName", "lastName", "_id"])
                .populate("updatedBy", ["firstName", "lastName", "_id"])
                .then(tickets => {
                  res.json(tickets);
                })
                .catch(err =>
                  res
                    .status(404)
                    .json({ noticketsfound: "No tickets found for that search" })
                );
          }
        // }

        // if (req.query.creator) {
        //   if (req.query.creatorInclusion === "is") {
        //     debugger
        //       Ticket.find({creator: req.query.creator})
        //         .populate("creator", ["starred", "firstName", "lastName", "_id"])
        //         .populate("owner", ["starred", "firstName", "lastName", "_id"])
        //         .populate("updatedBy", ["firstName", "lastName", "_id"])
        //         .populate("lastUpdateSeenBy", ["firstName", "lastName", "_id"])
        //         .populate("subscribed", ["firstName", "lastName", "_id"])
        //         .populate("updatedBy", ["firstName", "lastName", "_id"])
        //         .then(tickets => {
        //           debugger
        //           res.json(tickets);
        //         })
        //         .catch(err =>
        //           res
        //             .status(404)
        //             .json({ noticketsfound: "No tickets found for that search" })
        //         );
        //   } else {
        //       Ticket.find({creator: { $nin: req.query.creator } })
        //         .populate("creator", ["starred", "firstName", "lastName", "_id"])
        //         .populate("owner", ["starred", "firstName", "lastName", "_id"])
        //         .populate("updatedBy", ["firstName", "lastName", "_id"])
        //         .populate("lastUpdateSeenBy", ["firstName", "lastName", "_id"])
        //         .populate("subscribed", ["firstName", "lastName", "_id"])
        //         .populate("updatedBy", ["firstName", "lastName", "_id"])
        //         .then(tickets => {
        //           res.json(tickets);
        //         })
        //         .catch(err =>
        //           res
        //             .status(404)
        //             .json({ noticketsfound: "No tickets found for that search" })
        //         );
        //   }
        // }

        // if (req.query.subscribed) {
        //   debugger
        //   if (req.query.subscribedInclusion === "all") {
        //       Ticket.find({subscribed: { $all: req.query.subscribed } })
        //         .populate("creator", ["starred", "firstName", "lastName", "_id"])
        //         .populate("owner", ["starred", "firstName", "lastName", "_id"])
        //         .populate("updatedBy", ["firstName", "lastName", "_id"])
        //         .populate("lastUpdateSeenBy", ["firstName", "lastName", "_id"])
        //         .populate("subscribed", ["firstName", "lastName", "_id"])
        //         .populate("updatedBy", ["firstName", "lastName", "_id"])
        //         .then(tickets => {
        //           debugger
        //           res.json(tickets);
        //         })
        //         .catch(err =>
        //           res
        //             .status(404)
        //             .json({ noticketsfound: "No tickets found for that search" })
        //         );
        //   } else if (req.query.subscribedInclusion === "any") {
        //     debugger
        //       Ticket.find({subscribed: { $in: req.query.subscribed } })
        //         .populate("creator", ["starred", "firstName", "lastName", "_id"])
        //         .populate("owner", ["starred", "firstName", "lastName", "_id"])
        //         .populate("updatedBy", ["firstName", "lastName", "_id"])
        //         .populate("lastUpdateSeenBy", ["firstName", "lastName", "_id"])
        //         .populate("subscribed", ["firstName", "lastName", "_id"])
        //         .populate("updatedBy", ["firstName", "lastName", "_id"])
        //         .then(tickets => {
        //           debugger
        //           res.json(tickets);
        //         })
        //         .catch(err =>
        //           res
        //             .status(404)
        //             .json({ noticketsfound: "No tickets found for that search" })
        //         );
        //   } else {
        //     debugger
        //       Ticket.find({subscribed: { $all: req.query.subscribed } })
        //         .populate("creator", ["starred", "firstName", "lastName", "_id"])
        //         .populate("owner", ["starred", "firstName", "lastName", "_id"])
        //         .populate("updatedBy", ["firstName", "lastName", "_id"])
        //         .populate("lastUpdateSeenBy", ["firstName", "lastName", "_id"])
        //         .populate("subscribed", ["firstName", "lastName", "_id"])
        //         .populate("updatedBy", ["firstName", "lastName", "_id"])
        //         .then(tickets => {
        //           debugger
        //           res.json(tickets);
        //         })
        //         .catch(err =>
        //           res
        //             .status(404)
        //             .json({ noticketsfound: "No tickets found for that search" })
        //         );
        //   }
        // }

    }) 


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
    debugger
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
    debugger
    if (req.params.folder === 'subscribed') {
        debugger
        Ticket.find({ [req.params.folder]: { $in: [req.params.userId] } })
        .populate('creator', ['firstName', 'lastName', '_id'])
        .populate('owner', ['firstName', 'lastName', '_id'])
        .populate('lastUpdateSeenBy', ['firstName', 'lastName', '_id'])
        .populate('subscribed', ['firstName', 'lastName', '_id'])
        .populate('updatedBy', ['firstName', 'lastName', '_id'])
        .then(tickets => {
            debugger
            res.json(tickets)
        })
        .catch(err => res
            .status(404)
            .json({ noticketsfound: "No tickets found from that user" })
        );
    } else if (req.params.folder === "starred") {
        debugger
        let starredIds 
        User.findById(req.params.userId)
        .exec((err, user) => {
            debugger
            starredIds = Array.from(user.starred)
            Ticket.find({ _id: { $in: starredIds } })
            .populate("creator", ["firstName", "lastName", "_id"])
            .populate("owner", ["firstName", "lastName", "_id"])
            .populate("lastUpdateSeenBy", ["firstName", "lastName", "_id"])
            .populate("subscribed", ["firstName", "lastName", "_id"])
            .populate("updatedBy", ["firstName", "lastName", "_id"])
            .then(tickets => {
                debugger
                res.json(tickets)
            })
            .catch(err =>
                res
                .status(404)
                .json({ noticketsfound: "No tickets found from that user" })
            );
        })
    } else {
        debugger
        Ticket.find({ [req.params.folder]: req.params.userId })
        .populate("creator", ["firstName", "lastName", "_id"])
        .populate("owner", ["firstName", "lastName", "_id"])
        .populate("lastUpdateSeenBy", ["firstName", "lastName", "_id"])
        .populate("subscribed", ["firstName", "lastName", "_id"])
        .populate("updatedBy", ["firstName", "lastName", "_id"])
        .then(tickets => {
            debugger
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
