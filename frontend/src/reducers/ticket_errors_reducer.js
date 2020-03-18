import { RECEIVE_TICKET_ERRORS } from '../actions/ticket_actions'

const ticketErrorsReducer = (defaultState = {}, action) => {
    Object.freeze(defaultState)

    switch (action.type) {
        case RECEIVE_TICKET_ERRORS:
            return action.errors
        default:
            return defaultState
    }
}

export default ticketErrorsReducer