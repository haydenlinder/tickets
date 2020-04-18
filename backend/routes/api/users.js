const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const express = require("express");
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const User = require('../../models/user');

router.get('/?search', (req, res) => {
  const nameFragment = req.query.nameFragment;
  User.find({ 
    orgHandle: req.query.orgHandle,
    $or: [
      { firstName: { $regex: nameFragment, $options: "i" } } ,
      { lastName:  { $regex: nameFragment, $options: "i" } },
    ]
  })
  .then(users => {
    res.json(users);
  })
  .catch(err => {
    res.status(404).json({ nousersfound: "Sorry, no users match your search." })
  });
})

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
  .then(user => {
    if (user) {
      errors.email = "User already exists";
      return res.status(400).json(errors);
    } 
  })
  .then( () => {
    const orgHandle = req.body.email.slice(req.body.email.search("@"));
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      orgHandle: orgHandle,
      password: req.body.password,
      createdAt: req.body.createdAt
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;
        newUser.save()
        .then(user => {
          const payload = { 
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            orgHandle: user.orgHandle,
            starred: user.starred,
            createdAt: user.createdAt
          };
          jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: 3600 }, 
            (err, token) => {
              res.status(201).json({
                success: true,
                token: "Bearer " + token
              });
          });
        })
        .catch(err => console.log(err));
      });

    });

  });

});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
  .then(user => {
    if (!user) {
      errors.email = "There is no account associated with that email";
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      } else {
        const payload = { 
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          orgHandle: user.orgHandle,
          starred: user.starred, 
          createdAt: user.createdAt
        };

        jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });

      }

    });

  });

});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    _id: req.user._id,
    email: req.user.email
  });
});

router.get('/:userId', (req, res) => {
  User.findById(req.params.userId)
  .then(user => res.json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    orgHandle: user.orgHandle,
    starred: user.starred,
    createdAt: user.createdAt
  }))
  .catch(err => res.status(404).json(err));
});

router.patch('/:userId', (req, res) => {
  User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
  .then(user => res.json(user))
  .catch(err => res.status(422).json(err));
});

// Get all users with the specified orgHandle
router.get('/orgHandle/:orgHandle', (req, res) => {
  const orgHandle = req.params.orgHandle;

  User.find({ orgHandle: orgHandle })
  .then(users => res.json(users))
  .catch(err => {
    res.status(400).json({
      message:
      err.message || `No users found with orgHandle=${orgHandle}`
    });
  });
});


module.exports = router;
