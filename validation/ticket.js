const Validator = require('validator');
const validText = require('./valid_text');

module.exports = function validateTicketInput(ticket) {
    let errors = {};

    ticket.title = validText(ticket.title) ? ticket.title : ''
}