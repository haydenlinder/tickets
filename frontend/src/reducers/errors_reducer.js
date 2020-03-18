import { combineReducers } from "redux";
import tagErrorsReducer from './tag_errors_reducer';
import SessionErrorsReducer from './session_errors_reducer'
import ticketErrorsReducer from "./ticket_errors_reducer";
import commentErrorsReducer from "./comment_errors_reducer"

const errorsReducer = combineReducers({
    tags: tagErrorsReducer,
    session: SessionErrorsReducer,
    tickets: ticketErrorsReducer,
    comments: commentErrorsReducer
})

export default errorsReducer;