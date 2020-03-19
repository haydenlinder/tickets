const express = require('express');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const app = require('../app');

// const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// const key = keys.env;

// const port = process.env.PORT || 5000;
// // app.listen(port, () => console.log(`Seeder is listening on port ${port}`));

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


const Organization = require('../models/organization');
// const organizationSeeds = require('./organizations');
const Tag = require('../models/tag');
const tagSeeds = require('./tags');
const Ticket = require('../models/ticket');
const ticketSeeds = require('./tickets');
const User = require('../models/user');
const userSeeds = require('./users');

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

const seedData = [
    organizationSeeds,
    // tagSeeds,
    // ticketSeeds,
    // userSeeds
];

const runSeeds = (seeds) => {
    console.log('Seeding organizations to ' + mongoose.connection.name + '...');

    for (seed of seeds) {
        const newOrg = new Organization(seed);
        newOrg.save().then(newOrg => res.json(newOrg));
    }
};

runSeeds(seedData);

// // We need to make sure that the Express 4 server connects properly to MongoDB.For that, we can connect via an URL and listen for successful connection events like so:

// const mongoose = require('mongoose');
// const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// const envConfig = require('../server/env')[env];
// mongoose.Promise = require('bluebird');
// mongoose.connect(envConfig.db, { useMongoClient: true, });
// mongoose.connection.on('connected', function () {
//     console.log(`Database connection open to ${mongoose.connection.host} ${mongoose.connection.name}`);
// });
// mongoose.connection.on('error', function (err) {
//     console.log('Mongoose default connection error: ' + err);
// });
// mongoose.connection.on('disconnected', function () {
//     console.log('Mongoose default connection disconnected');
// });


// // With the environment config file defined like so:

// const path = require('path'),
// rootPath = path.normalize(__dirname + '/../../');

// module.exports = {
//     development: {
//         rootPath: rootPath,
//         db: "mongodb+srv://dev:uQ1Ak6eYRdFq0hWq@tickets-tgtki.mongodb.net/mern-dev?retryWrites=true&w=majority",
//         port: process.env.PORT || 3000
//     },
//     stage: {
//         rootPath: rootPath,
//         db: process.env.MONGOLAB_URI || "mongodb+srv://dev:uQ1Ak6eYRdFq0hWq@tickets-tgtki.mongodb.net/mern?retryWrites=true&w=majority",
//         port: process.env.PORT || 3000
//     },
//     production: {
//         rootPath: rootPath,
//         db: process.env.MONGOLAB_URI || 'you can add a mongolab uri here ($ heroku config | grep MONGOLAB_URI)',
//         port: process.env.PORT || 80
//     }
// };

// // The seeder itself we’re going to run from the command line.It’s a bit verbose but goes through the process of creating and updating records in MongoDB with Mongoose.js.

// require('./index');
// const mongoose = require('mongoose');
// const { Author, Book } = require('../server/models');
// async function seedAuthors() {
//     console.log('Seeding authors to ' + mongoose.connection.name + '...');
//     const authors = [
//         { name: 'JK Rowling', bio: 'J.K. Rowling is the author of the much-loved series of seven Harry Potter novels, originally published between 1997 and 2007.' },
//         { name: 'Tony Robbins', bio: 'Tony Robbins is an entrepreneur, best-selling author, philanthropist and the nation\'s #1 Life and Business Strategist.' },
//     ];
//     for (author of authors) {
//         var newAuthor = new Author(author);
//         await newAuthor.save();
//     }
//     const a = await Author.find();
//     console.log('authors: ', a);
// }
// async function seedBooks() {
//     console.log('Seeding books to ' + mongoose.connection.name + '...');
//     const jkRowling = await Author.findOne({ name: 'JK Rowling' });
//     const tonyRobbins = await Author.findOne({ name: 'Tony Robbins' });
//     let harryPotter = new Book({ title: 'Harry Potter', author: jkRowling._id });
//     let awakenGiant = new Book({ title: 'Awaken the Giant Within', author: tonyRobbins._id });
//     await harryPotter.save();
//     await awakenGiant.save();
//     jkRowling.books.push(harryPotter);
//     tonyRobbins.books.push(awakenGiant);
//     await jkRowling.save();
//     await tonyRobbins.save();
// }
// seedAuthors();
// seedBooks();


// // This will create a new connection to the MongoDB database and then convert a normal array of JavaScript objects into data we can persistently access.The author will have an array of books with one book for each author in the array.To add more books, we can push to the books array and save the changes.Each book will have one author.MongoDB stores these relationships via the id.Using the populate method in our controller above, we'll be able to view the entire object.

// // After running the seeder, you should be able to see your records in MongoDB Compass, as shown below.Compass is a GUI for viewing, creating, deleting, querying and editing MongoDB data.





























// // // import seeder from "mongoose-seed";
// // const { seeder } = require('mongo-seeding');

// // // const db = require('./config/keys').mongoURI;
// // const config = {
// //     database: {
// //         host: '127.0.0.1',
// //         port: 27017,
// //         name: 'mydatabase',
// //     },
// //     dropDatabase: true,
// // };

// // const organizationModel = require('../models/organization');
// // const organizationSeeds = require('./organizations');
// // const tagModel = require('../models/tag');
// // const tagSeeds = require('./tags');
// // const ticketModel = require('../models/ticket');
// // const ticketSeeds = require('./tickets');
// // const userModel = require('../models/user');
// // const userSeeds = require('./users');


// const seeds = [
//     organizationSeeds,
//     // tagSeeds,
//     // ticketSeeds,
//     userSeeds
// ];

// // seeder.connect(db, () => {
// //     seeder.loadModels([
// //         '../models/organization',
// //         // '../models/tag',
// //         // '../models/ticket',
// //         '../models/user',
// //     ]);
// //     seeder.clearModels([
// //         'organization',
// //         // 'tag',
// //         // 'ticket',
// //         'user',
// //     ], () => {
// //         seeder.populateModels(seeds, (err, done) => {
// //             if (err) {
// //                 return console.log("seeding error", err);
// //             }
// //             if (done) {
// //                 return console.log("seeding completed", done);
// //             }
// //             seeder.disconnect()
// //         });
// //     });
// // });