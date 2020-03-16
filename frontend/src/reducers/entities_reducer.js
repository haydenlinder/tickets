import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import ticketsReducer from './tickets_reducer';
import tagsReducer from './tags_reducer';


const entitiesReducer = combineReducers({
    users: usersReducer,
    tickets: ticketsReducer,
    tags: tagsReducer
})

export default entitiesReducer;