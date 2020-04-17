const mongoose = require('mongoose');

const seeder = require('./seeder');
const dbSeedData = require('./seed_data');
const genPasswordDigest = require('../utilities/bcrypt_utils');

const KEYS = require('../../config/keys');

const organizationSchema = require('../schemas/organization');
const userSchema = require('../schemas/user');
const ticketSchema = require('../schemas/ticket');
const commentSchema = require('../schemas/comment');
const tagSchema = require('../schemas/tag');


const Organization = mongoose.model('Organization', organizationSchema);
const User = mongoose.model('User', userSchema);
const Ticket = mongoose.model('Ticket', ticketSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Tag = mongoose.model('Tag', tagSchema);


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
const dbConnectionURI = KEYS.mongoURI;
const dbConnectionOptions = {
  'useNewUrlParser': true,
  'useFindAndModify': false,
  'useCreateIndex': true,
  'useUnifiedTopology': true,
};




// const saveUser = function (user) {
//   user.saveAndFind(function (err, results) {
//     if (err) throw err;
//     res.send(results);
//     console.log('results sent.');
//     console.log(results);
//   });
// };

const saveMichael = () => {
  console.log('collections cleared');

  const michael = new User({
    // _id: "5e9781e148949b1f6d884ab0",
    firstName: "Michael",
    lastName: "Jordan",
    email: "michael@acme.org",
    orgHandle: "acme.org",
    password: genPasswordDigest("password")
  });
  console.log(`michael's id: ${michael._id}`);
  console.log("Save MJ!");
  michael.logFullName();

  michael.save(err => { 
    if (err) { throw err }
    else {
      console.log('Michael was saved!');
      console.log(`michael's id: ${michael._id}`);
 
      console.log("finding a user with MJ's email...");
      const MJ = User.find({ email: "michael@acme.org" });
      console.log(MJ._id);
    }

    seeder.disconnect();
  });
};


const clearAndSave = () => {
  console.log("clearing collections");
  return seeder.clearModels(dbCollections, saveMichael);
};


// seeder.connect(dbConnectionURI, dbConnectionOptions, clearAndSave);

seeder.connect(dbConnectionURI, dbConnectionOptions, dbSeed);
// debugger

// console.log(`created a new user: ${derp.firstName} ${derp.lastName}`);