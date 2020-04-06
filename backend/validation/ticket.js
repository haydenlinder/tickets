const Validator = require('validator');
const validText = require('./valid_text');

module.exports = function validateTicketInput(ticket) {
    let errors = {};

    ticket.title = validText(ticket.title) ? ticket.title : ''
    ticket.body = validText(ticket.body) ? ticket.body : ''

    if (Validator.isEmpty(ticket.title)) {
        errors.title = "A Ticket must have a title."
    }

    if (ticket.startDate > ticket.endDate && !Validator.isEmpty(ticket.endDate)) {
        errors.date = "Start date can't be before End date"
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}
