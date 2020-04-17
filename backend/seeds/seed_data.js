const mongoose = require('mongoose');

const genPasswordDigest = require('../utilities/bcrypt_utils');
const organizationSchema = require('../schemas/organization');
const userSchema = require('../schemas/user');
const tagSchema = require('../schemas/tag');
const ticketSchema = require('../schemas/ticket');
const commentSchema = require('../schemas/comment');


const Organization = mongoose.model('Organization', organizationSchema);
const User = mongoose.model('User', userSchema);
const Tag = mongoose.model('Tag', tagSchema);
const Ticket = mongoose.model('Ticket', ticketSchema);
const Comment = mongoose.model('Comment', commentSchema);


// Organization seeds
const organizationSeeds = {
  model: 'Organization',
  documents: []
};

const acme = new Organization({
  handle: "acme.org",
  name: "ACME",
  motto: "That's all folks!"
});
organizationSeeds.documents.push(acme);


// User seeds
  const userSeeds = {
    model: 'User',
    documents: []
  };

const bugs = new User({
  firstName: "Bugs",
  lastName: "Bunny",
  email: "bugs@acme.org",
  orgHandle: "acme.org",
  password: genPasswordDigest("password")
});
userSeeds.documents.push(bugs);

const daffy = new User({
  firstName: "Daffy",
  lastName: "Duck",
  email: "daffy@acme.org",
  orgHandle: "acme.org",
  password: genPasswordDigest("password")
});
userSeeds.documents.push(daffy);

const porky = new User({
  firstName: "Porky",
  lastName: "Pig",
  email: "porky@acme.org",
  orgHandle: "acme.org",
  password: genPasswordDigest("password")
});
userSeeds.documents.push(porky);

const speedy = new User({
  firstName: "Speedy",
  lastName: "Gonzales",
  email: "speedy@acme.org",
  orgHandle: "acme.org",
  password: genPasswordDigest("password")
});
userSeeds.documents.push(speedy);

const yosemite = new User({
  firstName: "Yosemite",
  lastName: "Sam",
  email: "yosemite@acme.org",
  orgHandle: "acme.org",
  password: genPasswordDigest("password")
});
userSeeds.documents.push(yosemite);

const lola = new User({
  firstName: "Lola",
  lastName: "Bunny",
  email: "lola@acme.org",
  orgHandle: "acme.org",
  password: genPasswordDigest("password")
});
userSeeds.documents.push(lola);

const taz = new User({
  firstName: "Tasmanian",
  lastName: "Devil",
  email: "taz@acme.org",
  orgHandle: "acme.org",
  password: genPasswordDigest("password")
});
userSeeds.documents.push(taz);

const marvin = new User({
  firstName: "Marvin the",
  lastName: "Martian",
  email: "marvin@acme.org",
  orgHandle: "acme.org",
  password: genPasswordDigest("password")
});
userSeeds.documents.push(marvin);

const sylvester = new User({
  firstName: "Sylvester the",
  lastName: "Cat",
  email: "sylvester@acme.org",
  orgHandle: "acme.org",
  password: genPasswordDigest("password")
});
userSeeds.documents.push(sylvester);

const tweety = new User({
  firstName: "Tweety",
  lastName: "Bird",
  email: "tweety@acme.org",
  orgHandle: "acme.org",
  password: genPasswordDigest("password")
});
userSeeds.documents.push(tweety);

const foghorn = new User({
  firstName: "Foghorn",
  lastName: "Leghorn",
  email: "foghorn@acme.org",
  orgHandle: "acme.org",
  password: genPasswordDigest("password")
});
userSeeds.documents.push(foghorn);

const pepe = new User({
  firstName: "Pepé",
  lastName: "Le Pew",
  email: "pepe@acme.org",
  orgHandle: "acme.org",
  password: genPasswordDigest("password")
});
userSeeds.documents.push(pepe);

const granny = new User({
  firstName: "Granny",
  lastName: "Webster",
  email: "granny@acme.org",
  orgHandle: "acme.org",
  password: genPasswordDigest("password")
});
userSeeds.documents.push(granny);

const elmer = new User({
  firstName: "Elmer",
  lastName: "Fudd",
  email: "elmer@acme.org",
  orgHandle: "acme.org",
  password: genPasswordDigest("password")
});
userSeeds.documents.push(elmer);

const wilee = new User({
  firstName: "Wile E.",
  lastName: "Coyote",
  email: "wilee@acme.org",
  orgHandle: "acme.org",
  password: genPasswordDigest("password")
});
userSeeds.documents.push(wilee);

const roadRunner = new User({
  firstName: "Road",
  lastName: "Runner",
  email: "roadRunner@acme.org",
  orgHandle: "acme.org",
  password: genPasswordDigest("password")
});
userSeeds.documents.push(roadRunner);

const michael = new User({
  firstName: "Michael",
  lastName: "Jordan",
  email: "michael@acme.org",
  orgHandle: "acme.org",
  password: genPasswordDigest("password")
});
userSeeds.documents.push(michael);

const wayne = new User({
  firstName: "Wayne",
  lastName: "Knight",
  email: "wayne@acme.org",
  orgHandle: "acme.org",
  password: genPasswordDigest("password")
});
userSeeds.documents.push(wayne);



// Tag seeds
const tagSeeds = {
  model: 'Tag',
  documents: []
};

const spaceJam = new Tag({
  name: "SPACE_JAM",
  orgHandle: "acme.org"
});
tagSeeds.documents.push(spaceJam);

const merryMelodies = new Tag({
  name: "MERRY_MELODIES",
  orgHandle: "acme.org"
});
tagSeeds.documents.push(merryMelodies);

const loonyTunes = new Tag({
  name: "LOONY_TUNES",
  orgHandle: "acme.org"
});
tagSeeds.documents.push(loonyTunes);

const cartoonNetwork = new Tag({
  name: "CARTOON_NETWORK",
  orgHandle: "acme.org"
});
tagSeeds.documents.push(cartoonNetwork);


// Ticket seeds
const ticketSeeds = {
  model: 'Ticket',
  documents: []
};
  
// Start of Space Jam
const challengeAliens = new Ticket({
  title: "Challenge Aliens to a Competition",
  body: "These alien pipsqueeks want to take us to their theme park in outer space and make us slaves! Luckily, the rules give us a chance to defend ourselves...",
  status: "In Progress",
  priority: "High",
  creator: bugs._id,
  owner: daffy._id,
  tags: [spaceJam._id],
  subscribed: [bugs._id, daffy._id, porky._id, sylvester._id, elmer._id, granny._id, lola._id],
  lastUpdateSeenBy: [bugs._id, daffy._id, porky._id, sylvester._id, elmer._id],
});
ticketSeeds.documents.push(challengeAliens);

const intimidateOpposition = new Ticket({
  title: "Intimidate the Opposition",
  body: "lorem ipsum",
  status: "In Progress",
  priority: "High",
  creator: yosemite.id,
  owner: elmer.id,
  tags: [spaceJam._id],
  subscribed: [  ],
  lastUpdateSeenBy: [  ],
});
ticketSeeds.documents.push(intimidateOpposition);

const getSomeHelp = new Ticket({
  title: "Get Some Help!",
  body: "lorem ipsum",
  status: "In Progress",
  priority: "High",
  creator: daffy._id,
  owner: porky._id,
  tags: [spaceJam._id],
  subscribed: [],
  lastUpdateSeenBy: [],
});
ticketSeeds.documents.push(getSomeHelp);

const mikeOrientation = new Ticket({
  title: "Introduce Mike to the Gang",
  body: "lorem ipsum",
  status: "In Progress",
  priority: "High",
  creator: foghorn._id,
  owner: tweety._id,
  tags: [spaceJam._id],
  subscribed: [],
  lastUpdateSeenBy: [],
});
ticketSeeds.documents.push(mikeOrientation);

const cleanCourt = new Ticket({
  title: "Clean Basketball Court",
  body: "lorem ipsum",
  status: "In Progress",
  priority: "High",
  creator: granny._id,
  owner: taz._id,
  tags: [spaceJam._id],
  subscribed: [],
  lastUpdateSeenBy: [],
});
ticketSeeds.documents.push(cleanCourt);

const getMikesGear = new Ticket({
  title: "Get Mike's Basketball Gear from 3-D Land",
  body: "Someone's gonna have to go my house and pick up my basketball gear. Whatever you do, don't forget my North Carolina shorts.",
  status: "In Progress",
  priority: "High",
  creator: michael._id,
  owner: pepe._id,
  tags: [spaceJam._id],
  subscribed: [],
  lastUpdateSeenBy: [],
});
ticketSeeds.documents.push(getMikesGear);

const trainForGame = new Ticket({
  title: "Train for the Big Game",
  body: "lorem ipsum",
  status: "In Progress",
  priority: "High",
  creator: speedy._id,
  owner: foghorn._id,
  tags: [spaceJam._id],
  subscribed: [],
  lastUpdateSeenBy: [],
});
ticketSeeds.documents.push(trainForGame);

const refreshments = new Ticket({
  title: "Team Refreshments",
  body: "lorem ipsum",
  status: "In Progress",
  priority: "High",
  creator: taz._id,
  owner: granny._id,
  tags: [spaceJam._id],
  subscribed: [  ],
  lastUpdateSeenBy: [  ],
});
ticketSeeds.documents.push(refreshments);

const mikesSecretStuff = new Ticket({
  title: "Inspire Team with Michael's Secret Stuff",
  body: "lorem ipsum",
  status: "In Progress",
  priority: "High",
  creator: bugs._id,
  owner: bugs._id,
  tags: [spaceJam._id],
  subscribed: [  ],
  lastUpdateSeenBy: [  ],
});
ticketSeeds.documents.push(mikesSecretStuff);

const returnPowers = new Ticket({
  title: "Give the NBA players back their basketball powers",
  body: "lorem ipsum",
  status: "In Progress",
  priority: "High",
  creator: michael._id,
  owner: wayne._id,
  tags: [spaceJam._id],
  subscribed: [  ],
  lastUpdateSeenBy: [  ],
});
ticketSeeds.documents.push(returnPowers);
// end of Space Jam


const celebrate = new Ticket({
  title: "Celebrate Our Victory!",
  body: "lorem ipsum",
  status: "In Progress",
  priority: "High",
  creator: lola._id,
  owner: speedy._id,
  tags: [spaceJam._id],
  subscribed: [  ],
  lastUpdateSeenBy: [  ],
});
ticketSeeds.documents.push(celebrate);

const destroyEarth = new Ticket({
  title: "Destroy the planet Earth",
  body: "At last, after 2,000 years of work, the aludium pu-36 explosive space modulator is within my grasp! My dream will finally come true!",
  status: "Planned",
  priority: "CATastrophic",
  creator: marvin._id,
  owner: marvin._id,
  subscribed: [bugs._id, daffy._id],
  lastUpdateSeenBy: [  ],
});
ticketSeeds.documents.push(destroyEarth);

const catchRRWithBike = new Ticket({
  title: "Catch Road Runner using ACME Jet Bike Kit",
  body: "Like a motorcycle, only without the wheels.",
  status: "Closed",
  priority: "High",
  creator: wilee._id,
  owner: wilee._id,
  subscribed: [wilee._id, roadRunner._id],
  lastUpdateSeenBy: [roadRunner._id],
});
ticketSeeds.documents.push(catchRRWithBike);

const catchRRWithBoulder = new Ticket({
  title: "Catch Road Runner using ACME Dehydrated Boulder Kit",
  body: "Instant Boulders: Just add water",
  status: "Planned",
  priority: "High",
  creator: wilee._id,
  owner: wilee._id,
  subscribed: [wilee._id, roadRunner._id],
  lastUpdateSeenBy: [roadRunner._id],
});
ticketSeeds.documents.push(catchRRWithBoulder);

const catchRRWithRB = new Ticket({
  title: "Catch Road Runner using ACME Giant Rubber Band",
  body: "Contents: One (1) Giant Rubber Band (for tripping Road Runners)",
  status: "In Progress",
  priority: "High",
  creator: wilee._id,
  owner: wilee._id,
  subscribed: [wilee._id, roadRunner._id],
  lastUpdateSeenBy: [roadRunner._id],
});
ticketSeeds.documents.push(catchRRWithRB);

const catchRRWithEQ = new Ticket({
  title: "Catch Road Runner using ACME Earthquake Pills",
  body: "Why wait? Make your own earthquakes -- loads of fun! (DISCLAIMER: has no effect on Road Runners...)",
  status: "Planned",
  priority: "High",
  creator: wilee._id,
  owner: wilee._id,
  subscribed: [wilee._id, roadRunner._id],
  lastUpdateSeenBy: [roadRunner._id],
});
ticketSeeds.documents.push(catchRRWithEQ);

const huntingSeason = new Ticket({
  title: "Hunting Season",
  body: "Be vewy vewy quiet. I'm hunting wabbits! Hahahahahah",
  status: "In Progress",
  priority: "High",
  creator: elmer._id,
  owner: elmer._id,
  subscribed: [elmer._id, bugs._id, daffy._id],
  lastUpdateSeenBy: [bugs._id],
});
ticketSeeds.documents.push(huntingSeason);


// Comment seeds
const commentSeeds = {
  model: 'Comment',
  documents: []
};

const challengeAliensComment01 = new Comment({
  body: "All right troops. It is for us to choose a battlefield that affords us.",
  author: bugs._id,
  ticket: challengeAliens._id,
  createdAt: (Date.now() - 190000000),
  updatedAt: (Date.now() - 190000000)
});
commentSeeds.documents.push(challengeAliensComment01);

const challengeAliensComment02 = new Comment({
  body: "Oh, I-I g-got it.",
  author: porky._id,
  ticket: challengeAliens._id,
  createdAt: (Date.now() - 189000000),
  updatedAt: (Date.now() - 189000000)
    });
commentSeeds.documents.push(challengeAliensComment02);

const challengeAliensComment03 = new Comment({
  body: "Yes, Private Porkster?",
      author: bugs._id,
      ticket: challengeAliens._id,
      createdAt: (Date.now() - 188000000),
      updatedAt: (Date.now() - 188000000)
    });
commentSeeds.documents.push(challengeAliensComment03);
    
const challengeAliensComment04 = new Comment({
  body: "How about we challenge them to a spelling bee?",
      author: porky._id,
      ticket: challengeAliens._id,
      createdAt: (Date.now() - 187000000),
      updatedAt: (Date.now() - 187000000)
    });
commentSeeds.documents.push(challengeAliensComment04);
    
const challengeAliensComment05 = new Comment({
  body: "Say, we could have a bowling tournament...",
      author: elmer._id,
      ticket: challengeAliens._id,
      createdAt: (Date.now() - 186000000),
      updatedAt: (Date.now() - 186000000)
    });
commentSeeds.documents.push(challengeAliensComment05);
    
const challengeAliensComment06 = new Comment({
  body: "Suffering succotash! What's wrong with all of ya? I say we get a ladder, wait til the old lady's out of the room, then grab the little bird.",
      author: sylvester._id,
      ticket: challengeAliens._id,
      createdAt: (Date.now() - 185000000),
      updatedAt: (Date.now() - 185000000)
    });
commentSeeds.documents.push(challengeAliensComment06);
    
const challengeAliensComment07 = new Comment({
  body: "Whoa, whoa. Take a deep breath Sly.",
      author: granny._id,
      ticket: challengeAliens._id,
      createdAt: (Date.now() - 184000000),
      updatedAt: (Date.now() - 184000000)
    });
commentSeeds.documents.push(challengeAliensComment07);
    
const challengeAliensComment08 = new Comment({
  body: "Okay, Let's anaylze the competition here. Now, what are looking at here? We got a small race of invading aliens.",
      author: bugs._id,
      ticket: challengeAliens._id,
      createdAt: (Date.now() - 183000000),
      updatedAt: (Date.now() - 183000000)
    });
commentSeeds.documents.push(challengeAliensComment08);
    
const challengeAliensComment09 = new Comment({
  body: "Small arms, short legs.",
      author: marvin._id,
      ticket: challengeAliens._id,
      createdAt: (Date.now() - 182000000),
      updatedAt: (Date.now() - 182000000)
    });
commentSeeds.documents.push(challengeAliensComment09);
    
const challengeAliensComment10 = new Comment({
  body: "Not vewy fast...",
      author: elmer._id,
      ticket: challengeAliens._id,
      createdAt: (Date.now() - 181000000),
      updatedAt: (Date.now() - 181000000)
    });
commentSeeds.documents.push(challengeAliensComment10);
    
const challengeAliensComment11 = new Comment({
  body: "Tiny little guys.",
      author: sylvester._id,
      ticket: challengeAliens._id,
      createdAt: (Date.now() - 180000000),
      updatedAt: (Date.now() - 180000000)
    });
commentSeeds.documents.push(challengeAliensComment11);
    
const challengeAliensComment12 = new Comment({
  body: "Can't jump high.",
      author: porky._id,
      ticket: challengeAliens._id,
      createdAt: (Date.now() - 179000000),
      updatedAt: (Date.now() - 179000000)
    });
commentSeeds.documents.push(challengeAliensComment12);
    
const challengeAliensComment13 = new Comment({
  body: "Isn't it obvious?",
      author: lola._id,
      ticket: challengeAliens._id,
      createdAt: (Date.now() - 178900000),
      updatedAt: (Date.now() - 178900000)
    });
commentSeeds.documents.push(challengeAliensComment13);
    
const challengeAliensComment14 = new Comment({
  body: "You thinkin' what I'm thinkin' Lola?",
      author: bugs._id,
      ticket: challengeAliens._id,
      createdAt: (Date.now() - 178800000),
      updatedAt: (Date.now() - 178800000)
    });
commentSeeds.documents.push(challengeAliensComment14);

const challengeAliensComment15 = new Comment({
  body: "Don't leave us in suspense, spit it out already!",
  author: daffy._id,
  ticket: challengeAliens._id,
  createdAt: (Date.now() - 177000000),
  updatedAt: (Date.now() - 177000000)
});
commentSeeds.documents.push(challengeAliensComment15);
    
const challengeAliensComment16 = new Comment({
  body: "We'll challenge them to a game of basketball!",
  author: lola._id,
  ticket: challengeAliens._id,
  createdAt: (Date.now() - 177000000),
  updatedAt: (Date.now() - 177000000)
});
commentSeeds.documents.push(challengeAliensComment16);


const destroyEarthComment01 = new Comment({
  body: "Oh, drat these computers. They're so naughty and complex, I could pinch them.",
  author: "5e9781e148949b1f6d884ab8",
  ticket: destroyEarth._id,
  createdAt: (Date.now() - 90000000),
  updatedAt: (Date.now() - 90000000)
});
commentSeeds.documents.push(destroyEarthComment01);

const destroyEarthComment02 = new Comment({
  body: "Hey, nice lookin' toy you got there kiddo. What else did your daddy get you for Christmas?",
  author: "5e9781e148949b1f6d884ab2",
  ticket: destroyEarth._id,
  createdAt: (Date.now() - 89000000),
  updatedAt: (Date.now() - 89000000)
});
commentSeeds.documents.push(destroyEarthComment02);

const destroyEarthComment03 = new Comment({
  body: "Please sir, do not interrupt my chain of thought. I'm a busy Martian.",
  author: "5e9781e148949b1f6d884ab8",
  ticket: destroyEarth._id,
  createdAt: (Date.now() - 88000000),
  updatedAt: (Date.now() - 88000000)
});
commentSeeds.documents.push(destroyEarthComment03);

const destroyEarthComment04 = new Comment({
  body: "Ehhhh pardon me Doc, but could you rent me a U-Drive flying saucer? I've gotta get back to the Earth.",
  author: bugs._id,
  ticket: destroyEarth._id,
  createdAt: (Date.now() - 87000000),
  updatedAt: (Date.now() - 87000000)
});
commentSeeds.documents.push(destroyEarthComment04);

const destroyEarthComment05 = new Comment({
  body: "The Earth? Oh, the Earth will be destroyed in just a few moments.",
  author: "5e9781e148949b1f6d884ab8",
  ticket: destroyEarth._id,
  createdAt: (Date.now() - 86000000),
  updatedAt: (Date.now() - 86000000)
});
commentSeeds.documents.push(destroyEarthComment05);

const destroyEarthComment06 = new Comment({
  body: "Ehhhh pardon me again Doc, but just what did you mean by that crack about the Earth being gone?",
  author: bugs._id,
  ticket: destroyEarth._id,
  createdAt: (Date.now() - 85000000),
  updatedAt: (Date.now() - 85000000)
});
commentSeeds.documents.push(destroyEarthComment06);



const destroyEarthComment07 = new Comment({
  body: "Oh, I'm going to blow it up. It obstructs my view of Venus.",
  author: "5e9781e148949b1f6d884ab8",
  ticket: destroyEarth._id,
  createdAt: (Date.now() - 84000000),
  updatedAt: (Date.now() - 84000000)
});
commentSeeds.documents.push(destroyEarthComment07);

const destroyEarthComment08 = new Comment({
  body: "What?!?",
  author: "5e9781e148949b1f6d884ab2",
  ticket: destroyEarth._id,
  createdAt: (Date.now() - 83000000),
  updatedAt: (Date.now() - 83000000)
});
commentSeeds.documents.push(destroyEarthComment08);


const catchRRWithBikeComment01 = new Comment({
  body: "Ouch!!",
  author: wilee._id,
  ticket: catchRRWithBike._id
});
commentSeeds.documents.push(catchRRWithBikeComment01);

const catchRRWithBikeComment02 = new Comment({
  body: "Well that didn't work.",
  author: wilee._id,
  ticket: catchRRWithBike._id
});
commentSeeds.documents.push(catchRRWithBikeComment02);

const catchRRWithBikeComment03 = new Comment({
  body: "Beep beep!",
  author: roadRunner._id,
  ticket: catchRRWithBike._id
});
commentSeeds.documents.push(catchRRWithBikeComment03);


const catchRRWithBoulderComment01 = new Comment({
  body: "Just sent away for the kit!",
  author: wilee._id,
  ticket: catchRRWithBoulder._id
});
commentSeeds.documents.push(catchRRWithBoulderComment01);

const catchRRWithBoulderComment02 = new Comment({
  body: "I have a good feeling about this one...",
  author: wilee._id,
  ticket: catchRRWithBoulder._id
});
commentSeeds.documents.push(catchRRWithBoulderComment02);





// Data array containing seed data - documents organized by Model
const dbSeedData = [
  organizationSeeds,
  userSeeds,
  ticketSeeds,
  commentSeeds,
  tagSeeds,
];


module.exports = dbSeedData;
