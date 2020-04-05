import { RECEIVE_CURRENT_USER, RECEIVE_USER_LOGOUT } 
  from '../actions/session_actions';
import { RECEIVE_ONE_USER } from '../actions/user_actions';
import { RECEIVE_ORG_USERS } from '../actions/organization_actions';


const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      nextState[action.payload._id] = action.payload;
      return nextState;
    case RECEIVE_USER_LOGOUT:
      return {};
    case RECEIVE_ONE_USER:
      nextState[action.payload._id] = action.payload;
      return nextState;
    case RECEIVE_ORG_USERS:
      return action.orgs;
    default:
      return nextState;
  }
};


export default usersReducer;
