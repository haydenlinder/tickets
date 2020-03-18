import seeder from "mongoose-seed";
const db = require('./config/keys').mongoURI;

// const organizationModel = require('../models/organization');
const organizationSeeds = require('./organizations');
// const tagModel = require('../models/tag');
const tagSeeds = require('./tags');
// const ticketModel = require('../models/ticket');
const ticketSeeds = require('./tickets');
// const userModel = require('../models/user');
const userSeeds = require('./users');


const seeds = [
    organizationSeeds,
    // tagSeeds,
    // ticketSeeds,
    userSeeds
];

seeder.connect(db, () => {
    seeder.loadModels([
        '../models/organization',
        // '../models/tag',
        // '../models/ticket',
        '../models/user',
    ]);
    seeder.clearModels([
        'organization',
        // 'tag',
        // 'ticket',
        'user',
    ], () => {
        seeder.populateModels(seeds, (err, done) => {
            if (err) {
                return console.log("seeding error", err);
            }
            if (done) {
                return console.log("seeding completed", done);
            }
            seeder.disconnect()
        });
    });
});