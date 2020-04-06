import * as TicketAPIUtil from '../util/ticket_api_util';


// action type constants
export const RECEIVE_TICKETS = "RECEIVE_TICKETS";
export const RECEIVE_TICKET = "RECEIVE_TICKET";
export const RECEIVE_TICKET_ERRORS = "RECEIVE_TICKET_ERRORS";
export const CLEAR_TICKET_ERRORS = "CLEAR_TICKET_ERRORS";


// action creators
const receiveTickets = tickets => {
    let payload = {};
    tickets.data.map(ticket => payload[ticket._id] = ticket);
    return({
        type: RECEIVE_TICKETS,
        tickets: payload
    });
};

const receiveTicket = ticket => ({
    type: RECEIVE_TICKET,
    ticket: ticket.data
});

const receiveTicketErrors = errors => ({
    type: RECEIVE_TICKET_ERRORS,
    errors: errors.response.data
});


// dispatch asynchronous thunk actions
export const clearTicketErrors = () => ({
    type: CLEAR_TICKET_ERRORS
});

export const getTickets = () => dispatch => (
    TicketAPIUtil.getTickets()
    .then(tickets => dispatch(receiveTickets(tickets)))
    .catch(errors => dispatch(receiveTicketErrors(errors)))
);

export const createTicket = ticket => dispatch => (
    TicketAPIUtil.createTicket(ticket)
    .then(newTicket => dispatch(receiveTicket(newTicket)))
    .catch(errors => dispatch(receiveTicketErrors(errors)))
);

export const getTicket = id => dispatch => (
    TicketAPIUtil.getTicket(id)
    .then(ticket => dispatch(receiveTicket(ticket)))
    .catch(errors => dispatch(receiveTicketErrors(errors)))
);

export const updateTicket = ticket => dispatch => (
    TicketAPIUtil.updateTicket(ticket)
    .then(updatedTicket => dispatch(receiveTicket(updatedTicket)))
    .catch(errors => dispatch(receiveTicketErrors(errors)))
);

export const fetchOwnerTickets = userId => dispatch => (
    TicketAPIUtil.fetchOwnerTickets(userId)
    .then(tickets => dispatch(receiveTickets(tickets)))
    .catch(errors => dispatch(receiveTicketErrors(errors)))
);

export const fetchCreatedTickets = userId => dispatch => (
    TicketAPIUtil.getCreatedTickets(userId)
    .then(tickets => dispatch(receiveTickets(tickets)))
    .catch(errors => dispatch(receiveTicketErrors(errors)))
);

export const fetchSubscribedTickets = userId => dispatch => (
    TicketAPIUtil.getSubscribedTickets(userId)
    .then(tickets => dispatch(receiveTickets(tickets)))
    .catch(errors => dispatch(receiveTicketErrors(errors)))
);

export const fetchStarredTickets = currentUser => dispatch => (
    TicketAPIUtil.getStarredTickets(currentUser)
    .then(tickets => dispatch(receiveTickets(tickets)))
    .catch(errors => dispatch(receiveTicketErrors(errors)))
);
