const validText = require('./valid_text');

module.exports = function validateTagInput(tag) {
    let errors = {};

    tag.name = validText(tag.name) ? tag.name : '';

    if (!validText(tag.name)) errors.name = 'Tag name required';
    if (tag.name.includes(" ")) errors.name = 'Tags cannot include spaces'

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}