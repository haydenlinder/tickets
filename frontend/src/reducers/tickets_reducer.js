import { RECEIVE_TICKETS, RECEIVE_TICKET, RECEIVE_USER_TICKETS } from "../actions/ticket_actions";

const ticketsReducer = (defaultState = {}, action) => {
    Object.freeze(defaultState)
    let newState = Object.assign({}, defaultState)

    switch (action.type) {
      case RECEIVE_TICKETS:
        return action.tickets;
      case RECEIVE_TICKET:
        newState[action.ticket.id] = action.ticket;
        return newState;
      default:
        return defaultState;
    }
}

export default ticketsReducer;