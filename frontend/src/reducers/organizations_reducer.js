import {RECEIVE_ORG_USERS} from "../actions/organization_actions"


const organizationReducer = (state = {}, action) => {
    Object.freeze(state)
    let nextState = Object.assign({}, state)
    switch(action.type) {
        case RECEIVE_ORG_USERS: 
            return action.users
        default: 
            return state
    }
}

export default organizationReducer