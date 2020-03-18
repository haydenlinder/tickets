// register.js

const Validator = require('validator');
const validText = require('./valid_text');
const User = require('../models/User');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.first_name = validText(data.first_name) ? data.first_name : '';
    data.last_name = validText(data.last_name) ? data.last_name : '';
    data.email = validText(data.email) ? data.email : '';
    let orgName = data.email.slice(data.email.search("@"));
    orgName = validText(orgName) ? orgName : '';
    data.password = validText(data.password) ? data.password : '';
    data.password2 = validText(data.password2) ? data.password2 : '';
    
    if (Validator.isEmpty(data.first_name)) {
        errors.first_name = 'first_name field is required';
    }

    if (Validator.isEmpty(data.last_name)) {
        errors.last_name = 'last_name field is required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    User.findOne({ organization: orgName }).then(user => {
        if (!user) {
            errors.organization = "your organization is not registered";
            return res.status(400).json(errors);
        }
    })

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters';
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm Password field is required';
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};