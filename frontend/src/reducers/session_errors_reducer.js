import {
    RECEIVE_SESSION_ERRORS
} from '../actions/session_actions';

export default function (state = {}, action) {
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
           return action.errors
        default:
            return state;
    }
}