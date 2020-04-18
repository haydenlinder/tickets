const mongoose = require('mongoose');

const seeder = require('./seeder');
const dbSeedData = require('./seed_data');

const dotenv = require('dotenv');
dotenv.config();


// collections to clear before seeding
const dbCollections = [
  'Organization',
  'User',
  'Ticket',
  'Comment',
  'Tag',
];


// Callback function to populate DB once collections have been cleared
const dbPopulate = () => {
  seeder.populateModels(dbSeedData, () => {seeder.disconnect()});
};


const dbSeed = () => {
  // seeder.loadModels is no longer needed -- models are loaded above.
  seeder.loadModels( [] );
  console.log("Schemas registered for all mongoose models")

  // Clear existing collections, then populate db using seed data
  seeder.clearModels(dbCollections, dbPopulate);
};


// Connect to MogoDB via Mongoose
const dbConnectionURI = process.env.URI;
const dbConnectionOptions = {
  'useNewUrlParser': true,
  'useFindAndModify': false,
  'useCreateIndex': true,
  'useUnifiedTopology': true,
};


seeder.connect(dbConnectionURI, dbConnectionOptions, dbSeed);
