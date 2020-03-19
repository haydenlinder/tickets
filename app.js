const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const keys = require('./config/keys');
const passport = require('passport')

const env = 'development';
const key = keys[env];
const mongoURI = key.mongoURI;

const Organization = require('./models/organization');
// const organizationSeeds = require('./seeds/organizations');
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

// const runOrgSeeds = (seeds) => {
//     console.log('Seeding organizations to ' + mongoose.connection.name + '...');

//     for (seed of seeds) {
//         const newOrg = new Organization(seed);
//         await newOrg.save();
//     }
//     const a = await Organization.find();
//     console.log('organizations: ', a);
// };


// mongoose.Promise = require('bluebird');
// mongoose.connect(key.mongoURI, { useNewUrlParser: true });
// mongoose.connection.on('connected', () => {
//     console.log(`Database connection open to ${mongoose.connection.host} ${mongoose.connection.name}`);
// });
// mongoose.connection.on('error', (err) => {
//     console.log('Mongoose default connection error: ' + err);
// });
// mongoose.connection.on('disconnected', () => {
//     console.log('Mongoose default connection disconnected');
// });

// runOrgSeeds(organizationSeeds);

// module.exports = app;