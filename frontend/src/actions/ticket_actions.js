import * as TicketAPIUtil from '../util/ticket_api_util'

export const RECEIVE_TICKETS = "RECEIVE_TICKETS";
export const RECEIVE_TICKET = "RECEIVE_TICKET";
export const RECEIVE_TICKET_ERRORS = "RECEIVE_TICKET_ERRORS";

const receiveTickets = tickets => ({
    type: RECEIVE_TICKETS,
    tickets: tickets.data
})

const receiveTicket = ticket => ({
    type: RECEIVE_TICKET,
    ticket: ticket
})

const receiveTicketErrors = errors => ({
    type: RECEIVE_TICKET_ERRORS,
    errors: errors
})

export const getTickets = () => dispatch => (
    TicketAPIUtil.getTickets()
    .then(tickets => dispatch(receiveTickets(tickets)))
) 

export const createTicket = ticket => dispatch => (
    TicketAPIUtil.createTicket(ticket)
    .then(newTicket => dispatch(receiveTicket(newTicket)))
    .catch(errors => dispatch(receiveTicketErrors(errors)))
) 

export const getTicket = id => dispatch => (
    TicketAPIUtil.getTicket(id)
    .then(ticket => dispatch(receiveTicket(ticket)))
    .catch(errors => dispatch(receiveTicketErrors(errors)))
) 

export const updateTicket = ticket => dispatch => (
    TicketAPIUtil.updateTicket(ticket)
    .then(updatedTicket => dispatch(receiveTicket(updatedTicket)))
    .catch(errors => dispatch(receiveTicketErrors(errors)))
) 

export const fetchOwnerTickets = userId => dispatch => (
    TicketAPIUtil.fetchOwnerTickets(userId)
    .then(tickets => dispatch(receiveTickets(tickets)))
    .catch(errors => dispatch(receiveTicketErrors(errors)))
)

export const fetchCreatedTickets = userId => dispatch => (
    TicketAPIUtil.getCreatedTickets(userId)
        .then(tickets => dispatch(receiveTickets(tickets)))
        .catch(errors => dispatch(receiveTicketErrors(errors)))
)
