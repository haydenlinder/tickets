const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const express = require("express");
const router = express.Router();
const keys = require('../../../config/keys');
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const User = require('../../models/user');
// const deepPopulate = require('mongoose-deep-populate')
// User.plugin(deepPopulate)

router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email = "User already exists";
            return res.status(400).json(errors);
        } else {
            const orgHandle = req.body.email.slice(req.body.email.search("@"));
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                orgHandle: orgHandle,
                password: req.body.password
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
                            orgHandle: user.orgHandle,
                            email: user.email,
                            starred: user.starred
                        };

                        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            res.status(201).json({
                                success: true,
                                token: "Bearer " + token
                            });
                        });
                    })
                    .catch(err => console.log(err));
                });
            });
        }
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
            if (isMatch) {
                const payload = { 
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    orgHandle: user.orgHandle,
                    starred: user.starred, 
                };

                jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                });
            } else {
                errors.password = "Incorrect password";
                return res.status(400).json(errors);
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
      .then(user => res.json(user))
      .catch(err => err.status(404).json(err));
});

router.patch('/:userId', (req, res) => {
    User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
      .then(user => res.json(user))
      .catch(err => err.status(422).json(err));
});

// Get all users
router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
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