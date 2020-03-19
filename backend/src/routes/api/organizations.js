const passport = require('passport')
const express = require('express')
const organizationsRouter = express.Router();
const Organization = require('../../models/organization');

organizationsRouter.route('/')
    .get(
        (req, res) => {
            Organization.find().then(
                orgs => res.json(orgs)
            ).catch(
                err => res.status(400).json('Error: ' + err)
            );
        }
    )
    .post(
        (req, res) => {
            const newOrg = new Organization({
                handle: req.body.handle,
                name: req.body.name,
                motto: req.body.motto,
            })
            
            newOrg.save().then(
                () => res.json('Organization registered!') 
            ).catch(
                err => res.status(400).json('Error: ' + err)
            );
        }
    );

module.exports = organizationsRouter;