import { RECEIVE_CURRENT_USER, RECEIVE_USER_LOGOUT } from "../actions/session_actions";

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state) 
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            newState[action.payload._id] = action.payload
            return newState;
        default:
            return newState;
    }
}

export default usersReducer;