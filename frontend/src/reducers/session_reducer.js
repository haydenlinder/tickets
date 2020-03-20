import {
    RECEIVE_CURRENT_USER,
    RECEIVE_USER_LOGOUT,
} from '../actions/session_actions';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function (state = initialState, action) {
    Object.freeze(state);
    let newState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            newState.isAuthenticated = !!action.payload
            newState.user = action.payload.id
            return newState;
        case RECEIVE_USER_LOGOUT:
            return {
                isAuthenticated: false,
                user: undefined
            }
        default:
            return state;
    }
}