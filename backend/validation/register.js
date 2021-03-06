const Validator = require('validator');
const validText = require('./valid_text');
const User = require('../models/user');
const Organization = require('../models/organization');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.firstName = validText(data.firstName) ? data.firstName : '';
    data.lastName = validText(data.lastName) ? data.lastName : '';
    data.email = validText(data.email) ? data.email : '';
    let orgHandle = data.email.slice(data.email.search("@"));
    orgHandle = validText(orgHandle) ? orgHandle : '';
    data.password = validText(data.password) ? data.password : '';
    data.password2 = validText(data.password2) ? data.password2 : '';
    
    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = 'A first name is required.';
    }

    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = 'A last name is required.';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'An email is required.';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'The format of your email@address may be incorrect.';
    }

    User.findOne({ email: data.email }).then(user => {
        if (!user) {
            errors.email = "A User with this email already exists.";
        }
    })

    Organization.findOne({ handle: orgHandle })
    .then(orgData => {
        if (orgData == null) {
            errors.handle = "Your company is not registered.";
        }
    })

    if (Validator.isEmpty(data.password)) {
        errors.password = 'A password is required.';
    }

    if (!Validator.isLength(data.password, { min: 6 })) {
        errors.password = 'Your password must have least 6 characters.';
    }

    if (!Validator.isLength(data.password, { max: 30 })) {
        errors.password = 'Your password must have fewer than 30 characters.';
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Please confirm your password by reentering it.';
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'The passwords you entered do not match.';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};