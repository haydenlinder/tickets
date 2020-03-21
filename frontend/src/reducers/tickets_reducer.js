import { RECEIVE_TICKETS, RECEIVE_TICKET } from "../actions/ticket_actions";

const ticketsReducer = (defaultState = {}, action) => {
    Object.freeze(defaultState)
    let newState = Object.assign({}, defaultState)
    switch (action.type) {
      case RECEIVE_TICKETS:
        action.tickets.forEach(ticket => {
          newState[ticket.id] = ticket
        })
        return newState
      case RECEIVE_TICKET:
        newState[action.ticket._id] = action.ticket;
        return newState;
      default:
        return newState;
    }
}

export default ticketsReducer;



