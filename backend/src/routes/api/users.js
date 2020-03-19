require('dotenv').config();
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../../models/user');

// Authentication utilities
const APP_SECRET = process.env.APP_SECRET;

const encrcyptPassword = (plaintextPassword) => {
    bcrypt.hash(plaintextPassword, 10, (err, hash) => {
        if (err) { throw err } else { return hash} 
    })
};

const comparePasswords = (passwordAttempt, user) => {
    bcrypt.compare(passwordAttempt, user.passwordDigest).then(
        isMatch => {
            if (isMatch) {
                return user;
            } else {
                errors.password = "Incorrect password";
                return res.status(400).json(errors);
            };
        }
    ).catch(
        err => res.status(400).json('Error: ' + err)
    );
};

const generateJWT = (currentUser) => {
    const payload = {
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        orgHandle: currentUser.orgHandle
    };
    let result = {};
    jwt.sign(payload, APP_SECRET, { expiresIn: 3600 }, (err, token) => {
        if (err) { throw err} else {
            result = {
                success: true,
                token: "Bearer " + token
            };
        }
    });
    return result;
};

// Router
const usersRouter = express.Router();

usersRouter.route('/register').post(
    (req, res) => {
        // validate new user
        const { errors, isValid } = validateRegisterInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        User.findOne({ email: req.body.email }).then(
            user => {
                if (user) {
                    errors.email = "User already exists";
                    return res.status(400).json(errors);
                }
            }
        ).catch(
            err => res.status(400).json('Error: ' + err)
        );

        // save new user
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            orgHandle: req.body.email.slice(req.body.email.search("@")),
            passwordDigest: encryptPassword(req.body.password)
        });
        newUser.save().then(
            user => { res.json(generateJWT(user)) }
        ).catch(
            err => res.status(400).json('Error: ' + err)
        );
    }
);

usersRouter.route('/login').post(
    (req, res) => {
        // validate returning user
        const { errors, isValid } = validateLoginInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        
        User.findOne({ email: req.body.email }).then(
            user => {
                if (!user) {
                    errors.email = "There is no account associated with that email";
                    return res.status(400).json(errors);
                }
                passwordAttempt = req.body.password;
                comparePasswords(passwordAttempt, user);
            }                                                   
        ).then(
            user => { res.json(generateJWT(user)) }
        ).catch(
            err => res.status(400).json('Error: ' + err)
        );
    }
);

router.route('/current').get(
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        User.find().then(
            users => res.json(users)
        ).catch(
            err => res.status(400).json('Error: ' + err)
        );
    }
);

module.exports = usersRouter;