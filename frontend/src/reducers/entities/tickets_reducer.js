import { RECEIVE_TICKETS, RECEIVE_TICKET } from '../../actions/ticket_actions';


const ticketsReducer = (defaultState = {}, action) => {
  Object.freeze(defaultState);
  let nextState = Object.assign({}, defaultState);

  switch (action.type) {
    case RECEIVE_TICKETS:
      return action.tickets;
    case RECEIVE_TICKET:
      nextState[action.ticket._id] = action.ticket;
      return nextState;
    default:
      return nextState;
  }
};


export default ticketsReducer;
