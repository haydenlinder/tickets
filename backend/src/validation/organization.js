const Validator = require('validator');
const validText = require('./valid_text');
const Organization = require('../models/organization');


module.exports = function validateNewOrg(data) {
    let errors = {};

    data.handle = validText(data.handle) ? data.handle : '';
    data.name = validText(data.name) ? data.name : '';
    data.motto = validText(data.motto) ? data.motto : '';

    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'An Organization needs a handle to use for emails.';
    }

    Organization.findOne({ handle: data.handle }).then(org => {
        if (org) {
            errors.handle = "An Organization with this handle already exists.";
            return res.status(400).json(errors);
        }
    })


    if (Validator.isEmpty(data.name)) {
        errors.name = 'A new Organzation must have a name.';
    }


    if (Validator.isEmpty(data.motto)) {
        errors.motto = 'A new Organzation MUST have a motto!';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};