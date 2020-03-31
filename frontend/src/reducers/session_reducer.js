import {
    RECEIVE_CURRENT_USER,
    RECEIVE_USER_LOGOUT,
    RECEIVE_USER_SIGN_IN
} from '../actions/session_actions';

const initialState = {
    isAuthenticated: false,
    _id: {},
    orgHandle: undefined,
};

export default function (state = initialState, action) {
    Object.freeze(state);
    let newState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            newState.isAuthenticated = !!action.payload
            newState._id = action.payload._id
            newState.orgHandle = action.payload.orgHandle
            return newState;
        case RECEIVE_USER_LOGOUT:
            return {
                isAuthenticated: false,
                _id: undefined,
                orgHandle: undefined,
            };
        case RECEIVE_USER_SIGN_IN:
            return {
                ...state,
                isSignedIn: true
            }
        default:
            return state;
    }
}