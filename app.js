const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const keys = require('../config/keys');
const passport = require('passport')

const env = 'development';
const key = keys[env];
const mongoURI = key.mongoURI;

const Organization = require('./models/organization');
const organizationSeeds = require('./seeds/organizations');
// const Tag = require('../models/tag');
// const tagSeeds = require('./tags');
// const Ticket = require('../models/ticket');
// const ticketSeeds = require('./tickets');
// const User = require('../models/user');
// const userSeeds = require('./users');

const organizationSeeds = [
    {
        handle: "appacademy.io",
        name: "appAcademy",
        motto: "appAcademy: if you liked your old life, you wouldn't be here."
    },
    {
        handle: "gmail.com",
        name: "Google",
        motto: "if you have a gmail account, you work at Google!"
    },
];

const users = require("./routes/api/users")
const tickets = require("./routes/api/tickets")
const tags = require('./routes/api/tags')
const comments = require('./routes/api/comments')

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize())
require('./config/passport')(passport);

app.use("/api/users", users)    
app.use("/api/tickets", tickets)
app.use('api/tags', tags)
app.use('api/comments', comments)

app.listen(port, () => console.log(`Server is running on port ${port}`));

const runOrgSeeds = (seeds) => {
    console.log('Seeding organizations to ' + mongoose.connection.name + '...');

    for (seed of seeds) {
        const newOrg = new Organization(seed);
        newOrg.save().then(newOrg => res.json(newOrg));
    }
};



mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));
    
runOrgSeeds(organizationSeeds);

module.exports = app;