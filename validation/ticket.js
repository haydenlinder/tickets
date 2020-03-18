const Validator = require('validator');
const validText = require('./valid_text');

module.exports = function validateTicketInput(ticket) {
    let errors = {};

    ticket.title = validText(ticket.title) ? ticket.title : ''
    ticket.body = validText(ticket.body) ? ticket.body : ''

    if (Validator.isEmpty(ticket.title)) {
        errors.title = "A Ticket must have a title."
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}