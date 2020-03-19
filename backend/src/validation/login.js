const Validator = require('validator');
const validText = require('./valid_text');

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = validText(data.email) ? data.email : '';
    data.password = validText(data.password) ? data.password : '';

    if (!Validator.isEmail(data.email)) {
        errors.email = 'The format of your email@address may be incorrect.';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Your email is required for login.';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Your password is required for login.';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};