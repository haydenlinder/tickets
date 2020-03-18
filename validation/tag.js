const validText = require('./valid_text');

module.exports = function validateTagInput(tag) {
    let errors = {};

    tag.name = validText(tag.name) ? tag.name : '';

    if (!validText(tag.name)) errors.name = 'A Tag must have a name.';
    if (tag.name.includes(" ")) errors.name = 'A Tag name must not include spaces.'

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}